import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Event } from '@judge-system/shared/_types/event';

type QueryKey = [typeof ENDPOINTS.application.getEvents.queryKey[0], unknown];

type Response = { items: Event[]; count: number };

const STRING_FILTERS = ['name', 'skip', 'limit', 'startDate', 'endDate', 'status', 'ageGroups'];

const getEvents: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const searchParams = queryKey[1];
  return (await http.get(`${ENDPOINTS.application.getEvents.api}?${searchParams}`)).data;
};

export const useEvents = <TData = Response>(
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
    [...ENDPOINTS.application.getEvents.queryKey, queryParams.toString()],
    getEvents,
    options,
  );
  return { data, ...rest };
};
