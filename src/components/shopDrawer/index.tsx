import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { PlayerInfo, PlayerPowerUps, RoundInfo } from "../../App";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getText, Language, LanguageText } from "../../model/Language";
import { Container, drawerStyles } from "./styles";
import { base } from "../../styles/colors";

export type Params = {
  roundInfo: RoundInfo;
  playerInfo: PlayerInfo | undefined;
  newPowerUp: (powerUp: PlayerPowerUps) => void;
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
};

export const ShopDrawer: React.FC<Params> = ({
  open,
  roundInfo,
  newPowerUp,
  playerInfo,
  onOpen,
  onClose
}) => {
  const classes = drawerStyles();

  return (
    <Container>
      <SwipeableDrawer
        classes={{ paper: classes.paper }}
        anchor={"right"}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        <List>
          {getAllAvailablePowerUps().map((powerUp, index) => (
            <ListItem button key={powerUp} onClick={() => {
              newPowerUp(powerUp)
              onClose()
              }}>
              <ListItemIcon>
                <AttachMoneyIcon style={{ color: base.green }}/>
              </ListItemIcon>
              <ListItem button>
              <ListItemText 
                  primaryTypographyProps={{ style: {color: base.light_purple}}} primary={getTextByPowerUp(powerUp, playerInfo!.language)}/>
              </ListItem>
              <ListItemText 
                  primaryTypographyProps={{ style: {color: base.green}}} primary={'$' + getPriceByPowerUp(powerUp)}/>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </Container>
  );
};

function getTextByPowerUp(powerUp: PlayerPowerUps, language: Language): string {
  const map = new Map<PlayerPowerUps, LanguageText>([
    [PlayerPowerUps.AUTOMATION,   LanguageText.POWER_UP_AUTOMATION],
    [PlayerPowerUps.CI_CD,    LanguageText.POWER_UP_CI_CD],
    [PlayerPowerUps.NEW_DEV,   LanguageText.POWER_UP_NEW_DEV],
    [PlayerPowerUps.NEW_PO,   LanguageText.POWER_UP_NEW_PO],
    [PlayerPowerUps.NEW_QA,   LanguageText.POWER_UP_NEW_QA],
    [PlayerPowerUps.TRAIN_DEV_TO_ACTION_PO,   LanguageText.POWER_UP_TRAIN_DEV_TO_ACTION_PO],
    [PlayerPowerUps.TRAIN_DEV_TO_ACTION_QA,   LanguageText.POWER_UP_TRAIN_DEV_TO_ACTION_QA],
    [PlayerPowerUps.TRAIN_PO_TO_ACTION_QA,   LanguageText.POWER_UP_TRAIN_PO_TO_ACTION_QA],
    [PlayerPowerUps.TRAIN_PO_TO_ACTION_DEV, LanguageText.POWER_UP_TRAIN_PO_TO_ACTION_DEV],
    [PlayerPowerUps.TRAIN_QA_TO_ACTION_PO,   LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_PO],
    [PlayerPowerUps.TRAIN_QA_TO_ACTION_DEV,   LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_DEV]
]);

  return getText(map.get(powerUp)!, language)
}


export function getPriceByPowerUp(powerUp: PlayerPowerUps): number {
  const map = new Map<PlayerPowerUps, number>([
    [PlayerPowerUps.AUTOMATION,   600],
    [PlayerPowerUps.CI_CD,    450],
    [PlayerPowerUps.NEW_DEV,   400],
    [PlayerPowerUps.NEW_PO,   400],
    [PlayerPowerUps.NEW_QA,   400],
    [PlayerPowerUps.TRAIN_DEV_TO_ACTION_PO,   300],
    [PlayerPowerUps.TRAIN_DEV_TO_ACTION_QA,   300],
    [PlayerPowerUps.TRAIN_PO_TO_ACTION_QA,   300],
    [PlayerPowerUps.TRAIN_PO_TO_ACTION_DEV,   300],
    [PlayerPowerUps.TRAIN_QA_TO_ACTION_PO,   300],
    [PlayerPowerUps.TRAIN_QA_TO_ACTION_DEV,   300]
]);

  const result = map.get(powerUp)!

  return result
}

function getAllAvailablePowerUps(): PlayerPowerUps[] {
  return [
    PlayerPowerUps.AUTOMATION,
    PlayerPowerUps.CI_CD,
    PlayerPowerUps.NEW_DEV,
    PlayerPowerUps.NEW_PO,
    PlayerPowerUps.NEW_QA,
    PlayerPowerUps.TRAIN_DEV_TO_ACTION_PO,
    PlayerPowerUps.TRAIN_DEV_TO_ACTION_QA,
    PlayerPowerUps.TRAIN_PO_TO_ACTION_QA,
    PlayerPowerUps.TRAIN_PO_TO_ACTION_DEV,
    PlayerPowerUps.TRAIN_QA_TO_ACTION_PO,
    PlayerPowerUps.TRAIN_QA_TO_ACTION_DEV
  ]
}