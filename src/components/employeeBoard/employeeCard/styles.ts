import styled from 'styled-components';
import { base } from '../../../styles/colors';

export const Container = styled.div`
    .card-content {
    background-color: ${base.background_2};
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    margin-top: 5px;
    margin-bottom: 5px;
    min-width: 155px;
    width: 100%;
    min-height: 55px;

    border: 1px solid ${base.dark_purple};
    border-radius: 15px;

    cursor: grab;

    div.card-body {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .title {
      min-width: 90px;
      margin: 5px;
      color: ${base.light_purple};
      font-weight: bold;
      letter-spacing: 1.5px;
      }

      .price {
        color: ${base.green}
      }
    }

      p {
        color: ${base.light_purple};
      }
    }
`;

export const IconEmployee = styled.div<{ color: string; visible: boolean }>`
  color: ${({ color }) => (color ? color : '#f2faeb')};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
