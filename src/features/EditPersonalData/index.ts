import { NameModal } from './ui/NameModal/NameModal';
import { UsernameModal } from './ui/UsernameModal/UsernameModal';

type TEditPersonalDataComponents = {
	NameModal: typeof NameModal;
	UsernameModal: typeof UsernameModal;
};

const EditPersonalData: TEditPersonalDataComponents = {
	NameModal,
	UsernameModal,
};

export { EditPersonalData };
