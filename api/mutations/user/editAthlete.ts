import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Athlete, AthleteEdit } from '@judge-system/shared/_types/athlete';

type Params = AthleteEdit;

type Response = Athlete;

const editAthlete: MutationFunction<Response, Params> = async ({ ...data }) => {
  return (
    await http.put(ENDPOINTS.user.putAthlete.api(data.id), {
      ...data,
    })
  ).data;
};

export const useEditAthlete = () => {
  return useMutation(editAthlete);
};
