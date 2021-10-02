import { FC } from 'react';
import Cell from './cells/Cell';
import { Player, State } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import battleship from './../images/battleship.png';
import car from './../images/car.png';
import dog from './../images/dog.png';
import hat from './../images/hat.png';
import iron from './../images/iron.png';
import shoe from './../images/shoe.png';
import thimble from './../images/thimble.png';
import wheelbarrow from './../images/wheelbarrow.png';

const RenderPlayers: FC<RenderPlayersCellProps> = (props) => {
  const players = props.players.filter(player => player.position === props.cell);

  return (
    <div className="players">
      {players.map((player, index) => <img key={index} src={getAvatar(player.avatar)} alt={player.name} />)}
    </div>
  );
};

interface RenderPlayersCellProps extends Cell {
  players: Player[];
}

const getAvatar = (avatar: string) => {
  switch (avatar) {
    case 'battleship':
      return battleship;
    case 'car':
      return car;
    case 'dog':
      return dog;
    case 'hat':
      return hat;
    case 'iron':
      return iron;
    case 'shoe':
      return shoe;
    case 'thimble':
      return thimble;
    case 'wheelbarrow':
      return wheelbarrow;
  }
}

const mapStateToProps = (state: State) => {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(RenderPlayers);
