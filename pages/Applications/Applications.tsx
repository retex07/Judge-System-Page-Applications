import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

import { useCreateApplication } from '@/api/mutations/application/application/createApplication';
import { useApplications } from '@/api/queries/application/applications';
import { useAthletes } from '@/api/queries/user/athletes';
import { ContentWrapper } from '@/components/styled';
import { eventsPaths } from '@/config/eventsPaths';
import { useColumns } from '@/pages/EventInformationPage/pages/Applications/hooks';
import { BackgroundContainer, Title, ButtonsBox, Panel } from '@/pages/EventInformationPage/styled';
import { applicationStatusList } from '@judge-system/shared/config/constants';
import { getConvertDateToString } from '@judge-system/shared/utils/dateUtils';

export const Applications = () => {
  const { t } = useTranslation('p_eventInformation');
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { columns } = useColumns();
  const { pathname } = useLocation();

  const getHandleSelectOption = (key: string) => {
    return (value: string) => {
      setSearchParams({ ...searchParams, [key]: value });
    };
  };

  const eventId = pathname.split('/').reverse()[1];

  const params = Object.fromEntries(searchParams);

  const { data: athletes, isLoading: isLoadingAthletes } = useAthletes();
  const { data: applicationInfo } = useApplications({ ...params, eventId: eventId });
  const { mutate: createApplication, isLoading: isLoadingCreateApplication } = useCreateApplication();

  function onSubmitCreateApplication() {
    createApplication(
      {
        eventId: eventId,
        date: getConvertDateToString(new Date()),
        organisationId: athletes?.items[0].organisation?.id || '',
        coachId: athletes?.items[0].coach.id || '',
      },
      { onSuccess: (data) => navigate(eventsPaths.applications.item.create, { state: { data, eventId } }) },
    );
  }

  return (
    <ContentWrapper>
      <BackgroundContainer>
        <Panel>
          <Title>{t('application.title')}</Title>
          <ButtonsBox>
            <Select
              size="middle"
              style={{ width: '170px' }}
              options={applicationStatusList}
              onChange={getHandleSelectOption('status')}
            />
            <Button
              type="primary"
              loading={isLoadingCreateApplication || isLoadingAthletes}
              onClick={() => onSubmitCreateApplication()}
            >
              {t('application.create.application')}
            </Button>
          </ButtonsBox>
        </Panel>
        <Table
          columns={columns}
          pagination={{
            pageSize: 10,
          }}
          style={{ borderRadius: 2 }}
          dataSource={applicationInfo?.items}
        />
      </BackgroundContainer>
    </ContentWrapper>
  );
};
