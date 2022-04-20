import { Day, PlayerInfo, PlayerPowerUps, RoundInfo } from "../../App";
import { getText, Language, LanguageText } from "../../model/Language";
import FlagBR from '../../assets/flags/br.svg'
import FlagUS from '../../assets/flags/us.svg'
import { Container } from "./styles";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DescriptionModal } from "../shopDrawer/shopModal";
import { base } from "../../styles/colors";

export type Params = {
  playerInfo: PlayerInfo;
  updateLanguage: (language: Language) => void;
  resetBoard: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: base.background_2,
  color: base.light_purple,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FooterBoard: React.FC<Params> = ({
  playerInfo,
  updateLanguage,
  resetBoard
}) => {
  const [modal, setModal] = useState(false);

  return (
    <Container>
      <div className="language">
      {playerInfo.language == Language.BR ? <img src={FlagBR} style={{ height: 53, width: 36 }} onClick={() => updateLanguage(Language.EN)}></img> : <img src={FlagUS} style={{ height: 53, width: 36 }} onClick={() => updateLanguage(Language.BR)}></img>}
      </div>
      <div className="reset">
        <RestartAltIcon onClick={() => setModal(true)}></RestartAltIcon>
      </div>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DescriptionModal 
            onClick={() => {
              resetBoard()
            } } props={{
              name: getText(LanguageText.RESET_BOARD, playerInfo.language),
              salary: undefined,
              increase: undefined,
              description: getText(LanguageText.RESET_BOARD_DESCRIPTION, playerInfo.language)
            }}            >
          </DescriptionModal>
        </Box>
      </Modal>
    </Container>
  );
};
