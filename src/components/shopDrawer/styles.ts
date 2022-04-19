import styled from "styled-components";
import { base } from "../../styles/colors";
import { makeStyles } from '@mui/styles';

export const Container = styled.div`
    background-color: ${base.background_2};
    color: ${base.light_purple}
`;

export const drawerStyles = makeStyles({
    list: {
      width: 350
    },
    fullList: {
      width: "auto"
    },
    paper: {
      background: base.background_2,
      width: 350
    }
  });