import { ReactNode } from 'react';
import { PersonalData } from 'widgets/PersonalData';

export type TSettingTabName = 'personalData';

type TSettingsTab = {
	title: string;
	Component: ReactNode;
};

export const settingsTabs: Record<TSettingTabName, TSettingsTab> = {
	personalData: {
		title: 'Персональные данные',
		Component: <PersonalData />,
	},
};
