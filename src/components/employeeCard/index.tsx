import { Container } from "./styles";
import { ActionType } from "../../model/ActionType";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RoundInfo } from "../../App";
import React from "react";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Employee } from "../../model/Employee";

export interface Params {
  paramEmployee: Employee;
  index: number;
  actualColumnType: ActionType;
  roundInfo: RoundInfo;
}

export type ErrorState = {
  bool: Boolean;
  message?: string;
};

export const EmployeeComponent: React.FC<Params> = ({
  paramEmployee,
  index,
  actualColumnType,
  roundInfo,
}) => {
  const [employee, setEmployee] = useState<Employee>(paramEmployee);
  const [stateError, setError] = useState<ErrorState>();

  return (
    <>
      <Draggable key={employee.id} draggableId={employee.id} index={index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="info-content">
                  <div className="title">{employee.name}</div>
                  <div className="info-round">
                    {/* <p>{employee.roundStarted != null ? ("S:" + employee.roundStarted) : '' } {employee.roundEnded != null ? ("E:" + employee.roundEnded) : '' }</p> */}
                  </div>
                </div>
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
