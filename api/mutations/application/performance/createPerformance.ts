import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Performance, PerformanceCreate } from '@judge-system/shared/_types/performance';

type Response = Performance;

type Params = PerformanceCreate;

const createPerformance: MutationFunction<Response, Params> = async ({ applicationId, nomination, ageGroup }) => {
  return (
    await http.post(ENDPOINTS.application.postPerformances.api, {
      applicationId,
      nomination,
      ageGroup,
    })
  ).data;
};

export const useCreatePerformance = () => {
  return useMutation(createPerformance);
};
