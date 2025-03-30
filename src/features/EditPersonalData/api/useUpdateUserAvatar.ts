import { useCallback, useState } from 'react';
import type { IPersonalData, TAvatarFormFields } from 'entities/PersonalData';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

type Props = {
	formValues: TAvatarFormFields;
};

type Response = ApiResponse<IPersonalData>;

export const useUpdateUserAvatar = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const updateUserAvatar = useCallback(async (props: Props) => {
		const { formValues } = props;

		if (!formValues.avatar) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append('avatar', formValues.avatar);

			// TODO: ставить ссылку, которую возвращает сервер
			await axiosInstance.put<Response>('/users/personalData/avatar', formData);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при входе в аккаунт';

			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		updateUserAvatar,
	};
};
