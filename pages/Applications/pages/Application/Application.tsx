import Button from 'antd/lib/button';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useApproveApplication } from '@/api/mutations/application/updateStatus/approveApplication';
import { useOnReviewApplication } from '@/api/mutations/application/updateStatus/onReviewApplication';
import { useRejectApplication } from '@/api/mutations/application/updateStatus/rejectApplication';
import { useEvent } from '@/api/queries/application/event';
import { useParticipant } from '@/api/queries/application/participants';
import { useAthletes } from '@/api/queries/user/athletes';
import { ReactComponent as SvgAddition } from '@/assets/Addition.svg';
import useApplicationStatus from '@/components/ApplicationStatus';
import ApplicationModal from '@/modals/ApplicationModal';
import PerformanceList from '@/pages/EventInformationPage/pages/Applications/components/PerformanceList';
import { ApplicationStatus } from '@judge-system/shared/_types/application';
import { ageCategoriesList, nominationsList } from '@judge-system/shared/config/constants';

import {
  TableApplication,
  Toolbar,
  Title,
  Wrapper,
  Options,
  EventInfo,
  Form,
  InfoSection,
  Addition,
  Status,
  ApplicationsWrapper,
  CategorySection,
} from './styled';

export default function Application() {
  const { t } = useTranslation('p_eventInformation', {
    keyPrefix: 'application',
  });
  const [isAdditionModal, setIsAdditionModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { getApplicationStatus } = useApplicationStatus();

  const { mutate: onReviewApplication } = useOnReviewApplication();
  const { mutate: approveApplication } = useApproveApplication();
  const { mutate: rejectApplication } = useRejectApplication();

  const { isLoading: isLoadingAthletes } = useAthletes();

  const { data: eventInfo } = useEvent(location.state.eventId);
  const { data: participantList } = useParticipant({
    applicationId: location.state.data.id,
  });

  function renderOptions() {
    switch (location.state.data.status as ApplicationStatus) {
      case 'draft':
        return (
          <>
            <Button>{t('options.print')}</Button>
            <Button
              type="primary"
              loading={isLoadingAthletes}
              disabled={location.state.data.status != 'draft' || participantList?.count == 0}
              onClick={() => onReviewApplication({ id: location.state.data.id }, { onSuccess: () => navigate(-1) })}
            >
              {t('options.send')}
            </Button>
          </>
        );
      case 'on_review':
        return (
          <>
            <Button
              danger
              type="primary"
              onClick={() => rejectApplication({ id: location.state.data.id }, { onSuccess: () => navigate(-1) })}
            >
              {t('options.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={() => approveApplication({ id: location.state.data.id }, { onSuccess: () => navigate(-1) })}
            >
              {t('options.confirm')}
            </Button>
          </>
        );
      case 'approved':
        return (
          <>
            <Button
              danger
              type="primary"
              onClick={() => rejectApplication({ id: location.state.data.id }, { onSuccess: () => navigate(-1) })}
            >
              {t('options.cancel')}
            </Button>
            <Button type="primary" onClick={() => window.location.reload()}>
              {t('options.reload')}
            </Button>
          </>
        );
      default:
        return <></>;
    }
  }

  return (
    <Wrapper>
      <ApplicationModal
        applicationId={location.state.data.id}
        isModalOpen={isAdditionModal}
        onCloseModal={() => setIsAdditionModal(false)}
      />
      <TableApplication>
        <Toolbar>
          <Title>
            <h2>{t('create.title')}</h2>
            <Status>{getApplicationStatus(location.state.data.status)}</Status>
          </Title>
          <Options>{renderOptions()}</Options>
        </Toolbar>
        <EventInfo>
          <Form>
            <InfoSection>
              <label>{t('event.title')}</label>
              <p>{eventInfo?.name}</p>
            </InfoSection>
            <InfoSection>
              <label>{t('event.place')}</label>
              <p>
                {eventInfo?.settlement?.name}, {eventInfo?.address}, {eventInfo?.sportsComplex}
              </p>
            </InfoSection>
            <InfoSection>
              <label>{t('event.dates')}</label>
              <p>
                {eventInfo?.startDate} - {eventInfo?.endDate}
              </p>
            </InfoSection>
          </Form>
          {location.state.data.status == ('draft' as ApplicationStatus) && (
            <Button type="primary" onClick={() => setIsAdditionModal(true)}>
              <Addition>
                <SvgAddition />
                <label>{t('addition')}</label>
              </Addition>
            </Button>
          )}
        </EventInfo>
        <ApplicationsWrapper>
          {ageCategoriesList.map((ageCategory) => (
            <CategorySection key={ageCategory.value}>
              {nominationsList.map((nomination) => (
                <PerformanceList
                  key={nomination.value}
                  nomination={nomination}
                  ageGroup={ageCategory}
                  applicationId={location.state.data.id}
                />
              ))}
            </CategorySection>
          ))}
        </ApplicationsWrapper>
      </TableApplication>
    </Wrapper>
  );
}
