import React from 'react';
import { useForm } from 'react-hook-form';
import type { TUsernameFormFields } from 'entities/PersonalData';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { UsernameForm } from '../UsernameForm/UsernameForm';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const UsernameModal = (props: IModalProps) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TUsernameFormFields>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<UsernameForm />
			</FormWrapper>
		</ModalUI>
	);
};
