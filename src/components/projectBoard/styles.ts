import styled from 'styled-components';
import { base } from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;

  h2 {
    color: ${base.light_purple}
  }

  .list {
    display: flex;
    flex-direction: row;
  }
`;