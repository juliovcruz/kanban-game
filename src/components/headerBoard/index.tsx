import { Container } from "./styles";
import { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { base, ColorByActionType } from "../../styles/colors";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import WarningIcon from "@mui/icons-material/Warning";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Day, PlayerInfo, PlayerPowerUps, RoundInfo } from "../../App";
import CountUp from "react-countup";
import { getText, Language, LanguageText } from "../../model/Language";
import { ShopDrawer } from "../shopDrawer";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconPontuation } from "../cardBoard/cardTask/pontuation/styles";
import { PontuationComponent } from "../cardBoard/cardTask/pontuation";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ActionType } from "../../model/ActionType";

export type Params = {
  roundInfo: RoundInfo;
  playerInfo: PlayerInfo | undefined;
  nextRoundAction: () => void;
  newPowerUp: (powerUp: PlayerPowerUps) => void;
};

export const HeaderBoard: React.FC<Params> = ({
  roundInfo,
  nextRoundAction,
  playerInfo,
  newPowerUp
}) => {
  const [drawer, setDrawer] = useState<boolean>();

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: base.dark_purple_3,
    "&:hover": {
      backgroundColor: base.dark_purple_2,
    },
  }));

  return (
    <Container>
      <h1>Kanban Game</h1>
      <div className="pontuations">
                  <div className="analysis-points">
                    <PontuationComponent
                      onlyActual={true}
                      actual={roundInfo.playerRoundPoints.analysis}
                      needed={roundInfo.playerRoundPoints.analysis}
                      onChange={() => {}}
                      actionType={ActionType.PRODUCT_OWNER}
                    ></PontuationComponent>
                  </div>
                  <div className="dev-points">
                    <PontuationComponent
                      onlyActual={true}
                      actual={roundInfo.playerRoundPoints.develop}
                      needed={roundInfo.playerRoundPoints.develop}
                      onChange={() => {}}
                      actionType={ActionType.DEVELOPER}
                    ></PontuationComponent>
                  </div>
                  <div className="test-points">
                    <PontuationComponent
                      onlyActual={true}
                      actual={roundInfo.playerRoundPoints.test}
                      needed={roundInfo.playerRoundPoints.test}
                      onChange={() => {}}
                      actionType={ActionType.QUALITY_ASSURANCE}
                    ></PontuationComponent>
                  </div>
                </div>
      <div className="info-round">
        <h1>{getText(LanguageText.ROUND, playerInfo!.language)} {roundInfo.number}</h1>
      </div>
      <div className="info-content">
        <h2>{roundInfo.number > 0 ? getTextByDay(roundInfo.day, playerInfo!.language): ""}</h2>
        {roundInfo.todayCanBeDeploy() && !playerInfo!.powerUps.some(e => e === PlayerPowerUps.CI_CD) ? (
          <div className="info-content-warning">
            <h3>
              <WarningIcon fontSize={"small"}></WarningIcon> {getText(LanguageText.DEPLOY_DAY, playerInfo!.language)}{" "}
              <WarningIcon fontSize={"small"}></WarningIcon>
            </h3>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="price">
        <CountUp
          start={playerInfo?.lastPrice}
          end={playerInfo!.actualPrice}
          prefix={getText(LanguageText.COST_TOTAL, playerInfo!.language)}
        />
      </div>
      {roundInfo.day == Day.FRIDAY? <ColorButton
        variant="contained"
        endIcon={<ShoppingCartIcon />}
        onClick={() => setDrawer(true)}
      >
        {getText(LanguageText.SHOP, playerInfo!.language)}
      </ColorButton> : ""}
      <ColorButton
        variant="contained"
        endIcon={<SendIcon />}
        onClick={nextRoundAction}
      >
        {getText(LanguageText.NEXT_ROUND, playerInfo!.language)}
      </ColorButton>
      <ShopDrawer 
            open={drawer!}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
            roundInfo={roundInfo}
            playerInfo={playerInfo}
            newPowerUp={newPowerUp}
      >
      </ShopDrawer>
    </Container>
  );
};

function getTextByDay(day: Day, language: Language): string {
  const map = new Map<Day, LanguageText>([
    [Day.MONDAY,   LanguageText.MONDAY],
    [Day.TUESDAY,    LanguageText.TUESDAY],
    [Day.WEDNESDAY,   LanguageText.WEDNESDAY],
    [Day.THURSDAY,   LanguageText.THURSDAY],
    [Day.FRIDAY,   LanguageText.FRIDAY],
]);

  return getText(map.get(day)!, language)
}
