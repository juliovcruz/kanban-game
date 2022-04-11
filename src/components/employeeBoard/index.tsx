import { Container } from "./styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CardTaskClass } from "../../model/CardTask";
import { useState } from "react";
import React from "react";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";
import { ErrorState } from "../cardTask";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Employee } from "../../model/Employee";
import { EmployeeList } from "../employeeList";
import { Database } from "../../data/database";

export type Params = {
  roundInfo: RoundInfo,
  paramsColumns: EmployeeColumn[],
  database: Database,
};

export type EmployeeColumn = {
  id: string;
  name: string;
  employees: Employee[];
  type: ActionType;
}

export const EmployeeBoard: React.FC<Params> = ({ roundInfo, paramsColumns, database}) => {
  const [columns, setColumns] = useState<EmployeeColumn[] | undefined>(paramsColumns);
  const [stateError, setError] = useState<ErrorState>();

  const onDragEnd = (result: DropResult) => {};

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <div></div>
        {columns?.map((item, index) => (
          <EmployeeList
            column={item}
            roundInfo={roundInfo}
          ></EmployeeList>
        ))}
        <div></div>
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
