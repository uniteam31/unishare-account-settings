import type { ReactNode } from 'react';
import { AuthenticationData } from 'widgets/AuthenticationData';
import { PersonalData } from 'widgets/PersonalData';

export type TSettingTabName = 'personalData' | 'authenticationData';

type TSettingsTab = {
	title: string;
	Component: ReactNode;
};

export const settingsTabs: Record<TSettingTabName, TSettingsTab> = {
	personalData: {
		title: 'Персональные данные',
		Component: <PersonalData />,
	},
	authenticationData: {
		title: 'Пароли и безопасность',
		Component: <AuthenticationData />,
	},
};
