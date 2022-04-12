import { Container } from "./styles";
import { useState } from "react";
import Button, { ButtonProps } from '@mui/material/Button';
import SendIcon from "@mui/icons-material/Send";
import { base } from "../../styles/colors";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import { PlayerInfo, RoundInfo } from "../../App";

export type Params = {
    roundInfo: RoundInfo,
    playerInfo: PlayerInfo | undefined,
    nextRoundAction: () => void
}

export const HeaderBoard: React.FC<Params> = ({roundInfo, nextRoundAction, playerInfo}) => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: base.dark_purple_3,
    '&:hover': {
      backgroundColor: base.dark_purple_2,
    },
  }));

  return (
    <Container>
      <h1>Kanban Game</h1>
      <div>
          <p>Analise: {roundInfo.playerRoundPoints.analysis}</p>
          <p>Develop: {roundInfo.playerRoundPoints.develop}</p>
          <p>Test: {roundInfo.playerRoundPoints.test}</p>
      </div>
      <div className="info-round">
          <h1>RODADA {roundInfo.number}</h1>
      </div>
      <div className="info-content">
        <h2>{roundInfo.getDayName()}</h2>
        {roundInfo.todayCanBeDeploy() ? 
        <div className="info-content-warning">
        <h3><WarningIcon fontSize={"small"}></WarningIcon> Dia de deploy <WarningIcon fontSize={"small"}></WarningIcon></h3>
        </div>
        : <div></div>
        }
      </div>
      <div className="price">
          <p>Custo atual: ${playerInfo?.actualPrice}</p>
      </div>
      <ColorButton variant="contained" endIcon={<SendIcon />} onClick={nextRoundAction}>
        PRÓXIMA RODADA
      </ColorButton>
    </Container>
  );
};
