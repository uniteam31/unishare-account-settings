import { useController, useFormContext } from 'react-hook-form';
import { useGetPersonalData } from 'entities/PersonalData';
import type { TUsernameFormFields } from 'entities/PersonalData';
import { Input, UpdateFormModal } from 'shared/ui';
import { useUpdatePersonalData } from '../../api/useUpdatePersonalData';
import s from './UsernameForm.module.scss';

export const UsernameForm = () => {
	const {
		control,
		handleSubmit: handleSubmitContext,
		formState: { isDirty },
		reset,
		getValues,
	} = useFormContext<TUsernameFormFields>();

	const {
		updatePersonalData,
		isLoading: isPersonalDataUpdating,
		error: updatePersonalDataErrors,
	} = useUpdatePersonalData();
	const { personalData, mutatePersonalData } = useGetPersonalData();

	const {
		field: { value: username, onChange: onChangeUsername },
	} = useController({ control, name: 'username', defaultValue: personalData.username });

	const updateCachedPersonalData = () => {
		const updatedPersonalData = {
			...personalData,
			username,
		};

		mutatePersonalData(updatedPersonalData).finally();
		reset({ username });
	};

	const handleSubmit = () => {
		const formValues = getValues();

		updatePersonalData({ formValues }).then(() => updateCachedPersonalData());
	};

	const handleReset = () => {
		reset();
	};

	return (
		<UpdateFormModal
			title={'Имя пользователя'}
			text={'Это ваш уникальный псевдоним'}
			//
			isLoading={isPersonalDataUpdating}
			errors={updatePersonalDataErrors}
			isDirty={isDirty}
			//
			onSubmit={handleSubmitContext(handleSubmit)}
			onReset={handleReset}
		>
			<Input
				className={s.input}
				label={'Имя пользователя'}
				value={username}
				onChange={onChangeUsername}
			/>
		</UpdateFormModal>
	);
};
