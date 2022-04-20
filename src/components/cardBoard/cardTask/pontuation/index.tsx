
import PersonIcon from '@mui/icons-material/Person';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { ActionType } from '../../../../model/ActionType';
import { ColorByActionType } from '../../../../styles/colors';
import { IconPontuation, Container } from './styles';

export interface Params {
    needed: number,
    actual: number,
    onlyActual: boolean,
    actionType: ActionType,
    onChange: () => void
}

export const PontuationComponent: React.FC<Params> = ({
  needed,
  actual,
  onChange,
  actionType,
  onlyActual
}) => {
    return (
      <Container onClick={onChange} color={ColorByActionType(actionType)}>
      <div className='pontuation'>
        {onlyActual? <p>{actual}</p>: <p>{actual}/{needed}</p>}
        <div className='icon'>
        <IconPontuation color={ColorByActionType(actionType)} visible={actual==needed}>
          <FavoriteIcon></FavoriteIcon>
        </IconPontuation>
        <IconPontuation color={ColorByActionType(actionType)} visible={actual!=needed}>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </IconPontuation>
        </div>
      </div>
      </Container>
      );
    }