import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Application } from '@judge-system/shared/_types/application';

type QueryKey = [typeof ENDPOINTS.application.getApplications.queryKey[0], unknown];

type Response = {
  items: Application[];
  count: number;
};

const STRING_FILTERS = ['eventId', 'status', 'organisationId'];

const getApplications: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const searchParams = queryKey[1];
  return (await http.get(`${ENDPOINTS.application.getApplications.api}?${searchParams}`)).data;
};

export const useApplications = <TData = Response>(
  searchParams: Record<string, string> = {},
  options?: Omit<UseQueryOptions<Response, AxiosError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  const queryParams = new URLSearchParams();

  STRING_FILTERS.forEach((filterKey) => {
    if (searchParams[filterKey]) {
      queryParams.append(filterKey, searchParams[filterKey]);
    }
  });

  return useQuery(
    [...ENDPOINTS.application.getApplications.queryKey, queryParams.toString()],
    getApplications,
    options,
  );
};
