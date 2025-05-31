import React from 'react';
import { useForm } from 'react-hook-form';
import type { TAvatarFormFields } from 'entities/PersonalData';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { AvatarForm } from '../AvatarForm/AvatarForm';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AvatarModal = (props: IModalProps) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TAvatarFormFields>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<AvatarForm />
			</FormWrapper>
		</ModalUI>
	);
};
