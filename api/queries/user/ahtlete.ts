import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Athlete } from '@judge-system/shared/_types/athlete';

type Response = Athlete;
type QueryKey = [typeof ENDPOINTS.user.getAthlete.queryKey[0], string];

const getAthlete: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  return (await http.get(ENDPOINTS.user.getAthlete.api(queryKey[1]))).data;
};

export const useAthlete = <TData = Response>(
  id: string | null | undefined,
  options?: Omit<UseQueryOptions<Response, AxiosError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery([ENDPOINTS.user.getAthlete.queryKey[0], `${id}`], getAthlete, { enabled: !!id, ...options });
};
