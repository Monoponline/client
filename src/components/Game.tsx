import { FC, useContext } from "react";
import { connect } from "react-redux";
import SocketContext from "../contexts/SocketContext";
import { Player, State } from "../reducers/rootReducer";
import Board from "./Board";

const Game: FC<GameProps> = (props) => {
  const socket = useContext(SocketContext);

  return (
    <div className="Game">
      {props.started ? (
        <>
          <Board username={props.username} />
        </>
      ) : (
        <>
          <h1 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', marginTop: '20%', fontSize: '5rem' }}>Monoponline</h1>
          <h4 style={{
            display: "flex",
            alignItems: 'flex-end',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>Waiting for players... ({props.players.length}/4)</h4>
          <ul style={{ display: "flex", justifyContent: 'center', fontSize: '2rem', flexDirection: 'column', alignItems: 'center' }}>
            {props.players.map((player) => <li key={player.name}>{player.name}</li>)}
          </ul>
          {props.players.length >= 2 ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button style={{ fontSize: '2rem' }} onClick={() => socket.emit('player-start')}>Commencer la partie</button>
            </div>
          ) : <></>}
        </>
      )}
    </div>
  );
}

interface GameProps {
  username: string;
  started: boolean;
  players: Player[];
}

const mapStateToProps = (state: State) => {
  return {
    started: state.started,
    players: state.players
  }
}

export default connect(mapStateToProps)(Game);
