import { memo, useCallback, useState } from 'react';
import { Divider } from 'shared/ui';
import { settingsTabs, TSettingTabName } from '../../model/settingsTabs';
import { TabsSelector } from '../TabsSelector/TabsSelector';
import s from './AccountSettingsPage.module.scss';

export const AccountSettingsPage = memo(() => {
	const [currentTab, setCurrentTab] = useState<TSettingTabName>('personalData');

	const handleSelectTab = useCallback((tabName: TSettingTabName) => {
		setCurrentTab(tabName);
	}, []);

	return (
		<div className={s.AccountSettingsPage}>
			<Divider />

			<TabsSelector onClickTab={handleSelectTab} currentTab={currentTab} />

			<Divider />

			<div className={s.tabs}>{settingsTabs[currentTab].Component}</div>

			<Divider />
		</div>
	);
});
