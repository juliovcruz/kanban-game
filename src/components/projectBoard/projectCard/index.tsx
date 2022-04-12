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

export interface Params {
  paramProject: Project;
  index: number;
  roundInfo: RoundInfo;
}

export type ErrorState = {
  bool: Boolean;
  message?: string;
};

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
          <Container color={base.dark_purple}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="title">{project.name}</div>
                <div className="price">${project.price}</div>
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
