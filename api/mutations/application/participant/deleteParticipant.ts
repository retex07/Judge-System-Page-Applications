import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';

type Params = {
  id: string;
};

const deleteParticipant: MutationFunction<unknown, Params> = async ({ id }) => {
  return (await http.delete(ENDPOINTS.application.deleteParticipant.api(id))).data;
};

export const useDeleteParticipant = () => {
  return useMutation(deleteParticipant);
};
