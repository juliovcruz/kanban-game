import { Day, PlayerInfo, PlayerPowerUps, RoundInfo } from "../../App";
import { getText, Language, LanguageText } from "../../model/Language";
import FlagBR from '../../assets/flags/br.svg'
import FlagUS from '../../assets/flags/us.svg'
import { Container } from "./styles";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DescriptionModal } from "../shopDrawer/shopModal";
import { base } from "../../styles/colors";
import InventoryIcon from '@mui/icons-material/Inventory';
import { CardColumn } from "../cardBoard";
import { CardTaskClass } from "../../model/CardTask";
import { ArchiveModal } from "./archiveModal";

export type Params = {
  playerInfo: PlayerInfo;
  cardColumns: CardColumn[];
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
  resetBoard,
  cardColumns
}) => {
  const [modal, setModal] = useState(false);
  const [archive, setArchive] = useState(false);

  return (
    <Container>
      <div className="language">
      {playerInfo.language == Language.BR ? <img src={FlagBR} style={{ height: 53, width: 36 }} onClick={() => updateLanguage(Language.EN)}></img> : <img src={FlagUS} style={{ height: 53, width: 36 }} onClick={() => updateLanguage(Language.BR)}></img>}
      </div>

      <div className="footer-description">
      {getText(LanguageText.MADE_WITH_LOVE, playerInfo!.language)}
      </div>

      <div className="icons">
        <div className="help">
          <HelpOutlineIcon onClick={() => window.open("https://github.com/juliovcruz/kanban-game", "_blank")}></HelpOutlineIcon>
        </div>

        <div className="archive">
          <InventoryIcon onClick={() => setArchive(true)}></InventoryIcon>
        </div>

        <div className="reset">
          <RestartAltIcon onClick={() => setModal(true)}></RestartAltIcon>
        </div>
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
            }} >
          </DescriptionModal>
        </Box>
      </Modal>
      <Modal
        open={archive}
        onClose={() => setArchive(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2>{getText(LanguageText.ARCHIVED, playerInfo.language)}</h2>
        {getArchivedCads(cardColumns).map((item, index) => (
          <ArchiveModal
            card={item}
          ></ArchiveModal>
        ))}
        </Box>
      </Modal>
    </Container>
  );
};

function getArchivedCads(columns: CardColumn[]): CardTaskClass[] {
  let cards: CardTaskClass[] = []

  columns.forEach((column) => {
    column.cards.forEach((card) => {
      if(card.archived) cards.push(card)
    })
  })

  return cards.sort((n1, n2) => n1.projectName.localeCompare(n2.projectName))
}