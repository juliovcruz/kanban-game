
import { Container} from "./styles";
import { ModalPowerUpProps } from "..";
import Button, { ButtonProps } from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { base } from "../../../styles/colors";

export type Params = {
    props: ModalPowerUpProps,
    onClick: () => void
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: base.dark_purple_3,
    "&:hover": {
      backgroundColor: base.dark_purple_2,
    },
  }));

export const DescriptionModal: React.FC<Params> = ({ props, onClick }) => {
  return (
    <Container>
        <div className="content">

        </div>
        <div className="title">
            <h2>{props.name}</h2>
        </div>
        {props.salary != null ? <div className="salary">Salary: <p className="price">${props.salary}</p></div>: ""}
        {props.increase != null ? <div className="salary">Increase: <p className="price">${props.increase}</p></div>: ""}

        <br></br>
        <div className="description">{props.description}</div>
        
        <div className="button">
        <ColorButton
            variant="contained"
            endIcon={<SendIcon />}
            onClick={onClick}
        >
        </ColorButton>
        </div>
    </Container>
  );
};
