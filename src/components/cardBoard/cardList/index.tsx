import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../../styles/colors";
import { CardTaskComponent } from "../cardTask";
import { Container } from "./styles";
import { CardColumn } from "..";
import { CardTaskClass } from "../../../model/CardTask";
import { ActionType } from "../../../model/ActionType";
import { PlayerInfo, RoundInfo } from "../../../App";
import { getText, Language, LanguageText } from "../../../model/Language";
import ArchiveIcon from '@mui/icons-material/Archive';

export interface Params {
  column: CardColumn;
  roundInfo: RoundInfo;
  playerInfo: PlayerInfo
  usePoint: (type: ActionType) => Boolean;
  archiveCards: () => void;
}

export const CardList: React.FC<Params> = ({ column, usePoint, roundInfo, playerInfo, archiveCards }) => {
  const [cards, setCards] = useState<CardTaskClass[]>();

  if (cards == undefined) {
    setCards(column.cards);
  }

  return (
    <Container>
      <div className="title-list">
        <h2>{getTextByActionType(column.type, playerInfo.language)}
        {column.type == ActionType.PRODUCTION ? <div onClick={() => archiveCards()}className="archive-icon"><ArchiveIcon fontSize="small"></ArchiveIcon></div> : ""}
        </h2>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver
                ? base.background_2
                : base.background,
            }}
          >
            {provided.placeholder}
            <ul key={column.id}>
              {column.cards?.map((item, index) => (
                !item.archived ?
                <li key={item.id}>
                  <CardTaskComponent
                    playerInfo={playerInfo}
                    cardTask={item}
                    index={index}
                    actualColumnType={column.type}
                    usePoint={usePoint}
                    roundInfo={roundInfo}
                  ></CardTaskComponent>
                </li> : ""
              ))}
            </ul>
          </div>
        )}
      </Droppable>
    </Container>
  );
};

function getTextByActionType(actionType: ActionType, language: Language): string {
  const map = new Map<ActionType, LanguageText>([
    [ActionType.BACKLOG ,LanguageText.BACKLOG],
    [ActionType.PRODUCT_OWNER ,LanguageText.IN_ANALYSIS],
    [ActionType.DEVELOPER ,LanguageText.IN_DEVELOPMENT],
    [ActionType.QUALITY_ASSURANCE ,LanguageText.IN_TESTS],
    [ActionType.DEPLOY ,LanguageText.WAITING_DEPLOY],
    [ActionType.PRODUCTION ,LanguageText.IN_PRODUCTION],
]);

  return getText(map.get(actionType)!, language)
}
