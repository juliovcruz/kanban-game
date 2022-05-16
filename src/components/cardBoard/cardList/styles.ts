import styled from 'styled-components';
import { base } from '../../../styles/colors';

export const Container = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    justify-content: flex-start;

    padding: 0 10px;
    min-height: 600px;
    height: 100%;
    min-width: 200px;

    border-style: solid;
    border-width: 1px 1px 0 1px;
    border-color: ${base.grey};

    ul {
        justify-content: baseline;
    }

    .title-list {
        display: flex;
        flex-direction: row;


        h2 {
            color: ${base.purple}
        }

        .archive-icon {
            cursor: pointer;
        }
    }
`;