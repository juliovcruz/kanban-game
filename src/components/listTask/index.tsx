import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../styles/colors";
import { CardTaskComponent } from "../cardTask";
import { Container } from "./styles";
import { Column } from "../cardBoard/CardBoard";
import { CardTaskClass } from "../../model/CardTask";

export interface Params {
  column: Column;
}

export function ListTask(params: Params) {
  const [cards, setCards] = useState<CardTaskClass[]>();

  if (cards == undefined) {
    setCards(params.column.cards);
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (destination.droppableId === source.droppableId) {
      if (cards == undefined) return;

      const card = cards[source.index];

      const newCards = cards;

      delete newCards[source.index];
      newCards.splice(destination.index, 0, card);

      console.log("DESTINATION: " + destination.index);
      console.log("SOURCE: " + source.index);

      console.log(newCards);

      setCards(newCards);
      return;
    }
  };

  return (
    <Container>
      <header>
        <h2>{params.column.name}</h2>
      </header>
      <Droppable droppableId={params.column.id}>
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
            <ul key={params.column.id}>
              {params.column.cards?.map((item, index) => (
                <li key={item.id}>
                  <CardTaskComponent
                    cardTask={item}
                    index={index}
                    actualColumnType={params.column.type}
                  ></CardTaskComponent>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Droppable>
    </Container>
  );
}
