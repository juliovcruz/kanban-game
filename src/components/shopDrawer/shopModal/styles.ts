import styled from "styled-components";
import { makeStyles } from '@mui/styles';
import { base } from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${base.background_2};

    .salary {
        display: flex;
        flex-direction: row;

        .price {
            color: ${base.green};
        }
    }

    .button {
        display: flex;
        flex-direction: row-reverse;
    }
`;