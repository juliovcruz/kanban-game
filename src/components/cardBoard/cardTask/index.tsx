import { Container } from "./styles";
import { CardTaskClass } from "../../../model/CardTask";
import { PontuationComponent } from "./pontuation";
import { ActionType } from "../../../model/ActionType";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RoundInfo } from "../../../App";
import React from "react";
import { SnackBarAlert } from "../../snackBarAlert/snackBarAlert";
import { base } from "../../../styles/colors";

export interface Params {
  cardTask: CardTaskClass;
  index: number;
  actualColumnType: ActionType;
  roundInfo: RoundInfo;
  usePoint: (type: ActionType) => Boolean;
}

export type ErrorState = {
  bool: Boolean;
  message?: string;
};

export const CardTaskComponent: React.FC<Params> = ({
  cardTask,
  index,
  actualColumnType,
  usePoint,
  roundInfo,
}) => {
  const [card, setState] = useState<CardTaskClass>(cardTask);
  const [stateError, setError] = useState<ErrorState>();

  async function addAnalysis() {
    const novoCard = Object.assign({}, card);

    if (roundInfo.playerRoundPoints.analysis <= 0) {
      setError({
        bool: true,
        message: "Não há pontos suficientes para utilizar",
      });
      return;
    }

    const response = novoCard.addPointAnalysis(actualColumnType, roundInfo);

    if (response.bool) {
      if (!usePoint(actualColumnType)) {
        setError({
          bool: true,
          message: "Não há pontos suficientes para utilizar",
        });
        return;
      }

      setState(novoCard);
      return;
    } else {
      setError({ bool: true, message: response.message });
    }
  }

  function addDeveloper() {
    const novoCard = Object.assign({}, card);

    if (roundInfo.playerRoundPoints.develop <= 0) {
      setError({
        bool: true,
        message: "Não há pontos suficientes para utilizar",
      });
      return;
    }

    const response = novoCard.addPointDevelop(actualColumnType, roundInfo);

    if (response.bool) {
      if (!usePoint(actualColumnType)) {
        setError({
          bool: true,
          message: "Não há pontos suficientes para utilizar",
        });
        return;
      }

      setState(novoCard);
      return;
    } else {
      setError({ bool: true, message: response.message });
    }
  }

  function addTest() {
    const novoCard = Object.assign({}, card);

    if (roundInfo.playerRoundPoints.test <= 0) {
      setError({
        bool: true,
        message: "Não há pontos suficientes para utilizar",
      });
      return;
    }

    const response = novoCard.addPointTest(actualColumnType, roundInfo);

    if (response.bool) {
      if (!usePoint(actualColumnType)) {
        setError({
          bool: true,
          message: "Não há pontos suficientes para utilizar",
        });
        return;
      }

      setState(novoCard);
      return;
    } else {
      setError({ bool: true, message: response.message });
    }
  }

  // TODO: usar header
  return (
    <>
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <Container color={colorCard(card)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="info-content">
                  <p>[{card.projectName}]</p>
                  <div className="title">{card.name}</div>
                  <div className="info-round">
                    <p>{card.roundStarted != null ? ("S:" + card.roundStarted) : '' } {card.roundEnded != null ? ("E:" + card.roundEnded) : '' }</p>
                  </div>
                </div>
                <div className="pontuations">
                  <div className="analysis-points">
                    <PontuationComponent
                      onlyActual={false}
                      actual={card.pontuation.analysis.inserted}
                      needed={card.pontuation.analysis.needed}
                      onChange={addAnalysis}
                      actionType={ActionType.PRODUCT_OWNER}
                    ></PontuationComponent>
                  </div>
                  <div className="dev-points">
                    <PontuationComponent
                      onlyActual={false}
                      actual={card.pontuation.develop.inserted}
                      needed={card.pontuation.develop.needed}
                      onChange={addDeveloper}
                      actionType={ActionType.DEVELOPER}
                    ></PontuationComponent>
                  </div>
                  <div className="test-points">
                    <PontuationComponent
                      onlyActual={false}
                      actual={card.pontuation.test.inserted}
                      needed={card.pontuation.test.needed}
                      onChange={addTest}
                      actionType={ActionType.QUALITY_ASSURANCE}
                    ></PontuationComponent>
                  </div>
                </div>
                {card.price > 0 ? <div className="price">${card.price}</div> : ''}
              </div>
            </div>
          </Container>
        )}
      </Draggable>
      {stateError?.bool ? (
        <SnackBarAlert
          onClose={() => {
            setError({ bool: false });
          }}
          message={stateError.message}
        ></SnackBarAlert>
      ) : (
        <></>
      )}
    </>
  );
};

function colorCard(card: CardTaskClass): string {
  if (card.cardBug) return base.red
  if (card.powerUp != null ) return base.yellow
  return base.dark_purple
}