import React from 'react';
import { useForm } from 'react-hook-form';
import type { TNameFormFields } from 'entities/PersonalData';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { NameForm } from '../NameForm/NameForm';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const NameModal = (props: IModalProps) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TNameFormFields>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<NameForm />
			</FormWrapper>
		</ModalUI>
	);
};
