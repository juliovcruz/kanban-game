import styled from "styled-components";
import { base } from "../../styles/colors";

export const Container = styled.div`
    height: 50px;
    padding: 30px;
    background: ${base.background_2}; 
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: static;

    .icons {
        display: flex;
        flex-direction: row;
    }

    .language {
        cursor: pointer;
        margin: 30px;
    }

    .reset {
        cursor: pointer;
        color: ${base.white};
    }

    .footer-description {
        color: ${base.light_purple}
    }

    .help {
        cursor: pointer;
        color: ${base.white};
        margin-right: 30px;
    }

    .archive {
        cursor: pointer;
        color: ${base.light_purple};
        margin-right: 30px;
    }
`;