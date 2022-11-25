import React, { useEffect, useState } from 'react';

import { useFindAthlete } from '@/api/mutations/user/findAthlete';
import { useParticipant } from '@/api/queries/application/participants';
import { Athlete } from '@judge-system/shared/_types/athlete';

interface Props {
  performanceId: string;
  applicationId: string;
}

export default function Participants({ performanceId, applicationId }: Props) {
  const [participants, setParticipants] = useState<Athlete[]>();

  const { mutate: findAthletes } = useFindAthlete();
  const { data: participantList } = useParticipant({
    applicationId: applicationId,
    performanceId: performanceId,
  });

  useEffect(() => {
    const participantIds: string[] = [];
    participantList?.items.map((participant) => participantIds.push(participant.athleteId));

    if (participantIds.length > 0) {
      findAthletes(
        {
          id: participantIds,
        },
        {
          onSuccess: (data) => {
            setParticipants(data);
          },
        },
      );
    }
  }, [findAthletes, participantList?.items]);

  return (
    <>
      {participants &&
        participants.length > 0 &&
        participants.map((participant) => (
          <label key={participant.id}>
            {participant.lastName} {participant.firstName}
          </label>
        ))}
    </>
  );
}
