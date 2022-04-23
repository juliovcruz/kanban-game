import { Container } from "./styles";
import { CardList } from "./cardList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CardTaskClass } from "../../model/CardTask";
import { useState } from "react";
import React from "react";
import { ActionType } from "../../model/ActionType";
import { PlayerInfo, PlayerPowerUps, RoundInfo } from "../../App";
import { ErrorState } from "./cardTask";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Database } from "../../data/database";
import { Employee } from "../../model/Employee";
import { getText, Language, LanguageText } from "../../model/Language";

export type CardColumn = {
  id: string;
  name: string;
  cards: CardTaskClass[];
  type: ActionType;
};

type ColumnIndex = {
  column: CardColumn;
  index: number;
};

export type Params = {
  roundInfo: RoundInfo,
  paramsColumns: CardColumn[] | undefined,
  database: Database,
  employeesDeploy: Employee[] | undefined,
  playerInfo: PlayerInfo,
  usePoint: (type: ActionType) => Boolean,
  updateCardColumns: (cardColumns: CardColumn[]) => void
  finishPowerUp: (powerUp: PlayerPowerUps, cardRoundStart: number) => void
};

export const CardBoard: React.FC<Params> = ({ 
  roundInfo, usePoint, paramsColumns, database, employeesDeploy, updateCardColumns, finishPowerUp, playerInfo
}) => {
  const [columns, setColumns] = useState<CardColumn[] | undefined>(paramsColumns);
  const [stateError, setError] = useState<ErrorState>();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (columns == undefined) return;

    const start = getColumnById(columns, source.droppableId);
    const finish = getColumnById(columns, destination.droppableId);

    if (source.droppableId == destination.droppableId) {
      const card = start.column.cards[source.index]

      const newCards = start.column.cards.filter(
        (_, index) => index != source.index
      );
      newCards.splice(destination.index, 0, card);

      const newColumn = {
        ...start.column,
        cards: newCards,
      };

      columns[start.index] = newColumn;

      setColumns([...columns]);
      return;
    }

    const newStartColumn = {
      ...start.column,
      cards: start.column.cards.filter((_, index) => index != source.index),
    };

    const card = start.column.cards[source.index]

    if(card.roundEnded != null) {
      setError({bool: true, message: getText(LanguageText.ERROR_CARD_MOVE_BACK_PRODUCTION, playerInfo.language)})
      return
    }

    const bool = card.canBeMoveTo(
      finish.column.type,
      start.column.type,
      roundInfo.todayCanBeDeploy(),
      employeesDeploy,
      roundInfo,
      playerInfo
    )

    if (!bool.bool) {
      setError({bool: true, message: getText(bool.text!, playerInfo.language)})
      return;
    }

    switch(finish.column.type) {
      case ActionType.PRODUCT_OWNER: card.start(roundInfo); break;
      case ActionType.PRODUCTION: {
        if(card.powerUp != null) {
          setError({bool: true, message: getFinishTextByPowerUp(card.powerUp, playerInfo.language), info: true})
          finishPowerUp(card.powerUp, card.roundStarted!)
        }
        card.end(roundInfo)
        break
      }
    }

    if(finish.index > start.index) card.setLastMove(roundInfo)

    const newFinishCardColumns = finish.column.cards;
    newFinishCardColumns.splice(destination.index, 0, card);

    const newFinishColumn = {
      ...finish.column,
      cards: newFinishCardColumns,
    };

    columns[start.index] = newStartColumn;
    columns[finish.index] = newFinishColumn;

    setColumns([...columns]);
    updateCardColumns(columns)
    database.setCardColumns(columns)
  };

  const archiveCards = () => {
    columns!.forEach((column) => {
      column.cards.forEach((card) => {
        if(card.roundEnded != null) card.archived = true
      })
    })

    updateCardColumns(columns!)
  }

  function getColumnById(columns: CardColumn[], id: string): ColumnIndex {
    const column = columns.filter((x) => x.id == id)[0];
    return {
      column: column,
      index: columns.indexOf(column),
    };
  }

  return (
    <Container>
      <h2>{getText(LanguageText.TASKS, playerInfo.language)}</h2>
      <div className="list">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.map((item, index) => (
          <CardList
            archiveCards={archiveCards}
            playerInfo={playerInfo}
            column={item}
            usePoint={usePoint}
            roundInfo={roundInfo}
          ></CardList>
        ))}
      </DragDropContext>
      {stateError?.bool ? (
        <SnackBarAlert onClose={() => {
          setError({ bool: false, info: false });
        }
        } message={stateError.message}
        info={stateError.info} >
        </SnackBarAlert>
      ) : (
        <></> )}
        </div>
    </Container>
  );
};

function getFinishTextByPowerUp(powerUp: PlayerPowerUps, language: Language): string {
  const map = new Map<PlayerPowerUps, LanguageText>([
    [PlayerPowerUps.AUTOMATION, LanguageText.POWER_UP_AUTOMATION_INFO_FINISH],
    [PlayerPowerUps.CI_CD, LanguageText.POWER_UP_CI_CD_INFO_FINISH]
  ]);

  var text = map.get(powerUp)
  
  if(text == null) text = LanguageText.POWER_UP_GENERIC_INFO_FINISH

  return getText(text, language);
}