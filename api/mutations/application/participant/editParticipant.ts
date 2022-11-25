import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { EditParticipant, Participant } from '@judge-system/shared/_types/participant';

type Response = Participant;

type Params = EditParticipant;

const editParticipant: MutationFunction<Response, Params> = async ({ performanceId, athleteId, id }) => {
  return (
    await http.put(ENDPOINTS.application.putParticipant.api(id), {
      performanceId,
      athleteId,
    })
  ).data;
};

export const useEditParticipant = () => {
  return useMutation(editParticipant);
};
