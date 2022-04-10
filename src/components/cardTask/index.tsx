import { Container } from "./styles";
import { CardTaskClass } from "../../model/CardTask";
import { PontuationComponent } from "./pontuation/pontuation";
import { ActionType } from "../../model/ActionType";
import { useEffect, useState, useRef, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RoundInfo } from "../../App";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

    const response = novoCard.addPointAnalysis(actualColumnType);

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

    const response = novoCard.addPointDevelop(actualColumnType);

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

    const response = novoCard.addPointTest(actualColumnType);

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
      {stateError?.bool ? (
        <Snackbar
          open={true}
          autoHideDuration={15000}
          onClose={() => {
            setError({ bool: false });
          }}
          message={stateError.message}
        >
          <Alert
            onClose={() => {
              setError({ bool: false });
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            {stateError.message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
};
