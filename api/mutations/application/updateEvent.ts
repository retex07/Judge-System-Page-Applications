import { MutationFunction, useMutation } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { http } from '@/api/http';
import { Attachments } from '@judge-system/shared/_types/attachments';
import { Event, EventUpdate } from '@judge-system/shared/_types/event';

type Params = { form: EventUpdate; id: string; file: File };

type Response = Event;

const updateEvent: MutationFunction<Response, Params> = async ({ form, id, file }) => {
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
      await http.put(ENDPOINTS.application.putEvent.api(id), {
        ...form,
        attachmentId,
      })
    ).data;
  } catch (e) {
    console.log(e);
  }
};

export const useUpdateEvent = () => {
  return useMutation(updateEvent);
};
