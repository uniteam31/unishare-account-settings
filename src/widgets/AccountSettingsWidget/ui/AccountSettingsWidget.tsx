import React, { memo } from 'react';
import { useGetPersonalData } from 'entities/PersonalData';
import { Widget, Avatar, Text, Link } from 'shared/ui';
import s from './AccountSettingsWidget.module.scss';

export const AccountSettingsWidget = memo(() => {
	const { personalData } = useGetPersonalData();

	// TODO отрефачить
	const userAvatar =
		personalData.avatar ||
		'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13';

	return (
		<Link to={'account/settings'}>
			<div className={s.AccountSettingsWidget}>
				<Widget className={s.innerWidget}>
					<Avatar className={s.avatar} src={userAvatar} />

					<div>
						<Text title={personalData.firstName} />
						<Text text={personalData.username} />
					</div>
				</Widget>
			</div>
		</Link>
	);
});
