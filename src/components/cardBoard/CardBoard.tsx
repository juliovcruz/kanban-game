import { Container } from "./styles";
import { ListTask } from "../listTask";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { CardTask } from "../../model/CardTask";
import { Component, useEffect, useState } from "react";
import React from "react";
import { render } from "react-dom";

export type Column = {
  id: string;
  name: string;
  cards: CardTask[];
};

export type ColumnIndex = {
  column: Column;
  index: number;
};

export const CardBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>();

  if (columns === undefined) {
    console.log("resetado");
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
          <ListTask cards={item.cards} id={item.id} name={item.name}></ListTask>
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
    },
    {
      id: uuidv4(),
      name: "Em análise",
      cards: generateCards(),
    },
    {
      id: uuidv4(),
      name: "Em desenvolvimento",
      cards: generateCards(),
    },
    {
      id: uuidv4(),
      name: "Em testes",
      cards: generateCards(),
    },
    {
      id: uuidv4(),
      name: "Aguardando deploy",
      cards: generateCards(),
    },
    {
      id: uuidv4(),
      name: "Em produção",
      cards: generateCards(),
    },
  ];
}

function generateCards(): CardTask[] {
  return [
    {
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
          inserted: 5,
          needed: 5,
        },
      },
    },
    {
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
          inserted: 5,
          needed: 5,
        },
      },
    },
    {
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
          inserted: 5,
          needed: 5,
        },
      },
    },
    {
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
          inserted: 5,
          needed: 5,
        },
      },
    },
  ];
}
