import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Athlete } from '@judge-system/shared/_types/athlete';

type QueryKey = [typeof ENDPOINTS.user.getAthletes.queryKey[0], unknown];

type Response = { items: Athlete[]; count: boolean };

const getAthlete: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const searchParams = queryKey[1];
  return (await http.get(`${ENDPOINTS.user.getAthletes.api}?${searchParams}`, { timeout: 100000000000 })).data;
};

const STRING_FILTERS = ['search', 'regionId', 'settlementId', 'ageGroup', 'limit'];

export const useAthletes = <TData = Response>(
  searchParams: Record<string, string> = {},
  options?: Omit<UseQueryOptions<Response, AxiosError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  const queryParams = new URLSearchParams('limit=360');

  STRING_FILTERS.forEach((filterKey) => {
    if (searchParams[filterKey]) {
      queryParams.append(filterKey, searchParams[filterKey]);
    }
  });

  const { data, ...rest } = useQuery(
    [...ENDPOINTS.user.getAthletes.queryKey, queryParams.toString()],
    getAthlete,
    options,
  );
  return { data, ...rest };
};
