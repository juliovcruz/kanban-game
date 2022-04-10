import { Container } from "./styles";
import { ListTask } from "../listTask";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

export function CardBoard() {
  return (
    <Container>
      <ListTask header={'Backlog'}></ListTask>
      <ListTask header={'Em análise'}></ListTask>
      <ListTask header={'Em desenvolvimento'}></ListTask>
      <ListTask header={'Em testes'}></ListTask>
      <ListTask header={'Aguardando deploy'}></ListTask>
      <ListTask header={'Em produção'}></ListTask>
    </Container>
  );
}
