import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCreateParticipant } from '@/api/mutations/application/participant/createParticipant';
import { useEditParticipant } from '@/api/mutations/application/participant/editParticipant';
import { useCreatePerformance } from '@/api/mutations/application/performance/createPerformance';
import { useDeletePerformance } from '@/api/mutations/application/performance/deletePerformance';
import { useEditPerformance } from '@/api/mutations/application/performance/editPerformance';
import { useParticipant } from '@/api/queries/application/participants';
import { useAthletes } from '@/api/queries/user/athletes';
import { ReactComponent as SvgAddition } from '@/assets/Addition.svg';
import { ReactComponent as SvgDelete } from '@/assets/Delete.svg';
import {
  Addition,
  DeleteFormItem,
  Form,
  SectionsSportsmen,
  GroupSection,
  Fields,
  OnlySection,
} from '@/modals/ApplicationModal/styled';
import { AgeGroups } from '@judge-system/shared/_types/ageGroups';
import { OptionsTypes } from '@judge-system/shared/_types/common';
import { Nominations } from '@judge-system/shared/_types/nominations';
import { Participant } from '@judge-system/shared/_types/participant';
import { Performance } from '@judge-system/shared/_types/performance';
import { Select } from '@judge-system/shared/components/Inputs/Select';
import { ageCategoriesList, nominationsList } from '@judge-system/shared/config/constants';
import { FlexInputsBox } from '@judge-system/shared/modals/styled';

interface FormValues {
  athletes: string[];
  ageCategory: AgeGroups;
  nomination: Nominations;
}

interface Props {
  applicationId: string;
  isModalOpen: boolean;
  onCloseModal: () => void;
  isEdit?: boolean;
  performanceList?: Performance[];
}

