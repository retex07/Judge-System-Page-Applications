import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const rejectApplication: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.patch(ENDPOINTS.application.patchRejectApplication.api(id))).data;
};

export const useRejectApplication = () => {
  return useMutation(rejectApplication);
};
