import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../styles/colors";
import { CardTaskComponent } from "../cardTask";
import { Container } from "./styles";
import { CardColumn } from "../cardBoard";
import { CardTaskClass } from "../../model/CardTask";
import { ActionType } from "../../model/ActionType";
import { RoundInfo } from "../../App";
import { EmployeeColumn } from "../employeeBoard";
import { Employee } from "../../model/Employee";
import { EmployeeComponent } from "../employeeCard";

export interface Params {
  column: EmployeeColumn;
  roundInfo: RoundInfo;
}

export const EmployeeList: React.FC<Params> = ({ column, roundInfo }) => {
  const [employees, setEmployees] = useState<Employee[]>();

  if (employees == undefined) {
    setEmployees(column.employees);
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
              {column.employees?.map((item, index) => (
                <li key={item.id}>
                  <EmployeeComponent
                    paramEmployee={item}
                    index={index}
                    actualColumnType={column.type}
                    roundInfo={roundInfo}
                  ></EmployeeComponent>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Droppable>
    </Container>
  );
};