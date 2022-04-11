import { Container } from "./styles";
import { CardList } from "../cardList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CardTaskClass } from "../../model/CardTask";
import { useState } from "react";
import React from "react";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";
import { ErrorState } from "../cardTask";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Database } from "../../data/database";

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
  usePoint: (type: ActionType) => Boolean,
};

export const CardBoard: React.FC<Params> = ({ roundInfo, usePoint, paramsColumns, database }) => {
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

    switch(finish.column.type) {
      case ActionType.PRODUCT_OWNER: card.start(roundInfo); break;
      case ActionType.PRODUCTION: card.end(roundInfo); break;
    }

    const bool = card.canBeMoveTo(
      finish.column.type,
      start.column.type,
      roundInfo.todayCanBeDeploy()
    )

    if (!bool.bool) {
      setError({bool: true, message: bool.message})
      return;
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
    database.setCardColumns(columns)
  };

  function getColumnById(columns: CardColumn[], id: string): ColumnIndex {
    const column = columns.filter((x) => x.id == id)[0];
    return {
      column: column,
      index: columns.indexOf(column),
    };
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.map((item, index) => (
          <CardList
            column={item}
            usePoint={usePoint}
            roundInfo={roundInfo}
          ></CardList>
        ))}
      </DragDropContext>
      {stateError?.bool ? (
        <SnackBarAlert onClose={() => {
          setError({ bool: false });
        }} message={stateError.message} >
        </SnackBarAlert>
      ) : (
        <></> )}
    </Container>
  );
};
