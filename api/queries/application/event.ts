import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Event } from '@judge-system/shared/_types/event';

type Response = Event;
type QueryKey = [typeof ENDPOINTS.application.getEvent.queryKey[0], string];

const getEvent: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  return (await http.get(ENDPOINTS.application.getEvent.api(queryKey[1]))).data;
};

export const useEvent = <TData = Response>(
  id: string | null | undefined,
  options?: Omit<UseQueryOptions<Response, AxiosError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery([ENDPOINTS.application.getEvent.queryKey[0], `${id}`], getEvent, { enabled: !!id, ...options });
};
