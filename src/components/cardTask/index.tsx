import { Container } from "./styles";
import PersonIcon from "@mui/icons-material/Person";
import { CardTask } from "../../model/CardTask";
import Rating from "@mui/material/Rating";
import { PontuationComponent } from "./pontuation/pontuation";
import { ActionTypes } from "@mui/base";
import { ActionType } from "../../model/ActionType";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropReason,
  DropResult,
} from "react-beautiful-dnd";
import { cardClasses } from "@mui/material";

export interface Params {
  cardTask: CardTask;
  index: number;
}

export function CardTaskComponent(params: Params) {
  const [card, setState] = useState<CardTask>(params.cardTask);

  function addAnalysis() {
    const novoCard = Object.assign({}, card);
    if (
      novoCard.pontuation.analysis.inserted ==
      novoCard.pontuation.analysis.needed
    ) {
      console.log("chegou no limite");
      return;
    }

    novoCard.pontuation.analysis.inserted++;

    console.log("adicionei em analysis");
    setState(novoCard);
  }

  function addDeveloper() {
    const novoCard = Object.assign({}, card);
    if (
      novoCard.pontuation.develop.inserted == novoCard.pontuation.develop.needed
    ) {
      console.log("chegou no limite");
      return;
    }
    novoCard.pontuation.develop.inserted++;
    console.log("adicionei em developer card:" + novoCard.name);
    setState(novoCard);
  }

  function addTest() {
    const novoCard = Object.assign({}, card);

    if (novoCard.pontuation.test.inserted == novoCard.pontuation.test.needed) {
      console.log("chegou no limite");
      return;
    }

    novoCard.pontuation.test.inserted++;
    console.log("adicionei em tester");
    setState(novoCard);
  }

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    ...draggableStyle,
  });

  // TODO: usar header
  return (
    <Draggable key={card.id} draggableId={card.id} index={params.index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-content">
            <div className="card-body">
              <div className="title">{card.name}</div>
              <div className="pontuations">
                <div className="analysis-points">
                  <PontuationComponent
                    actual={card.pontuation.analysis.inserted}
                    needed={card.pontuation.analysis.needed}
                    onChange={addAnalysis}
                    actionType={ActionType.PRODUCT_OWNER}
                  ></PontuationComponent>
                </div>
                <div className="dev-points">
                  <PontuationComponent
                    actual={card.pontuation.develop.inserted}
                    needed={card.pontuation.develop.needed}
                    onChange={addDeveloper}
                    actionType={ActionType.DEVELOPER}
                  ></PontuationComponent>
                </div>
                <div className="test-points">
                  <PontuationComponent
                    actual={card.pontuation.test.inserted}
                    needed={card.pontuation.test.needed}
                    onChange={addTest}
                    actionType={ActionType.QUALITY_ASSURANCE}
                  ></PontuationComponent>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