export default function ApplicationModal(props: Props) {
  const { t } = useTranslation('m_application_create');
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({ mode: 'onChange' });

  const [performances, setPerformances] = useState<string[]>(
    props.isEdit && props.performanceList ? props.performanceList.map((i) => i.id) : [],
  );
  const [groupFields, setGroupFields] = useState(
    props.isEdit && props.performanceList ? [...Array(props.performanceList.length + 1).keys()] : [0],
  );

  const { mutate: editPerformance } = useEditPerformance();
  const { mutate: editParticipant } = useEditParticipant();
  const { mutate: deletePerformance } = useDeletePerformance();
  const { mutate: createPerformance, isLoading: isLoadingPerformance } = useCreatePerformance();
  const { mutate: createParticipant, isLoading: isLoadingParticipant } = useCreateParticipant();
  const { data: participants } = useParticipant({ applicationId: props.applicationId });
  const { data: athletes, isLoading: isLoadingAthletes } = useAthletes();

  const nominationField = watch('nomination');
  const ageGroupField = watch('ageCategory');

  function getParticipantList() {
    const participantsObj = participants?.items;

    if (participantsObj)
      return participantsObj.reduce((res: any, itemParticipant: Participant) => {
        if (performances.includes(itemParticipant.performanceId) && !res[itemParticipant.performanceId])
          res[itemParticipant.performanceId] = { participants: [] };
        if (performances.includes(itemParticipant.performanceId)) {
          res[itemParticipant.performanceId] = {
            participants: [
              ...res[itemParticipant.performanceId]?.participants,
              { id: itemParticipant.id, athleteId: itemParticipant.athleteId },
            ],
          };
        }

        return res;
      }, {});
  }

  function getCountAthletesInGroup(nomination: string) {
    if (nomination == 'mixed_couple') return 2;
    else if (nomination == 'trio') return 3;
    else if (nomination == 'group') return 5;
    else if (nomination == 'dance_gym') return 6;
    else if (nomination == 'platform_gym') return 6;
    else return 1;
  }

  function handleCreatePerformance() {
    createPerformance(
      {
        applicationId: props.applicationId,
        nomination: nominationField,
        ageGroup: ageGroupField,
      },
      {
        onSuccess: (data) => {
          setGroupFields([...groupFields, groupFields[groupFields.length - 1] + 1]);
          setPerformances([...performances, data.id]);
        },
      },
    );
  }

  function handleAthletesList() {
    const athletesList: OptionsTypes[] = [];

    if (athletes) {
      athletes.items.map((athlete) => {
        athletesList.push({
          value: athlete.id,
          label: `${athlete.lastName} ${athlete.firstName}`,
        });
      });
    }

    return athletesList;
  }

  function renderFieldsAthletes(indexGroupField: number) {
    const numberAthletes = getCountAthletesInGroup(nominationField);
    const participantList = getParticipantList();

    if (!isLoadingAthletes)
      return (
        <>
          <label>{indexGroupField}</label>
          <Fields>
            {[...Array(numberAthletes)].map((participant, index) => (
              <Select
                shouldUnregister
                key={index}
                control={control}
                name={`athletes.${indexGroupField * numberAthletes - index - 1}`}
                rules={{ required: t('error') }}
                options={handleAthletesList()}
                defaultValue={participantList[performances[indexGroupField - 1]]?.participants[index]?.athleteId}
              />
            ))}
          </Fields>
          <DeleteFormItem
            onClick={() => {
              setGroupFields([
                ...groupFields.slice(0, groupFields.indexOf(indexGroupField)),
                ...groupFields.slice(groupFields.indexOf(indexGroupField) + 1),
              ]);
              deletePerformance({
                id: performances[indexGroupField - 1],
              });
            }}
          >
            <SvgDelete />
          </DeleteFormItem>
        </>
      );
  }

  function renderGroupSectionsAthletes() {
    return groupFields.map((indexGroup) => {
      if (indexGroup != 0) {
        if (getCountAthletesInGroup(nominationField) > 1) {
          return <GroupSection key={indexGroup}>{renderFieldsAthletes(indexGroup)}</GroupSection>;
        }
        return <OnlySection key={indexGroup}>{renderFieldsAthletes(indexGroup)}</OnlySection>;
      }
    });
  }

  function handleArrayParticipants(data: FormValues) {
    const arrayPerformances: FormValues[] = [];
    const countAthletes = getCountAthletesInGroup(data.nomination);
    const participantList = getParticipantList();

    data.athletes.map((athlete, index) => {
      if ((index + 1) % countAthletes == 0) {
        arrayPerformances.push({
          ageCategory: data.ageCategory,
          nomination: data.nomination,
          athletes: data.athletes.slice(index - countAthletes + 1, index + 1),
        });
      }
    });

    performances.map((performanceId) => {
      editPerformance({
        id: performanceId,
        applicationId: props.applicationId,
        ageGroup: ageGroupField,
        nomination: nominationField,
      });
    });

    arrayPerformances.map((performance, indexPerformance) => {
      performance.athletes.map((participantId, indexParticipant) => {
        if (indexParticipant < participantList[performances[indexPerformance]]?.participants.length)
          editParticipant({
            id: participantList[performances[indexPerformance]].participants[indexParticipant]?.id,
            performanceId: performances[indexPerformance],
            athleteId: participantId,
          });
        else
          createParticipant({
            performanceId: performances[indexPerformance],
            athleteId: participantId,
          });
      });
    });
  }

  function onSubmit(data: FormValues) {
    handleArrayParticipants(data);
    setGroupFields([0]);
    props.onCloseModal();
    return reset();
  }

  return (
    <React.Suspense>
      <Modal
        open={props.isModalOpen}
        onCancel={() => {
          if (props.isEdit || groupFields.length == 1) {
            setGroupFields(
              props.isEdit && props.performanceList ? [...Array(props.performanceList.length + 1).keys()] : [0],
            );
            props.onCloseModal();
            reset();
          }
        }}
        width={572}
        title={t('title')}
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{ width: '50%' }}
            disabled={!isValid || isLoadingPerformance || isLoadingParticipant}
            loading={isLoadingAthletes}
            onClick={handleSubmit(onSubmit)}
          >
            {t('save')}
          </Button>,
        ]}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FlexInputsBox>
            <Select
              name="ageCategory"
              control={control}
              rules={{ required: t('error') }}
              options={ageCategoriesList}
              placeholder={t('form.category')}
              disabled={isLoadingAthletes}
              defaultValue={
                props.performanceList && props.performanceList?.length > 0
                  ? props.performanceList[0].ageGroup
                  : ('' as AgeGroups)
              }
            />
            <Select
              name="nomination"
              control={control}
              rules={{ required: t('error') }}
              options={nominationsList}
              placeholder={t('form.nominations')}
              disabled={isLoadingAthletes}
              defaultValue={
                props.performanceList && props.performanceList?.length > 0
                  ? props.performanceList[0].nomination
                  : ('' as Nominations)
              }
            />
          </FlexInputsBox>
          {groupFields.length > 1 && <SectionsSportsmen>{renderGroupSectionsAthletes()}</SectionsSportsmen>}
          {!isLoadingAthletes && (
            <Addition onClick={() => handleCreatePerformance()}>
              <SvgAddition />
              <label>{t('form.addition')}</label>
            </Addition>
          )}
        </Form>
      </Modal>
    </React.Suspense>
  );
}
