import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDeleteApplication } from '@/api/mutations/application/application/deleteApplication';
import useApplicationStatus from '@/components/ApplicationStatus';
import { eventsPaths } from '@/config/eventsPaths';
import { Application } from '@judge-system/shared/_types/application';
import { colors } from '@judge-system/shared/styles/colors';

//TODO: remake render type when backend update
export const useColumns = () => {
  const { t } = useTranslation('p_eventInformation');

  const { pathname } = useLocation();
  const eventId = pathname.split('/').reverse()[1];

  const navigate = useNavigate();

  const { mutate: deleteApplication } = useDeleteApplication();
  const { getApplicationStatus } = useApplicationStatus();

  const columns = [
    {
      title: t('application.coach'),
      dataIndex: 'coach',
      key: 'coach',
      width: '25%',
    },
    {
      title: t('application.federalSubject'),
      dataIndex: 'federalSubject',
      key: 'federalSubject',
      width: '25%',
    },
    {
      title: t('application.location'),
      dataIndex: 'location',
      key: 'location',
      width: '20%',
    },
    {
      title: t('application.organization'),
      dataIndex: 'organization',
      key: 'organization',
      width: '20%',
    },
    {
      title: t('application.status'),
      key: 'status',
      width: '10%',
      render: (record: Application) => getApplicationStatus(record.status),
    },
    {
      title: '',
      key: '1',
      width: '1%',
      render: (record: Application) => {
        return (
          <Space>
            <EditOutlined
              style={{ color: colors.primary6, cursor: 'pointer' }}
              onClick={() => navigate(eventsPaths.applications.item.edit, { state: { data: record, eventId } })}
            />
            <Popconfirm
              title={t('application.popconfirm.title')}
              okText={t('application.popconfirm.delete')}
              cancelText={t('application.popconfirm.cancel')}
              placement="topRight"
              onConfirm={() => deleteApplication({ id: record.id }, { onSuccess: () => window.location.reload() })}
            >
              {record.status == 'draft' && <DeleteOutlined style={{ color: colors.primary6, cursor: 'pointer' }} />}
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return { columns };
};
