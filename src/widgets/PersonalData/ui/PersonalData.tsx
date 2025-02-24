import { memo, useCallback, useState } from 'react';
import { EditPersonalData } from 'features/EditPersonalData';
import { AccountSettings } from 'entities/AccountSettings';
import { useGetPersonalData } from 'entities/PersonalData';
import { Avatar } from 'shared/ui';
import s from './PersonalData.module.scss';

export const PersonalData = memo(() => {
	const [isNameModalOpen, setIsNameModalOpen] = useState(false);
	const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

	// TODO обработать
	const { personalData, isLoading, error } = useGetPersonalData();

	// TODO расхардкодить
	const userAvatar =
		'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13';

	const handleNameModal = useCallback(() => {
		setIsNameModalOpen((prev) => !prev);
	}, []);

	const handleUsernameModal = useCallback(() => {
		setIsUsernameModalOpen((prev) => !prev);
	}, []);

	return (
		<div className={s.PersonalData}>
			<Avatar src={userAvatar} className={s.avatar} />

			<div className={s.fields}>
				<AccountSettings.Field
					label={'Имя пользователя'}
					value={personalData.username}
					onClick={handleUsernameModal}
				/>

				<AccountSettings.Field
					label={'Имя'}
					value={`${personalData.firstName} ${personalData.lastName}`}
					onClick={handleNameModal}
				/>

				<AccountSettings.Field label={'Группа'} />
			</div>

			{isNameModalOpen && (
				<EditPersonalData.NameModal isOpen={isNameModalOpen} onClose={handleNameModal} />
			)}

			{isUsernameModalOpen && (
				<EditPersonalData.UsernameModal
					isOpen={isUsernameModalOpen}
					onClose={handleUsernameModal}
				/>
			)}
		</div>
	);
});
