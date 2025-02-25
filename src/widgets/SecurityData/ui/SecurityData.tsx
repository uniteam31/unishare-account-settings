import { memo } from 'react';
import { AccountSettings } from 'entities/AccountSettings';
import { useGetSecurityData } from 'entities/SecurityData';
import { Text } from 'shared/ui';
import s from './SecurityData.module.scss';

export const SecurityData = memo(() => {
	// TODO добавить обработку состояний
	const { securityData, isLoading, error } = useGetSecurityData();

	return (
		<div className={s.SecurityData}>
			<Text
				title={'Пароли и безопасность'}
				text={'Здесь вы можете изменить приватные настройки своего аккаунта'}
			/>

			<div className={s.fields}>
				<AccountSettings.Field label={'Личная почта'} value={securityData.email} disabled />

				<AccountSettings.Field
					label={'Учебная почта'}
					value={securityData.educationalEmail}
					disabled
				/>

				<AccountSettings.Field label={'Изменить пароль'} value={''} disabled />
			</div>
		</div>
	);
});
