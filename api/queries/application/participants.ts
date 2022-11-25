import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Participant } from '@judge-system/shared/_types/participant';

type QueryKey = [typeof ENDPOINTS.application.getParticipant.queryKey[0], unknown];

type Response = { items: Participant[]; count: number };

const STRING_FILTERS = ['skip', 'limit', 'eventId', 'applicationId', 'performanceId', 'athleteId'];

const getParticipant: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const searchParams = queryKey[1];
  return (await http.get(`${ENDPOINTS.application.getParticipant.api}?${searchParams}`)).data;
};

export const useParticipant = <TData = Response>(
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
    [...ENDPOINTS.application.getParticipant.queryKey, queryParams.toString()],
    getParticipant,
    options,
  );
  return { data, ...rest };
};
