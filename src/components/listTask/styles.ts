import styled from 'styled-components';
import { base } from '../../styles/colors';

export const Container = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    
    // background-color: ${props => (props.onDragEnd ? base.purple : base.background_2)};

    justify-content: center;

    padding: 0 10px;
    height: 100%;
    // flex: 0 0 250px;

    ul {
        justify-content: baseline;
    }

    header {
        color: ${base.purple}
    }
`;