
import { Container} from "./styles";
import { CardTaskClass } from "../../../model/CardTask";
import { PlayerInfo } from "../../../App";
import { getText, LanguageText } from "../../../model/Language";

export type Params = {
    card: CardTaskClass;
};

export const ArchiveModal: React.FC<Params> = ({ card }) => {
  return (
    <Container>
        <div className="project">[{card.projectName}]</div>
        <div className="name">{card.name}</div>
        <div className="description">S: {card.roundStarted} E: {card.roundEnded}</div>
    </Container>
  );
};
