import styled from "styled-components";
import { base } from "../../../../styles/colors";

export const Container = styled.div`
    cursor: pointer;

    p {
      color: ${base.white}
    }
`;

export const IconPontuation = styled.div<{ color: string; visible: boolean }>`
  color: ${({ color }) => (color ? color : '#f2faeb')};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
