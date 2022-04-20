import styled from "styled-components";
import { base } from "../../../../styles/colors";

export const Container = styled.div<{ color: string}>`
    cursor: pointer;

    .pontuation {
      p {
        color: ${({ color }) => (color ? color : base.white)};
        text-align: center;
      }
    }
`;

export const IconPontuation = styled.div<{ color: string; visible: boolean }>`
  color: ${({ color }) => (color ? color : '#f2faeb')};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
