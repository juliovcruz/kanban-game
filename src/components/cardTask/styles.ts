import styled from 'styled-components';
import { base } from '../../styles/colors';

export const Container = styled.div`
    .card-content {
    background-color: ${base.background_2};
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    margin: 5px;
    min-width: 155px;
    width: 100%;
    min-height: 55px;

    border: 1px solid #eeeeed;
    border-radius: 15px;
    border-color: ${base.dark_purple};

    cursor: grab;

    div.card-body {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      .pontuations {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .title {
      min-width: 90px;
      margin: 5px;
      color: ${base.light_purple};
      text-align: center;
      font-weight: bold;
      letter-spacing: 1.5px;
    }
  }
`;