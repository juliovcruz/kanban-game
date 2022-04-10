import { SettingsInputAntennaTwoTone, UsbOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { CardTask } from "../../model/CardTask";
import { base } from "../../styles/colors";
import { CardTaskComponent } from "../cardTask";
import { Container } from "./styles";
import { Column } from "../cardBoard/CardBoard";
import { height } from "@mui/system";

export interface Params {
  id: string;
  name: string;
  cards: CardTask[];
}

export function ListTask(params: Params) {
  const [cards, setCards] = useState<CardTask[]>();

  if (cards == undefined) {
    setCards(params.cards);
  }

  useEffect(() => {
    setCards(params.cards);
  }, [cards]);

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
        <h2>{params.name}</h2>
      </header>
      <Droppable droppableId={params.id}>
        {(provided, snapshot) => (
          <div 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          style={
            { backgroundColor: snapshot.isDraggingOver ? base.background_2 : base.background }
          }
          >
            {provided.placeholder}
            <ul key={params.id}>
              {/* {ignoreUndefined(cards).map((item, index) => (
              <li key={item.id}>
                <CardTaskComponent
                  cardTask={item}
                  index={index}
                ></CardTaskComponent>
              </li>
            ))} */}
              {params.cards?.map((item, index) => (
                <li key={item.id}>
                  <CardTaskComponent
                    cardTask={item}
                    index={index}
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

function ignoreUndefined(cards: CardTask[] | undefined): CardTask[] {
  if (cards === undefined) return [];
  return cards.filter((x) => x != undefined);
}
