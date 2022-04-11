import { Container } from "./styles";
import { ListTask } from "../listTask";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { CardTaskClass } from "../../model/CardTask";
import { useEffect, useState } from "react";
import React from "react";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";
import { ErrorState } from "../cardTask";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";

export type Column = {
  id: string;
  name: string;
  cards: CardTaskClass[];
  type: ActionType;
};

export type ColumnIndex = {
  column: Column;
  index: number;
};

export type Params = {
  roundInfo: RoundInfo,
  paramsColumns: Column[],
  usePoint: (type: ActionType) => Boolean,
};

export const CardBoard: React.FC<Params> = ({ roundInfo, usePoint, paramsColumns }) => {
  const [columns, setColumns] = useState<Column[]>(paramsColumns);
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
    
    if(finish.index > start.index) card.setLastMove(roundInfo)

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

    const newFinishColumnCards = finish.column.cards;
    newFinishColumnCards.splice(destination.index, 0, card);

    const newFinishColumn = {
      ...finish.column,
      cards: newFinishColumnCards,
    };

    columns[start.index] = newStartColumn;
    columns[finish.index] = newFinishColumn;

    setColumns([...columns]);
  };

  function getColumnById(columns: Column[], id: string): ColumnIndex {
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
          <ListTask
            column={item}
            usePoint={usePoint}
            roundInfo={roundInfo}
          ></ListTask>
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
