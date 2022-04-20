import styled from "styled-components";
import { base } from "../../styles/colors";

export const Container = styled.div`
    height: 50px;
    padding: 30px;
    background: ${base.background_2}; 
    
    display: flex;
    align-items: center;
    justify-content: flex-end;

    position: static;

    .language {
        cursor: pointer;
        margin: 30px;
    }

    .reset {
        cursor: pointer;
        color: ${base.white}
    }
`;