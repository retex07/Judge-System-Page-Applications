import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const approveApplication: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.patch(ENDPOINTS.application.patchApproveApplication.api(id))).data;
};

export const useApproveApplication = () => {
  return useMutation(approveApplication);
};
