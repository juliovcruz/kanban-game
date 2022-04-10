import styled from "styled-components";

export const Container = styled.div`
    cursor: pointer;
`;

export const IconPontuation = styled.div<{ color: string; visible: boolean }>`
  color: ${({ color }) => (color ? color : '#f2faeb')};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
