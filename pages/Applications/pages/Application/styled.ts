import styled from 'styled-components';

import { colors } from '@judge-system/shared/styles/colors';

export const Wrapper = styled.div`
  display: flex;
  padding: 0 24px 32px;
  gap: 10px;
`;

export const TableApplication = styled.div`
  width: 100%;
  align-items: flex-start;
  padding: 0 24px 16px;
  gap: 4px;

  border-radius: 2px 2px 0 0;
  background: #fff;
`;

export const Toolbar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px 8px;
  gap: 10px;

  border-bottom: 1px solid #d9d9d9;
`;

export const Title = styled.div`
  display: flex;
  h2 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.black85};
    margin-right: 24px;
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  label {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.black85};
  }
`;

export const Options = styled.div`
  display: flex;
  margin-right: 0;
  margin-left: auto;
  gap: 16px;
`;

export const EventInfo = styled.div`
  padding: 24px 8px;
  gap: 24px;
`;

export const Form = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 24px;
  margin-bottom: 24px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  label {
    color: ${colors.black45};
  }
  p {
    color: ${colors.black85};
  }
`;

export const Addition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  label {
    cursor: inherit;
  }
  > svg {
    stroke: #fff;
  }
`;

export const ApplicationsWrapper = styled.div`
  display: flex;

  overflow-x: auto;
`;

export const CategorySection = styled.div``;
