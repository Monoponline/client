import { FC, useContext } from 'react';
import Cell from './cells/Cell';
import { connect } from 'react-redux';
import { Houses, Player, State } from '../reducers/rootReducer';
import house from './../images/house.png';
import hotel from './../images/hotel.png';
import Board from '../Board';
import SocketContext from '../contexts/SocketContext';
import { getAvatar } from './RenderPlayers';

const RenderHouses: FC<RenderHousesCellProps> = (props) => {
  const ctx = useContext(SocketContext);
  const h = props.houses.find((house) => house.cell === props.cell);
  const houses = [];
  if (h?.houses) {
    for (let index = 0; index < h.houses; index++) {
      houses.push('house');
    }
  }

  let canUpgrade = false;
  const owner = props.players.find((p) => p.properties.includes(props.cell));

  if (
    Board.filter((c) => c.color === Board[props.cell].color)
      .length ===
    props.players.find((p) => p.name === ctx.io.opts.query!.username as string)!.properties
      .filter((p) => Board[props.cell].color === Board[p].color)
      .length
  ) canUpgrade = true;

  return (
    <div className="houses">
      {houses.length !== 0 ? (
        h?.houses === 5 ? (
          <img src={hotel} alt="Hotel" className="hotel" />
        ) : houses.map((_, index) => <img key={index} src={house} alt="House" className="house" />)
      ) : (<></>)}
      {canUpgrade && h?.houses !== 5 && props.turn === owner?.name ? (
        <div style={{ marginTop: '0rem' }}>
          <button style={{ marginLeft: '1.4rem', position: 'fixed', fontSize: '1.2rem' }} onClick={() => ctx.emit('buy-property', props.cell)}>-</button>
          <button style={{ marginLeft: '-4rem', position: 'fixed', fontSize: '1.2rem' }} onClick={() => ctx.emit('sell-property', props.cell)}>+</button>
        </div>
      ) : (<></>)}
      {owner ? (
        <div style={{ marginTop: '-4rem' }}>
          <img src={getAvatar(owner.avatar)} alt={owner.name} width="25rem" />
        </div>
      ) : (<></>)}
    </div>
  );
};

interface RenderHousesCellProps extends Cell {
  houses: Houses[];
  players: Player[];
  turn: string;
}

const mapStateToProps = (state: State) => {
  return {
    houses: state.houses,
    players: state.players,
    turn: state.turn
  }
}

export default connect(mapStateToProps)(RenderHouses);
