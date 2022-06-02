import styled from "styled-components";
import { base } from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${base.background_2};
    

    .project {
        font-weight: bold;
        margin-right: 5px;
    }

    .name {
        font-weight: bold;
        margin-right: 5px;
    }

    .description {
        
    }
`;