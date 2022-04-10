import { Container } from "./styles";
import { ListTask } from "../listTask";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { CardTaskClass } from "../../model/CardTask";
import { useEffect, useState } from "react";
import React from "react";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";

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
  usePoint: (type: ActionType) => void
}

export const CardBoard: React.FC<Params> = ({roundInfo, usePoint}) => {
  const [columns, setColumns] = useState<Column[]>();

  if (columns === undefined) {
    setColumns(generateColumns());
  }

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
      const card = start.column.cards[source.index];

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

    const card = start.column.cards[source.index];

    if (!card.canBeMoveTo(finish.column.type, start.column.type, roundInfo.todayCanBeDeploy())) return;

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

  useEffect(() => {
    console.log("Fruit", columns);
  }, [columns]);

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.map((item, index) => (
          <ListTask column={item} usePoint={usePoint}></ListTask>
        ))}
        {console.log(columns)}
      </DragDropContext>
    </Container>
  );
};

function generateColumns(): Column[] {
  return [
    {
      id: uuidv4(),
      name: "Backlog",
      cards: generateCards(),
      type: ActionType.BACKLOG,
    },
    {
      id: uuidv4(),
      name: "Em análise",
      cards: generateCards(),
      type: ActionType.PRODUCT_OWNER,
    },
    {
      id: uuidv4(),
      name: "Em desenvolvimento",
      cards: generateCards(),
      type: ActionType.DEVELOPER,
    },
    {
      id: uuidv4(),
      name: "Em testes",
      cards: generateCards(),
      type: ActionType.QUALITY_ASSURANCE,
    },
    {
      id: uuidv4(),
      name: "Aguardando deploy",
      cards: generateCards(),
      type: ActionType.DEPLOY,
    },
    {
      id: uuidv4(),
      name: "Em produção",
      cards: generateCards(),
      type: ActionType.PRODUCTION,
    },
  ];
}

function generateCards(): CardTaskClass[] {
  return [
    {
      canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
      addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
      addPointDevelop: CardTaskClass.prototype.addPointDevelop,
      addPointTest: CardTaskClass.prototype.addPointTest,
      name: "UST01",
      index: 1,
      id: uuidv4(),
      number: 3,
      pontuation: {
        analysis: {
          inserted: 1,
          needed: 4,
        },
        develop: {
          inserted: 3,
          needed: 5,
        },
        test: {
          inserted: 4,
          needed: 5,
        },
      },
    },
    {
      canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
      addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
      addPointDevelop: CardTaskClass.prototype.addPointDevelop,
      addPointTest: CardTaskClass.prototype.addPointTest,
      name: "UST02",
      index: 2,
      id: uuidv4(),
      number: 3,
      pontuation: {
        analysis: {
          inserted: 1,
          needed: 4,
        },
        develop: {
          inserted: 3,
          needed: 5,
        },
        test: {
          inserted: 4,
          needed: 5,
        },
      },
    },
    {
      canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
      addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
      addPointDevelop: CardTaskClass.prototype.addPointDevelop,
      addPointTest: CardTaskClass.prototype.addPointTest,
      name: "UST03",
      index: 4,
      id: uuidv4(),
      number: 3,
      pontuation: {
        analysis: {
          inserted: 1,
          needed: 4,
        },
        develop: {
          inserted: 3,
          needed: 5,
        },
        test: {
          inserted: 4,
          needed: 5,
        },
      },
    },
    {
      canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
      addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
      addPointDevelop: CardTaskClass.prototype.addPointDevelop,
      addPointTest: CardTaskClass.prototype.addPointTest,
      name: "UST04",
      index: 5,
      id: uuidv4(),
      number: 3,
      pontuation: {
        analysis: {
          inserted: 1,
          needed: 4,
        },
        develop: {
          inserted: 3,
          needed: 5,
        },
        test: {
          inserted: 4,
          needed: 5,
        },
      },
    },
  ];
}
