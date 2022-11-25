import styled from 'styled-components';

import { colors } from '@judge-system/shared/styles/colors';

export const Age = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  user-select: none;
`;

export const Title = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  user-select: none;
`;

export const EditMark = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: end;
  margin-right: 0;
  margin-left: auto;
  width: 28px;
  height: 28px;
`;

export const ListNominationFromAgeGroup = styled.section`
  margin-right: 40px;
  width: 337px;
`;

export const Category = styled.div`
  display: flex;
  align-content: space-between;
  padding: 8px 16px;
  width: 100%;
  gap: 16px;
  align-items: center;
  ${(props) => {
    switch (props.id) {
      case 'age_6_8':
      case 'age_6_8_sl':
        return `
          background-color: ${colors.tagRedFill};
          border: 1px solid ${colors.tagRedBorder};
          color: ${colors.tagRedText};
        `;
      case 'age_9_11':
      case 'age_9_11_sl':
        return `
          background-color: ${colors.tagBlueFill};
          border: 1px solid ${colors.tagBlueBorder};
          color: ${colors.tagBlueText};
        `;
      case 'age_12_14':
        return `
          background-color: ${colors.tagGreenFill};
          border: 1px solid ${colors.tagGreenBorder};
          color: ${colors.tagGreenText};
        `;
      case 'age_15_17':
        return `
          background-color: ${colors.tagPurpleFill};
          border: 1px solid ${colors.tagPurpleBorder};
          color: ${colors.tagPurpleText};
        `;
      case 'age_18':
        return `
          background-color: ${colors.tagMagnetaFill};
          border: 1px solid ${colors.tagMagnetaBorder};
          color: ${colors.tagMagnetaText};
        `;
      default:
        return;
    }
  }};
`;

export const AthleteList = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const Athlete = styled.div`
  display: grid;
  grid-column: 2;
  grid-template-columns: 45px auto;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  div {
    padding: 17px 16px;
  }
  label {
    width: 100%;
    float: left;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.black85};
  }
`;

export const GridInfo = styled(Athlete)`
  background-color: ${colors.neutral2};
  width: 100%;
  max-width: 337px;
  label {
    font-weight: 500;
  }
`;

export const NumberGroup = styled.div`
  display: flex;
  align-items: center;
`;
