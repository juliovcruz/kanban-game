import styled from "styled-components";
import { base } from "../../styles/colors";

export const Container = styled.div`
    height: 80px;
    padding: 0 30px;
    background: ${base.background_2}; 
    color: ${base.purple};
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info-content {
        align-items: center;
        justify-content: center;
        text-align: center;

        h3 {
            align-items: baseline;
            color: ${base.orange};
        }
    }

    .price {
        color: ${base.green}
    }

    .pontuations {
        display: flex;
        flex-direction: row;
    }
`;