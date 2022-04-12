import { Container, IconEmployee } from "./styles";
import { ActionType } from "../../model/ActionType";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RoundInfo } from "../../App";
import React from "react";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Employee } from "../../model/Employee";
import PersonIcon from "@mui/icons-material/Person";
import { ColorByActionType } from "../../styles/colors";

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
                <div className="title">{employee.name}</div>
                <div className="actions">
                  {employee.actions?.sort().map((item, index) => (
                    <IconEmployee
                      color={ColorByActionType(item)}
                      visible={true}
                    >
                      <PersonIcon fontSize="small"></PersonIcon>
                    </IconEmployee>
                  ))}
                </div>
                <div className="price">${employee.price}</div>
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
