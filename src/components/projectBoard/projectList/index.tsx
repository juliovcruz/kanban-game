import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../../styles/colors";
import { CardTaskComponent } from "../../cardBoard/cardTask";
import { Container } from "./styles";
import { CardColumn } from "../../cardBoard";
import { CardTaskClass } from "../../../model/CardTask";
import { ActionType } from "../../../model/ActionType";
import { RoundInfo } from "../../../App";
import { ProjectColumn } from "..";
import { Project } from "../../../model/Project";
import { ProjectComponent } from "../projectCard";

export interface Params {
  column: ProjectColumn;
  roundInfo: RoundInfo;
}

export const ProjectList: React.FC<Params> = ({ column, roundInfo }) => {
  const [projects, setProjects] = useState<Project[]>();

  if (projects == undefined) {
    setProjects(column.projects);
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
              {column.projects?.map((item, index) => (
                <li key={item.id}>
                  <ProjectComponent
                    paramProject={item}
                    index={index}
                    roundInfo={roundInfo}
                  ></ProjectComponent>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Droppable>
    </Container>
  );
};
