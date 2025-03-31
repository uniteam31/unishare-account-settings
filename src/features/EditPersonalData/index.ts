import { AvatarModal } from './ui/AvatarModal/AvatarModal';
import { NameModal } from './ui/NameModal/NameModal';
import { UsernameModal } from './ui/UsernameModal/UsernameModal';

type TEditPersonalDataComponents = {
	AvatarModal: typeof AvatarModal;
	NameModal: typeof NameModal;
	UsernameModal: typeof UsernameModal;
};

const EditPersonalData: TEditPersonalDataComponents = {
	AvatarModal,
	NameModal,
	UsernameModal,
};

export { EditPersonalData };
