import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Performance } from '@judge-system/shared/_types/performance';

type QueryKey = [typeof ENDPOINTS.application.getPerformances.queryKey[0], unknown];

type Response = { items: Performance[]; count: number };

const STRING_FILTERS = ['skip', 'limit', 'eventId', 'applicationId', 'nomination', 'ageGroup'];

const getPerformances: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const searchParams = queryKey[1];
  return (await http.get(`${ENDPOINTS.application.getPerformances.api}?${searchParams}`)).data;
};

export const usePerformances = <TData = Response>(
  searchParams: Record<string, string> = {},
  options?: Omit<UseQueryOptions<Response, AxiosError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  const queryParams = new URLSearchParams();

  STRING_FILTERS.forEach((filterKey) => {
    if (searchParams[filterKey]) {
      queryParams.append(filterKey, searchParams[filterKey]);
    }
  });

  const { data, ...rest } = useQuery(
    [...ENDPOINTS.application.getPerformances.queryKey, queryParams.toString()],
    getPerformances,
    options,
  );
  return { data, ...rest };
};
