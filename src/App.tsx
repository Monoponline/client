import { ChangeEvent, Component, MouseEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import Game from "./components/Game";
import SocketContext from "./contexts/SocketContext";

class App extends Component {
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
    if (this.state.name === '') return toast.error(<h3 style={{ fontSize: '0.9rem' }}>Invalid username!</h3>);
    const isTaken = await this.usernameTaken();
    if (isTaken) {
      toast.error(<h3 style={{ fontSize: '0.9rem' }}>Username already taken!</h3>);
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
  }

  componentWillUnmount() {
    this.state.socket.close();
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
          <h1 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', marginTop: '20%', fontSize: '5rem' }}>Monoponline</h1>
          <h4 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', fontSize: '2rem' }}>Logged in as {this.state.name}</h4>
          <form style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center' }}>
            <input placeholder="Game ID" value={this.state.gameId} type="text" onChange={this.handleJoinGameChange} style={{ width: '10rem', height: '2rem', fontSize: '1rem' }} />
            <button onClick={this.handleJoinGameClick} style={{ width: '6rem', height: '2rem', fontSize: '1rem' }}>Join game</button>
          </form>
        </>
      ) : (
        <>
          <ToastContainer position="top-right" />
          <h1 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', marginTop: '22%', fontSize: '5rem' }}>Monoponline</h1>
          <form style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center' }}>
            <input placeholder="Username" value={this.state.name} type="text" onChange={this.handleNameChange} style={{ width: '10rem', height: '2rem', fontSize: '1rem' }} />
            <button onClick={this.handleLoginClick} style={{ width: '5rem', height: '2rem', fontSize: '1rem' }}>Login</button>
          </form>
        </>
      )
    );
  }
}

export default App;
