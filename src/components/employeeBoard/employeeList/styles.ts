import styled from 'styled-components';
import { base } from '../../../styles/colors';

export const Container = styled.div<{lined: boolean}>`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    justify-content: flex-start;

    padding: 0 10px;
    min-height: 180px;
    height: 100%;
    min-width: 200px;

    border: 1px solid ${base.grey};

    ul {
        justify-content: baseline;
    }

    header {
        color: ${base.purple};

        h2 {
            text-decoration: ${({ lined }) => (lined ? 'line-through' : 'none')};
        }
    }
`;