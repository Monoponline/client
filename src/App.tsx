import { ChangeEvent, Component, MouseEvent } from "react";
import { connect } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import Game from "./components/Game";
import SocketContext from "./contexts/SocketContext";
import Actions from './reducers/Actions';
import { State } from './reducers/rootReducer';

class App extends Component<AppProps> {
  state = {
    loggedIn: false,
    name: '',
    isInGame: false,
    gameId: '',
    // @ts-ignore
    socket: null as Socket<DefaultEventsMap, DefaultEventsMap>
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value
    });
  }

  handleLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.state.name === '') return toast.error(<h3 className="popup">Invalid username!</h3>);
    const isTaken = await this.usernameTaken();
    if (isTaken) {
      toast.error(<h3 className="popup">Username already taken!</h3>);
      return;
    }
    this.state.socket = io('ws://localhost:8080', {
      query: {
        username: this.state.name
      },
      transports: ['websocket']
    });
    this.setState({
      loggedIn: true
    });
    this.state.socket.on('win', () => {
      this.setState({
        gameId: '',
        isInGame: false
      });
      toast.success(<h3 className="popup">You win!</h3>);
      this.props.resetState();
    });
    this.state.socket.on('joined-game', (id: string, spectator?: boolean) => {
      toast.success(<h3 className="popup">Joined game {id}{spectator ? ' as a spectator' : ''}!</h3>);
    });
    this.state.socket.on('left-game', (player) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'You' : player} left the game</h3>);
    });
    this.state.socket.on('game-state', (json: string) => {
      const gameState: State = JSON.parse(json);
      this.props.updateState(gameState);
    });
    this.state.socket.on('dice-roll', (player, dices) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'You' : player} rolled {dices[0]} and {dices[1]}!</h3>);
    });
  }

  componentWillUnmount() {
    this.state.socket?.close();
  }

  usernameTaken = async () => {
    const res = await fetch(`http://localhost:8080/is-username-taken?username=${this.state.name}`);
    const isTaken = await res.json() as boolean;
    return isTaken;
  }

  handleJoinGameClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.state.gameId !== '') {
      this.state.socket.emit('request-join-game', this.state.gameId);
      this.setState({
        isInGame: true
      });
    }
  }

  handleJoinGameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      gameId: e.target.value
    });
  }

  render() {
    return this.state.isInGame ? (
      <>
        <ToastContainer position="top-right" />
        <SocketContext.Provider value={this.state.socket}>
          <Game username={this.state.name} />
        </SocketContext.Provider>
      </>
    ) : (
      this.state.loggedIn ? (
        <>
          <ToastContainer position="top-right" />
          <h1 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', marginTop: '20%', fontSize: '15rem' }}>Monoponline</h1>
          <h4 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', fontSize: '6rem' }}>Logged in as {this.state.name}</h4>
          <form style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center' }}>
            <input placeholder="Game ID" value={this.state.gameId} type="text" onChange={this.handleJoinGameChange} style={{ width: '25rem', height: '6rem', fontSize: '3rem' }} />
            <button onClick={this.handleJoinGameClick} style={{ width: '16rem', height: '6rem', fontSize: '3rem' }}>Join game</button>
          </form>
        </>
      ) : (
        <>
          <ToastContainer position="top-right" />
          <h1 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', marginTop: '22%', fontSize: '15rem' }}>Monoponline</h1>
          <form style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center' }}>
            <input placeholder="Username" value={this.state.name} type="text" onChange={this.handleNameChange} style={{ width: '25rem', height: '6rem', fontSize: '3rem' }} />
            <button onClick={this.handleLoginClick} style={{ width: '10rem', height: '6rem', fontSize: '3rem' }}>Login</button>
          </form>
        </>
      )
    );
  }
}

interface AppProps {
  updateState: (gameState: State) => void;
  resetState: () => void;
}

const mapStateToProps = (state: State) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateState: (gameState: State) => {
      dispatch({ type: Actions.UPDATE_STATE, gameState });
    },
    resetState: () => {
      dispatch({ type: Actions.RESET_STATE });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
