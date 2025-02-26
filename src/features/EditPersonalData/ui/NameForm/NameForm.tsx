import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useGetPersonalData } from 'entities/PersonalData';
import type { TNameFormFields } from 'entities/PersonalData';
import { Input, UpdateFormModal } from 'shared/ui';
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

	const updateCachedPersonalData = useCallback(() => {
		const updatedPersonalData = {
			...personalData,
			firstName,
			lastName,
		};

		mutatePersonalData(updatedPersonalData).finally();
		reset({ firstName, lastName });
	}, [firstName, lastName, mutatePersonalData, personalData, reset]);

	const handleSubmit = useCallback(() => {
		const formValues = getValues();

		updatePersonalData({ formValues }).then(() => updateCachedPersonalData());
	}, [getValues, updateCachedPersonalData, updatePersonalData]);

	const handleReset = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<UpdateFormModal
			title={'Имя'}
			text={'Здесь вы можете указать свои личные данные'}
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
		</UpdateFormModal>
	);
};
