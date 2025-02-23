import React from 'react';
import { useForm } from 'react-hook-form';
import type { TPersonalDataField } from 'entities/PersonalData';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { Form } from '../Form/Form';

interface IModalProps {
	name: TPersonalDataField;
	label: string;
	//
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = (props: IModalProps) => {
	const { name, label, isOpen, onClose } = props;

	const methods = useForm();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<Form name={name} label={label} />
			</FormWrapper>
		</ModalUI>
	);
};
