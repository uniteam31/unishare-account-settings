import { useController, useFormContext } from 'react-hook-form';
import { useGetPersonalData } from 'entities/PersonalData';
import type { TUsernameFormFields } from 'entities/PersonalData';
import { Button, Input, Text, TextAlign } from 'shared/ui';
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

	// TODO добавить обработчики загрузок и ошибок
	const { updatePersonalData, isLoading: isPersonalDataUpdating } = useUpdatePersonalData();
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

	// TODO добавить лоадеры и ошибки
	// TODO вынести все общие стили форм
	return (
		<form className={s.UsernameForm} onSubmit={handleSubmitContext(handleSubmit)}>
			<div>
				<Text
					className={s.title}
					title={'Имя пользователя'}
					text={'Это ваше уникальное имя'}
					align={TextAlign.CENTER}
				/>

				<Input
					className={s.input}
					label={'Имя пользователя'}
					value={username}
					onChange={onChangeUsername}
				/>
			</div>

			<div className={s.buttonsWrapper}>
				<Button className={s.submitButton} disabled={!isDirty || isPersonalDataUpdating}>
					Обновить
				</Button>

				<Button
					className={s.resetButton}
					disabled={!isDirty || isPersonalDataUpdating}
					onClick={() => reset()}
				>
					Сбросить
				</Button>
			</div>
		</form>
	);
};
