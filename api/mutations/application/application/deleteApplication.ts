import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const deleteApplication: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.delete(ENDPOINTS.application.deleteApplication.api(id))).data;
};

export const useDeleteApplication = () => {
  return useMutation(deleteApplication);
};
