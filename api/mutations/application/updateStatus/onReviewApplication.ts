import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const onReviewApplication: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.patch(ENDPOINTS.application.patchReviewApplication.api(id))).data;
};

export const useOnReviewApplication = () => {
  return useMutation(onReviewApplication);
};
