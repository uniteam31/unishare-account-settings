import { useCallback, useState } from 'react';
import type { IPersonalData, TPersonalDataField } from 'entities/PersonalData';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

interface IUpdatePersonalDataProps {
	name: TPersonalDataField;
	value: string;
}

type TUpdatePersonalDataResponse = ApiResponse<IPersonalData>;

export const useUpdatePersonalData = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const updatePersonalData = useCallback(async (props: IUpdatePersonalDataProps) => {
		const { name, value } = props;

		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.put<TUpdatePersonalDataResponse>(
				'/users/personalData',
				{ [name]: value },
			);

			// TODO возвращать или нет?
			const updatedPersonalData = response.data.data;

			return updatedPersonalData;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при входе в аккаунт';

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		updatePersonalData,
	};
};
