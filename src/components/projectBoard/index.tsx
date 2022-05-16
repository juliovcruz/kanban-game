import { Container } from "./styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import React from "react";
import { PlayerInfo, RoundInfo } from "../../App";
import { ErrorState } from "../cardBoard/cardTask";
import { SnackBarAlert } from "../snackBarAlert/snackBarAlert";
import { Database } from "../../data/database";
import { Project, ProjectStatus } from "../../model/Project";
import { ProjectList } from "./projectList";
import { CardTaskClass } from "../../model/CardTask";
import { CardColumn } from "../cardBoard";
import { getText, LanguageText } from "../../model/Language";

type ColumnIndex = {
  column: ProjectColumn;
  index: number;
};

export type Params = {
  roundInfo: RoundInfo,
  paramsColumns: ProjectColumn[] | undefined,
  playerInfo: PlayerInfo,
  database: Database,
  updateProjectColumns: (projectColumns: ProjectColumn[]) => void
  addNewCards: (cards: CardTaskClass[]) => void
};

export type ProjectColumn = {
  id: string;
  name: string;
  projects: Project[];
  status: ProjectStatus
}

export const ProjectBoard: React.FC<Params> = ({ roundInfo, paramsColumns, database, updateProjectColumns, addNewCards, playerInfo}) => {
  const [columns, setColumns] = useState<ProjectColumn[] | undefined>(paramsColumns);
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
      const card = start.column.projects[source.index]

      const newCards = start.column.projects.filter(
        (_, index) => index != source.index
      );
      newCards.splice(destination.index, 0, card);

      const newColumn = {
        ...start.column,
        projects: newCards,
      };

      columns[start.index] = newColumn;

      setColumns([...columns]);
      return;
    }

    const newStartColumn = {
      ...start.column,
      projects: start.column.projects.filter((_, index) => index != source.index),
    };

    const project = start.column.projects[source.index]

    if(start.index > finish.index) {
      setError({bool: true, message: getText(LanguageText.ERROR_PROJECT_CANNOT_MOVE_TO_BACK, playerInfo.language)})
      return
    }

    switch (finish.column.status) {
      case ProjectStatus.IN_PROGRESS: {
        project.start(roundInfo, addNewCards)
        break;
      }
      case ProjectStatus.DONE: {
        const cards = database.getCardColumns()!

        if(!project.canBeDone(cards)) {
          setError({bool: true, message: getText(LanguageText.ERROR_PROJECT_NOT_DONE, playerInfo.language)})
          return
        }

        project.end(roundInfo, () => console.log('test') )
        break;
      }
    }

    const newFinishCardColumns = finish.column.projects;
    newFinishCardColumns.splice(destination.index, 0, project);

    const newFinishColumn = {
      ...finish.column,
      projects: newFinishCardColumns,
    };

    columns[start.index] = newStartColumn;
    columns[finish.index] = newFinishColumn;

    setColumns([...columns]);
    updateProjectColumns(columns)
    database.setProjectColumns(columns)
  };

  function getColumnById(columns: ProjectColumn[], id: string): ColumnIndex {
    const column = columns.filter((x) => x.id == id)[0];
    return {
      column: column,
      index: columns.indexOf(column),
    };
  }


  return (
    <Container>
      <h2>{getText(LanguageText.PROJECTS, playerInfo.language)}</h2>
      <div className="list">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.map((item, index) => (
          <ProjectList
            playerInfo={playerInfo}
            column={item}
            roundInfo={roundInfo}
          ></ProjectList>
        ))}
      </DragDropContext>
      </div>
      {stateError?.bool ? (
        <SnackBarAlert onClose={() => {
          setError({ bool: false });
        }} message={stateError.message}
        info={stateError.info} >
        </SnackBarAlert>
      ) : (
        <></> )}
    </Container>
  );
};
 