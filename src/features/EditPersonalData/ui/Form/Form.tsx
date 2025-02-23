import { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useGetPersonalData } from 'entities/PersonalData';
import type { TPersonalDataField } from 'entities/PersonalData';
import { Button, Input, Text, TextAlign } from 'shared/ui';
import { useUpdatePersonalData } from '../../api/useUpdatePersonalData';
import s from './Form.module.scss';

interface IFormProps {
	name: TPersonalDataField;
	label: string;
}

export const Form = memo((props: IFormProps) => {
	const { name, label } = props;

	// TODO добавить обработчики загрузок и ошибок
	const { updatePersonalData, isLoading: isPersonalDataUpdating } = useUpdatePersonalData();
	const { personalData, mutatePersonalData } = useGetPersonalData();

	const { control, handleSubmit: handleSubmitContext, resetField } = useFormContext();

	const {
		field: { value, onChange },
		fieldState: { isDirty },
	} = useController({ control, name, defaultValue: personalData[name] });

	const updateCachedPersonalData = useCallback(() => {
		const updatedPersonalData = {
			...personalData,
			[name]: value,
		};

		mutatePersonalData(updatedPersonalData).finally();
		resetField(name, { defaultValue: value });
	}, [mutatePersonalData, name, personalData, resetField, value]);

	const handleSubmit = () => {
		updatePersonalData({ name, value }).then(() => updateCachedPersonalData());
	};

	const handleReset = () => {
		resetField(name);
	};

	// TODO добавить лоадеры и ошибки
	return (
		<form className={s.Form} onSubmit={handleSubmitContext(handleSubmit)}>
			<Text className={s.title} title={label} align={TextAlign.CENTER} />

			<Input className={s.input} label={label} value={value} onChange={onChange} />

			<Button className={s.submitButton} disabled={!isDirty}>
				Обновить
			</Button>

			<Button className={s.resetButton} disabled={!isDirty} onClick={handleReset}>
				Сбросить
			</Button>
		</form>
	);
});
