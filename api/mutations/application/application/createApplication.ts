import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Application, ApplicationCreate } from '@judge-system/shared/_types/application';

type Response = Application;

type Params = ApplicationCreate;

const createApplication: MutationFunction<Response, Params> = async ({ eventId, date, organisationId, coachId }) => {
  return (
    await http.post(ENDPOINTS.application.postApplication.api, {
      coachId,
      eventId,
      date,
      organisationId,
    })
  ).data;
};

export const useCreateApplication = () => {
  return useMutation(createApplication);
};
