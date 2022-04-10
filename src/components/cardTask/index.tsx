import { Container } from "./styles";
import { CardTaskClass } from "../../model/CardTask";
import { PontuationComponent } from "./pontuation/pontuation";
import { ActionType } from "../../model/ActionType";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RoundInfo } from "../../App";

export interface Params {
  cardTask: CardTaskClass;
  index: number;
  actualColumnType: ActionType;
  roundInfo: RoundInfo;
  usePoint: (type: ActionType) => Boolean;
}

export const CardTaskComponent: React.FC<Params> = ({
  cardTask,
  index,
  actualColumnType,
  usePoint,
  roundInfo,
}) => {
  const [card, setState] = useState<CardTaskClass>(cardTask);

  function addAnalysis() {
    const novoCard = Object.assign({}, card);

    if (novoCard.addPointAnalysis(actualColumnType)) {
      if (!usePoint(actualColumnType)) {
        console.log("acabou os pontos");
        return;
      }
      setState(novoCard);
      console.log("adicionei em analysis");
    }
  }

  function addDeveloper() {
    const novoCard = Object.assign({}, card);

    if (novoCard.addPointDevelop(actualColumnType)) {
      if (!usePoint(actualColumnType)) {
        console.log("acabou os pontos");
        return;
      }

      setState(novoCard);
      console.log("adicionei em develop");
    }
  }

  function addTest() {
    const novoCard = Object.assign({}, card);
    if (novoCard.addPointTest(actualColumnType)) {
      if (!usePoint(actualColumnType)) {
        console.log("acabou os pontos");
        return;
      }
      setState(novoCard);
      console.log("adicionei em test");
    }
  }

  // TODO: usar header
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
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
};
