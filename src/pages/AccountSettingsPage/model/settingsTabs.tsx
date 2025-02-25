import type { ReactNode } from 'react';
import { PersonalData } from 'widgets/PersonalData';
import { SecurityData } from 'widgets/SecurityData';

export type TSettingTabName = 'personalData' | 'securityData';

type TSettingsTab = {
	title: string;
	Component: ReactNode;
};

export const settingsTabs: Record<TSettingTabName, TSettingsTab> = {
	personalData: {
		title: 'Персональные данные',
		Component: <PersonalData />,
	},
	securityData: {
		title: 'Пароли и безопасность',
		Component: <SecurityData />,
	},
};
