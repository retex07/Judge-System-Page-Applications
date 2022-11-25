import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Athlete, AthleteCreate } from '@judge-system/shared/_types/athlete';

type Response = Athlete;

type Params = AthleteCreate;

const createAthlete: MutationFunction<Response, Params> = async ({ ...data }) => {
  return (await http.post(ENDPOINTS.user.postAthlete.api, { ...data })).data;
};

export const useCreateAthlete = () => {
  return useMutation(createAthlete);
};
