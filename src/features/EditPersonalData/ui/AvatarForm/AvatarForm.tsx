import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useGetPersonalData } from 'entities/PersonalData';
import type { TAvatarFormFields } from 'entities/PersonalData';
import { ImageInput, UpdateFormModal } from 'shared/ui';
import { useUpdateUserAvatar } from '../../api/useUpdateUserAvatar';
import s from './AvatarForm.module.scss';

const REGEX_CORRECT_IMG_TYPES = /(gif|jpe?g|tiff?|png|webp|bmp)$/i;

export const AvatarForm = () => {
	const {
		control,
		handleSubmit: handleSubmitContext,
		setValue,
	} = useFormContext<TAvatarFormFields>();

	const { personalData, mutatePersonalData } = useGetPersonalData();
	const { updateUserAvatar, isLoading, error } = useUpdateUserAvatar();

	const [preview, setPreview] = useState<string | undefined>(personalData.avatar);

	const {
		field: { value, onChange },
		fieldState: { isDirty },
	} = useController({ control, name: 'avatar' });

	const handleRemoveAvatar = () => {
		setValue('avatar', null);
		setPreview('');
	};

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const avatar = event.target.files[0];

		// TODO: уведомлять, что тип не тот
		if (!REGEX_CORRECT_IMG_TYPES.test(avatar.type)) {
			return;
		}

		setPreview(URL.createObjectURL(avatar));
		onChange(avatar);
	};

	const updateCachedAvatar = () => {
		mutatePersonalData((currentPersonalData) => {
			if (!currentPersonalData) {
				return;
			}

			return {
				...currentPersonalData,
				avatar: preview,
			};
		}).finally();
	};

	const handleSubmit = () => {
		updateUserAvatar({ formValues: { avatar: value } }).then(() => {
			updateCachedAvatar();
		});
	};

	return (
		<UpdateFormModal
			title={'Аватар'}
			onSubmit={handleSubmitContext(handleSubmit)}
			isDirty={isDirty}
			isLoading={isLoading}
			errors={error}
		>
			<div className={s.AvatarForm}>
				<ImageInput
					onRemove={handleRemoveAvatar}
					shape={'circle'}
					label={'Выбрать'}
					selectedFile={preview}
					onChange={handleChangeAvatar}
				/>
			</div>
		</UpdateFormModal>
	);
};
