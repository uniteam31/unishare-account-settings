import { Field } from './ui/Field/Field';

type AccountSettingsComponents = {
	Field: typeof Field;
};

const AccountSettings: AccountSettingsComponents = {
	Field,
};

export { AccountSettings };
