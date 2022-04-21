import { useState } from "react";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { base } from "../../../styles/colors";
import { CardTaskComponent } from "../../cardBoard/cardTask";
import { Container } from "./styles";
import { CardColumn } from "../../cardBoard";
import { CardTaskClass } from "../../../model/CardTask";
import { ActionType } from "../../../model/ActionType";
import { PlayerInfo, RoundInfo } from "../../../App";
import { ProjectColumn } from "..";
import { Project, ProjectStatus } from "../../../model/Project";
import { ProjectComponent } from "../projectCard";
import { getText, Language, LanguageText } from "../../../model/Language";

export interface Params {
  column: ProjectColumn;
  playerInfo: PlayerInfo;
  roundInfo: RoundInfo;
}

export const ProjectList: React.FC<Params> = ({ column, roundInfo, playerInfo }) => {
  const [projects, setProjects] = useState<Project[]>();

  if (projects == undefined) {
    setProjects(column.projects);
  }

  return (
    <Container>
      <header>
        <h2>{getTextByProjectStatus(column.status, playerInfo.language)}</h2>
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

function getTextByProjectStatus(status: ProjectStatus, language: Language): string {
  const map = new Map<ProjectStatus, LanguageText>([
    [ProjectStatus.TO_DO ,LanguageText.BACKLOG],
    [ProjectStatus.IN_PROGRESS ,LanguageText.IN_DEVELOPMENT],
    [ProjectStatus.DONE ,LanguageText.DONE],
]);

  return getText(map.get(status)!, language)
}