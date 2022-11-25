import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Athlete, AthleteFind } from '@judge-system/shared/_types/athlete';

type Response = Athlete[];

type Params = AthleteFind;

const findAthlete: MutationFunction<Response, Params> = async ({ id }) => {
  return (await http.post(ENDPOINTS.user.findAthletes.api, id)).data;
};

export const useFindAthlete = () => {
  return useMutation(findAthlete);
};
