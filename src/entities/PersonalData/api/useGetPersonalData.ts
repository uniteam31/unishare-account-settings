import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { IPersonalData } from '../model/personalData';

const DEFAULT_PERSONAL_DATA_VALUES: IPersonalData = {
	firstName: '',
	lastName: '',
	avatar: '',
	username: '',
	personalSpaceID: '',
};

type TGetPersonalDataResponse = ApiResponse<IPersonalData>;

export const useGetPersonalData = () => {
	const fetcher = () =>
		axiosInstance
			.get<TGetPersonalDataResponse>('/users/personalData')
			.then((response) => response.data.data);

	const { data, error, mutate, isValidating } = useSWR('/users/personalData', fetcher);

	const personalData = data || DEFAULT_PERSONAL_DATA_VALUES;

	return {
		personalData,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutatePersonalData: mutate,
	};
};
