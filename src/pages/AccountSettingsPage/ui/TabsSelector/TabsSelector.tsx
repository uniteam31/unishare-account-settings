import classNames from 'classnames';
import React, { memo, useCallback } from 'react';
import { settingsTabs } from '../../model/settingsTabs';
import type { TSettingTabName } from '../../model/settingsTabs';
import s from './TabsSelector.module.scss';

type Props = {
	onClickTab: (tabName: TSettingTabName) => void;
	currentTab: TSettingTabName;
};

export const TabsSelector = memo((props: Props) => {
	const { onClickTab, currentTab } = props;

	const handleSelectTab = useCallback(
		(tabName: TSettingTabName) => {
			onClickTab(tabName);
		},
		[onClickTab],
	);

	const arrayTabs = Object.entries(settingsTabs);

	return (
		<div className={s.TabsSelector}>
			{arrayTabs.map(([tabName, tab]) => (
				<div
					className={classNames(s.tabsSelectorItem, tabName === currentTab && s.active)}
					onClick={() => handleSelectTab(tabName as TSettingTabName)}
					key={tab.title}
				>
					{tab.title}
				</div>
			))}
		</div>
	);
});
