import { Container } from "./styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CardTaskClass } from "../../model/CardTask";
import { useState } from "react";
import React from "react";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";
import { ErrorState } from "../cardTask";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Database } from "../../data/database";

export type Params = {
  roundInfo: RoundInfo,
};

export class ColumnEmployee {

}

export const CardBoard: React.FC<Params> = ({ roundInfo}) => {
  // const [columns, setColumns] = useState<Column[] | undefined>(paramsColumns);
  const [stateError, setError] = useState<ErrorState>();

  const onDragEnd = (result: DropResult) => {};

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* {columns?.map((item, index) => (
          <ListTask
            column={item}
            usePoint={usePoint}
            roundInfo={roundInfo}
          ></ListTask>
        ))} */}
      </DragDropContext>
      {stateError?.bool ? (
        <SnackBarAlert onClose={() => {
          setError({ bool: false });
        }} message={stateError.message} >
        </SnackBarAlert>
      ) : (
        <></> )}
    </Container>
  );
};
