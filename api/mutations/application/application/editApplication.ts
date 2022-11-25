import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Application, ApplicationEdit } from '@judge-system/shared/_types/application';

type Params = ApplicationEdit;

type Response = Application;

const editApplication: MutationFunction<Response, Params> = async ({ date, organisationId, id }) => {
  return (
    await http.put(ENDPOINTS.application.putApplication.api(id), {
      date,
      organisationId,
    })
  ).data;
};

export const useEditApplication = () => {
  return useMutation(editApplication);
};
