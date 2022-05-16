import { ActionType } from "../../../model/ActionType";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RoundInfo } from "../../../App";
import React from "react";
import { SnackBarAlert } from "../../snackBarAlert/snackBarAlert";
import { Project } from "../../../model/Project";
import PersonIcon from "@mui/icons-material/Person";
import { base, ColorByActionType } from "../../../styles/colors";
import { Container } from "./styles";
import { ErrorState } from "../../cardBoard/cardTask";

export interface Params {
  paramProject: Project;
  index: number;
  roundInfo: RoundInfo;
}

export const ProjectComponent: React.FC<Params> = ({
  paramProject,
  index,
  roundInfo,
}) => {
  const [project, setProject] = useState<Project>(paramProject);
  const [stateError, setError] = useState<ErrorState>();

  return (
    <>
      <Draggable key={project.id} draggableId={project.id} index={index}>
        {(provided, snapshot) => (
          <Container color={getColorProjectCard(project, roundInfo)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="info-content">
                <div className="title">{project.name}</div>
                <div className="info-round">
                    <p>{project.roundStarted != null ? ("S:" + project.roundStarted) : '' } {project.roundEnded != null ? ("E:" + project.roundEnded) : '' }</p>
                </div>
                </div>
                <div className="second-info">
                  <div className="price">${project.price}</div>
                  <div className="dead-line">D: {project.deadLine}</div>
                </div>
              </div>
            </div>
          </Container>
        )}
      </Draggable>
      {stateError?.bool ? (
        <SnackBarAlert
          info={stateError.info}
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

function getColorProjectCard(project: Project, roundInfo: RoundInfo): string {
  if(project.deadLine < roundInfo.number && project.roundEnded == null) {
    return base.red
  }
  if(project.roundEnded != null) return base.green
  return base.dark_purple
}