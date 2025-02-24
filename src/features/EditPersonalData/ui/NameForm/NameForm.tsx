import { useController, useFormContext } from 'react-hook-form';
import { useGetPersonalData } from 'entities/PersonalData';
import type { TNameFormFields } from 'entities/PersonalData';
import { formatApiErrorMessages } from 'shared/lib';
import { Button, Input, Text, TextAlign, Warning } from 'shared/ui';
import { useUpdatePersonalData } from '../../api/useUpdatePersonalData';
import s from './NameForm.module.scss';

export const NameForm = () => {
	const {
		control,
		handleSubmit: handleSubmitContext,
		formState: { isDirty },
		reset,
		getValues,
	} = useFormContext<TNameFormFields>();

	// TODO добавить обработчики загрузок и ошибок
	const {
		updatePersonalData,
		isLoading: isPersonalDataUpdating,
		error: updatePersonalDataErrors,
	} = useUpdatePersonalData();
	const { personalData, mutatePersonalData } = useGetPersonalData();

	const {
		field: { value: firstName, onChange: onChangeFirstName },
	} = useController({ control, name: 'firstName', defaultValue: personalData.firstName });

	const {
		field: { value: lastName, onChange: onChangeLastName },
	} = useController({ control, name: 'lastName', defaultValue: personalData.lastName });

	const updateCachedPersonalData = () => {
		const updatedPersonalData = {
			...personalData,
			firstName,
			lastName,
		};

		mutatePersonalData(updatedPersonalData).finally();
		reset({ firstName, lastName });
	};

	const handleSubmit = () => {
		const formValues = getValues();

		updatePersonalData({ formValues }).then(() => updateCachedPersonalData());
	};

	// TODO добавить лоадеры и ошибки
	return (
		<form className={s.NameForm} onSubmit={handleSubmitContext(handleSubmit)}>
			<div>
				<Text
					className={s.title}
					title={'Имя'}
					text={'Здесь вы можете указать свои личные данные'}
					align={TextAlign.CENTER}
				/>

				{!isPersonalDataUpdating && updatePersonalDataErrors && (
					<Warning
						className={s.error}
						title={'Ошибка'}
						text={formatApiErrorMessages(updatePersonalDataErrors)}
						theme={'red'}
					/>
				)}

				<Input
					className={s.input}
					label={'Имя'}
					value={firstName}
					onChange={onChangeFirstName}
				/>

				<Input
					className={s.input}
					label={'Фамилия'}
					value={lastName}
					onChange={onChangeLastName}
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
