import { SettingsInputAntennaTwoTone, UsbOutlined } from "@material-ui/icons";
import { useState } from "react";
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
import {v4 as uuidv4} from "uuid";

export interface Params {
  header: string;
}

export function ListTask(params: Params) {
  const [cards, setCards] = useState<CardTask[]>()

  if(cards == undefined) {
    setCards(generateCards)
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
  
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return
  
    if(cards == undefined) return

    const card = cards[source.index]

    const newCards = cards

    delete newCards[source.index]
    newCards.splice(destination.index, 0, card)

    console.log("DESTINATION: " + destination.index)
    console.log("SOURCE: " + source.index)

    console.log(newCards)

    setCards(newCards)
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={uuidv4()}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {provided.placeholder}
              <header>
                <h2>{params.header}</h2>
              </header>
              <ul>
                {cards?.map((item, index) => (
                  <li key={item.id}>
                  <CardTaskComponent cardTask={item} index={index}></CardTaskComponent>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

const generateCards = [
  {
    name: 'UST01', 
    index: 1,
    id: '' + 1,
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
    name: 'UST02', 
    index: 2,
    id: '' + 2,
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
    name: 'UST03', 
    index: 4,
    id: '' + 3,
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
    name: 'UST04', 
    index: 5,
    id: '' + 4,
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
  },]