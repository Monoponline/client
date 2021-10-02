import { FC, useContext } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import SocketContext from "../contexts/SocketContext";
import Actions from "../reducers/Actions";
import { Player, State } from "../reducers/rootReducer";
import Board from "./Board";

const Game: FC<GameProps> = (props) => {
  const socket = useContext(SocketContext);
  socket.once('joined-game', (id: string, spectator?: boolean) => {
    toast.success(<h3 style={{ fontSize: '0.9rem' }}>Joined game {id}{spectator ? ' as a spectator' : ''}!</h3>);
  });
  socket.on('game-state', (json: string) => {
    const gameState: State = JSON.parse(json);
    console.log(gameState);
    props.updateState(gameState);
  });

  return (
    <div className="Game">
      {props.started ? (
        <>
          <Board />
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
  updateState: (gameState: State) => void;
}

const mapStateToProps = (state: State) => {
  return {
    started: state.started,
    players: state.players
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateState: (gameState: State) => {
      dispatch({ type: Actions.UPDATE_STATE, gameState });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
