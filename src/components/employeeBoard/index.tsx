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

type ColumnIndex = {
  column: EmployeeColumn;
  index: number;
};

export type Params = {
  roundInfo: RoundInfo,
  paramsColumns: EmployeeColumn[] | undefined,
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (columns == undefined) return;

    const start = getColumnById(columns, source.droppableId);
    const finish = getColumnById(columns, destination.droppableId);

    if (source.droppableId == destination.droppableId) {
      const card = start.column.employees[source.index]

      const newCards = start.column.employees.filter(
        (_, index) => index != source.index
      );
      newCards.splice(destination.index, 0, card);

      const newColumn = {
        ...start.column,
        employees: newCards,
      };

      columns[start.index] = newColumn;

      setColumns([...columns]);
      return;
    }

    const newStartColumn = {
      ...start.column,
      employees: start.column.employees.filter((_, index) => index != source.index),
    };

    const card = start.column.employees[source.index]

    const bool = card.canBeMoveTo(
      finish.column.type,
      start.column.type
    )

    if (!bool.bool) {
      setError({bool: true, message: bool.message})
      return;
    }

    const newFinishCardColumns = finish.column.employees;
    newFinishCardColumns.splice(destination.index, 0, card);

    const newFinishColumn = {
      ...finish.column,
      employees: newFinishCardColumns,
    };

    columns[start.index] = newStartColumn;
    columns[finish.index] = newFinishColumn;

    setColumns([...columns]);
    database.setEmployeeColumns(columns)
  };

  function getColumnById(columns: EmployeeColumn[], id: string): ColumnIndex {
    const column = columns.filter((x) => x.id == id)[0];
    return {
      column: column,
      index: columns.indexOf(column),
    };
  }


  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.map((item, index) => (
          <EmployeeList
            column={item}
            roundInfo={roundInfo}
          ></EmployeeList>
        ))}
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
