import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { usePerformances } from '@/api/queries/application/performances';
import { ReactComponent as SvgEditMarker } from '@/assets/EditMarker.svg';
import ApplicationModal from '@/modals/ApplicationModal';
import { ApplicationStatus } from '@judge-system/shared/_types/application';

import Participants from '../ParticipantList/ParticipantList';
import {
  Age,
  Athlete,
  AthleteList,
  Category,
  EditMark,
  GridInfo,
  NumberGroup,
  ListNominationFromAgeGroup,
  Title,
} from './styled';

interface Props {
  applicationId: string;
  nomination: {
    value: string;
    label: string;
  };
  ageGroup: {
    value: string;
    label: string;
  };
}

export default function PerformanceList({ ageGroup, nomination, applicationId }: Props) {
  const { t } = useTranslation('m_application_create');
  const [isEditModal, setIsEditModal] = useState(false);

  const location = useLocation();

  const { data: performanceList } = usePerformances({
    applicationId: applicationId,
    nomination: nomination.value,
    ageGroup: ageGroup.value,
  });

  return (
    <>
      {performanceList && (
        <ApplicationModal
          applicationId={location.state.data.id}
          isModalOpen={isEditModal}
          onCloseModal={() => setIsEditModal(false)}
          performanceList={performanceList?.items}
          isEdit
        />
      )}
      {performanceList && performanceList.count > 0 && (
        <ListNominationFromAgeGroup>
          <Category id={ageGroup.value}>
            <Age>{ageGroup.label}</Age>
            <Title>{nomination.label}</Title>
            {location.state.data.status != ('rejected' as ApplicationStatus) && (
              <EditMark onClick={() => setIsEditModal(true)}>
                <SvgEditMarker />
              </EditMark>
            )}
          </Category>

          {performanceList.items[0].nomination === nomination.value && (
            <GridInfo>
              <div>
                <label>{t('number')}</label>
              </div>
              <div>
                <label>{t('name')}</label>
              </div>
            </GridInfo>
          )}

          {performanceList.items.map((performance, indexPerformance) => (
            <AthleteList key={performance.id}>
              <Athlete>
                <NumberGroup>
                  <label>{indexPerformance + 1}</label>
                </NumberGroup>
                <div>
                  <Participants performanceId={performance.id} applicationId={applicationId} />
                </div>
              </Athlete>
            </AthleteList>
          ))}
        </ListNominationFromAgeGroup>
      )}
    </>
  );
}
