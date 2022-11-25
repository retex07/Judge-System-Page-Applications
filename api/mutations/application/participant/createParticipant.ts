import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Participant, ParticipantCreate } from '@judge-system/shared/_types/participant';

type Response = Participant;

type Params = ParticipantCreate;

const createParticipant: MutationFunction<Response, Params> = async ({ performanceId, athleteId }) => {
  return (
    await http.post(ENDPOINTS.application.postParticipant.api, {
      performanceId,
      athleteId,
    })
  ).data;
};

export const useCreateParticipant = () => {
  return useMutation(createParticipant);
};
