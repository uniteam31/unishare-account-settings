import { memo } from 'react';
import { AccountSettings } from 'entities/AccountSettings';
import { useGetAuthenticationData } from 'entities/AuthenticationData';
import { Text, Warning } from 'shared/ui';
import s from './AuthenticationData.module.scss';

export const AuthenticationData = memo(() => {
	// TODO добавить обработку состояний
	const { authenticationData, isLoading, error } = useGetAuthenticationData();

	return (
		<div className={s.AuthenticationData}>
			<Text
				title={'Пароли и безопасность'}
				text={'Здесь вы можете изменить приватные настройки своего аккаунта'}
			/>

			<div className={s.fields}>
				<Warning
					theme={'blue'}
					title={'Привет!'}
					text={'В данный момент редактирование данных невозможно'}
				/>

				<AccountSettings.Field
					label={'Личная почта'}
					value={authenticationData.email}
					disabled
				/>

				<AccountSettings.Field
					label={'Учебная почта'}
					value={authenticationData.educationalEmail}
					disabled
				/>

				<AccountSettings.Field label={'Пароль'} value={'********'} disabled />
			</div>
		</div>
	);
});
