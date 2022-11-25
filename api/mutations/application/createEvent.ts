import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Attachments } from '@judge-system/shared/_types/attachments';
import { Event, EventCreate } from '@judge-system/shared/_types/event';

type Params = { form: EventCreate; file: File };

type Response = Event;

const createEvent: MutationFunction<Response, Params> = async ({ form, file }) => {
  try {
    let attachmentId = '';
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const attachment = (
        await http.post(ENDPOINTS.dictionaries.postAttachments.api, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data as Attachments;

      attachmentId = attachment.id;
    }
    return (
      await http.post(ENDPOINTS.application.postEvent.api, {
        ...form,
        attachmentId,
      })
    ).data;
  } catch (e: any) {
    console.log(e);
  }
};

export const useCreateEvent = () => {
  return useMutation(createEvent);
};
