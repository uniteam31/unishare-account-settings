import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { IAuthenticationData } from '../model/authenticationData';

const DEFAULT_SECURITY_DATA_VALUES: IAuthenticationData = {
	email: '',
	educationalEmail: '',
};

type TGetAuthenticationDataResponse = ApiResponse<IAuthenticationData>;

export const useGetAuthenticationData = () => {
	const fetcher = () =>
		axiosInstance
			.get<TGetAuthenticationDataResponse>('/users/authenticationData')
			.then((response) => response.data.data);

	const { data, error, mutate, isValidating } = useSWR('/users/authenticationData', fetcher);

	const authenticationData = data || DEFAULT_SECURITY_DATA_VALUES;

	return {
		authenticationData,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutateAuthenticationData: mutate,
	};
};
