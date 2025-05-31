import { memo, useCallback, useState } from 'react';
import { EditPersonalData } from 'features/EditPersonalData';
import { AccountSettings } from 'entities/AccountSettings';
import { useGetPersonalData } from 'entities/PersonalData';
import { Text, Avatar } from 'shared/ui';
import s from './PersonalData.module.scss';

export const PersonalData = memo(() => {
	const [isNameModalOpen, setIsNameModalOpen] = useState(false);
	const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
	const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

	// TODO обработать
	const { personalData, isLoading, error } = useGetPersonalData();

	const handleNameModal = useCallback(() => {
		setIsNameModalOpen((prev) => !prev);
	}, []);

	const handleUsernameModal = useCallback(() => {
		setIsUsernameModalOpen((prev) => !prev);
	}, []);

	const handleAvatarModal = useCallback(() => {
		setIsAvatarModalOpen((prev) => !prev);
	}, []);

	return (
		<div className={s.PersonalData}>
			<Text
				title={'Персональные данные'}
				text={'Для редактирования кликните на нужное поле'}
			/>

			<div className={s.fields}>
				<Avatar
					onClick={handleAvatarModal}
					src={personalData.avatar}
					className={s.avatar}
				/>

				<AccountSettings.Field
					label={'Имя пользователя'}
					value={personalData.username}
					onClick={handleUsernameModal}
				/>

				<AccountSettings.Field
					label={'Имя'}
					value={`${personalData.firstName} ${personalData.lastName || ''}`}
					onClick={handleNameModal}
				/>

				<AccountSettings.Field label={'Группа'} disabled />
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

			{isAvatarModalOpen && (
				<EditPersonalData.AvatarModal
					isOpen={isAvatarModalOpen}
					onClose={handleAvatarModal}
				/>
			)}
		</div>
	);
});
