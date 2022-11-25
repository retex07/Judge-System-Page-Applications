import styled from 'styled-components';

import { colors } from '@judge-system/shared/styles/colors';

export const Form = styled.form`
  max-height: 780px;
`;

export const Addition = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-top: 16px;
  gap: 12px;
  width: 100%;
  cursor: pointer;
  > svg {
    cursor: inherit;
    stroke: ${colors.primary6};
  }
  label {
    cursor: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.primary6};
    user-select: none;
  }
`;

export const SectionsSportsmen = styled.div`
  display: flex;
  max-height: 550px;
  overflow: auto;
  flex-direction: column;
  padding: 16px 24px 0;
  gap: 12px;
`;

export const OnlySection = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;

  user-select: none;
  label::after {
    content: '.';
  }
`;

export const GroupSection = styled.section`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;

  user-select: none;
  border: 1px solid ${colors.neutral3};
  border-radius: 2px;
  label::after {
    content: '.';
  }
`;

export const DeleteFormItem = styled.div`
  display: flex;
  cursor: pointer;
  margin-right: 0;
  margin-left: auto;
  &:hover {
    > svg {
      stroke: ${colors.primary6};
    }
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
