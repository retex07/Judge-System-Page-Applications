import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Performance, PerformanceEdit } from '@judge-system/shared/_types/performance';

type Response = Performance;

type Params = PerformanceEdit;

const editPerformance: MutationFunction<Response, Params> = async ({ applicationId, nomination, ageGroup, id }) => {
  return (
    await http.put(ENDPOINTS.application.putPerformance.api(id), {
      applicationId,
      nomination,
      ageGroup,
    })
  ).data;
};

export const useEditPerformance = () => {
  return useMutation(editPerformance);
};
