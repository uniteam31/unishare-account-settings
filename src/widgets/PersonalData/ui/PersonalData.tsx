import { memo, useCallback, useState } from 'react';
import { EditPersonalData } from 'features/EditPersonalData';
import { AccountSettings } from 'entities/AccountSettings';
import { useGetPersonalData } from 'entities/PersonalData';
import { Avatar } from 'shared/ui';
import s from './PersonalData.module.scss';

export const PersonalData = memo(() => {
	const [isFirstNameModalOpen, setIsFirstNameModalOpen] = useState(false);
	const [isLastNameModalOpen, setIsLastNameModalOpen] = useState(false);

	// TODO обработать
	const { personalData, isLoading, error } = useGetPersonalData();

	// TODO расхардкодить
	const userAvatar =
		'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13';

	const handleFirstNameModal = useCallback(() => {
		setIsFirstNameModalOpen((prev) => !prev);
	}, []);

	const handleLastNameModal = useCallback(() => {
		setIsLastNameModalOpen((prev) => !prev);
	}, []);

	return (
		<div className={s.PersonalData}>
			<Avatar src={userAvatar} className={s.avatar} />

			<div className={s.fields}>
				<AccountSettings.Field
					label={'Имя'}
					value={personalData.firstName}
					onClick={handleFirstNameModal}
				/>

				<AccountSettings.Field
					label={'Фамилия'}
					value={personalData.firstName}
					onClick={handleLastNameModal}
				/>

				<AccountSettings.Field label={'Почта'} value={'myemail@icloud.com'} disabled />

				<AccountSettings.Field label={'Username'} value={personalData.username} disabled />
			</div>

			{isFirstNameModalOpen && (
				<EditPersonalData.Modal
					name={'firstName'}
					label={'Имя'}
					isOpen={isFirstNameModalOpen}
					onClose={handleFirstNameModal}
				/>
			)}

			{isLastNameModalOpen && (
				<EditPersonalData.Modal
					name={'firstName'}
					label={'Фамилия'}
					isOpen={isLastNameModalOpen}
					onClose={handleLastNameModal}
				/>
			)}
		</div>
	);
});
