import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../../styles/colors";
import { CardTaskComponent } from "../../cardBoard/cardTask";
import { Container } from "./styles";
import { CardColumn } from "../../cardBoard";
import { CardTaskClass } from "../../../model/CardTask";
import { ActionType } from "../../../model/ActionType";
import { PlayerInfo, PlayerPowerUps, RoundInfo } from "../../../App";
import { EmployeeColumn } from "..";
import { Employee } from "../../../model/Employee";
import { EmployeeComponent } from "../employeeCard";

export interface Params {
  column: EmployeeColumn;
  roundInfo: RoundInfo;
  playerInfo: PlayerInfo
}

export const EmployeeList: React.FC<Params> = ({ column, roundInfo, playerInfo }) => {
  const [employees, setEmployees] = useState<Employee[]>();

  if (employees == undefined) {
    setEmployees(column.employees);
  }

  return (
    <Container lined={playerHaveAutomation(playerInfo, column.type)}>
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

function playerHaveAutomation(playerInfo: PlayerInfo, columnType: ActionType): boolean {
  return playerInfo.powerUps.some(e => e === PlayerPowerUps.AUTOMATION && columnType == ActionType.DEPLOY)
}