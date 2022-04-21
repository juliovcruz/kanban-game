import styled from 'styled-components';
import { base } from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  align-items: center;

  h2 {
    color: ${base.light_purple}
  }

  .list {
    display: flex;
    flex-direction: row;
  }
`;