import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { ISecurityData } from '../model/securityData';

const DEFAULT_SECURITY_DATA_VALUES: ISecurityData = {
	email: '',
	educationalEmail: '',
};

type TGetSecurityDataResponse = ApiResponse<ISecurityData>;

export const useGetSecurityData = () => {
	const fetcher = () =>
		axiosInstance
			.get<TGetSecurityDataResponse>('/users/securityData')
			.then((response) => response.data.data);

	const { data, error, mutate, isValidating } = useSWR('/users/securityData', fetcher);

	const securityData = data || DEFAULT_SECURITY_DATA_VALUES;

	return {
		securityData,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutateSecurityData: mutate,
	};
};
