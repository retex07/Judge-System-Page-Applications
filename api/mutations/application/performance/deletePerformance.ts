import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const deletePerformance: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.delete(ENDPOINTS.application.deletePerformance.api(id))).data;
};

export const useDeletePerformance = () => {
  return useMutation(deletePerformance);
};
