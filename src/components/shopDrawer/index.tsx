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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";

export type Params = {
  roundInfo: RoundInfo;
  playerInfo: PlayerInfo | undefined;
  newPowerUp: (powerUp: PlayerPowerUps) => void;
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  const [powerUp, setPowerUp] = useState<PlayerPowerUps>()

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
          {getAllAvailablePowerUps(playerInfo!.powerUps).map((powerUp, index) => (
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
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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

function getAllAvailablePowerUps(playerInfoPowerUps: PlayerPowerUps[]): PlayerPowerUps[] {
  const powerUps: PlayerPowerUps[] = [
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

  if(playerInfoPowerUps.some(e => e === PlayerPowerUps.AUTOMATION)) {
    if(!playerInfoPowerUps.some(e => e === PlayerPowerUps.CI_CD))
    powerUps.push(PlayerPowerUps.CI_CD)
  } else {
    powerUps.push(PlayerPowerUps.AUTOMATION)
  }

  return powerUps
}