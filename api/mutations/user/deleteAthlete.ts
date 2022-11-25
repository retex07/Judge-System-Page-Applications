import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const deleteAthlete: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.delete(ENDPOINTS.user.deleteAthlete.api(id))).data;
};

export const useDeleteAthlete = () => {
  return useMutation(deleteAthlete);
};
