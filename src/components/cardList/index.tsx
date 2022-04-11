import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../styles/colors";
import { CardTaskComponent } from "../cardTask";
import { Container } from "./styles";
import { CardColumn } from "../cardBoard";
import { CardTaskClass } from "../../model/CardTask";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";

export interface Params {
  column: CardColumn;
  roundInfo: RoundInfo;
  usePoint: (type: ActionType) => Boolean;
}

export const CardList: React.FC<Params> = ({ column, usePoint, roundInfo }) => {
  const [cards, setCards] = useState<CardTaskClass[]>();

  if (cards == undefined) {
    setCards(column.cards);
  }

  return (
    <Container>
      <header>
        <h2>{column.name}</h2>
      </header>
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
                <li key={item.id}>
                  <CardTaskComponent
                    cardTask={item}
                    index={index}
                    actualColumnType={column.type}
                    usePoint={usePoint}
                    roundInfo={roundInfo}
                  ></CardTaskComponent>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Droppable>
    </Container>
  );
};
