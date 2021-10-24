import { DefaultEventsMap } from "@socket.io/component-emitter";
import { ChangeEvent, Component, MouseEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { io, Socket } from "socket.io-client";
import { connect } from 'react-redux';
import Game from "./components/Game";
import SocketContext from "./contexts/SocketContext";
import { resetState, updateState } from './reducers/Actions';
import { Player, State } from './reducers/rootReducer';
import { v4 as uuidv4 } from 'uuid';

class App extends Component<AppProps, { loggedIn: boolean, name: string, isInGame: boolean, gameId: string, socket?: Socket<DefaultEventsMap, DefaultEventsMap> }> {
  state = {
    loggedIn: false,
    name: '',
    isInGame: false,
    gameId: '',
    // @ts-ignore
    socket: null as Socket<DefaultEventMap, DefaultEventsMap>
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value
    });
  }

  handleLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.state.name === '') return toast.error(<h3 className="popup">Pseudo Invalide!</h3>);
    const isTaken = await this.usernameTaken();
    if (isTaken) return toast.error(<h3 className="popup">Pseudo déjà pris!</h3>);
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
      toast.success(<h3 className="popup">Vous avez gagné!</h3>);
      this.props.resetState();
    });
    this.state.socket.on('sold-house', (cell: string) => {
      toast.success(<h3 className="popup">Vous avez vendu une maison sur {cell}!</h3>);
    });
    this.state.socket.on('cant-sell', () => {
      toast.success(<h3 className="popup">Vous ne pouvez pas vendre de maisons!</h3>);
    });
    this.state.socket.on('joined-game', (id: string, spectator?: boolean) => {
      toast.success(<h3 className="popup">Vous avez rejoint la partie {id}{spectator ? ' (spectateur)' : ''}!</h3>);
    });
    this.state.socket.on('left-game', (player: string) => {
      toast.info(<h3 className="popup">{player} a quitté la partie</h3>);
    });
    this.state.socket.on('game-state', (json: string) => {
      const gameState: State = JSON.parse(json);
      this.props.updateState(gameState);
    });
    this.state.socket.on('dice-roll', (player: string, dices: number[]) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'Vous avez' : `${player} a`} fait {dices[0]} et {dices[1]}!</h3>);
    });
    this.state.socket.on('buy-house', (player: string, cell: string) => {
      toast.success(<h3 className="popup">{player === this.state.name ? 'Vous venez' : `${player} vient`} d'acheter {cell}!</h3>);
    });
    this.state.socket.on('cant-afford', (player: string, cell: string) => {
      toast.error(<h3 className="popup">{player === this.state.name ? 'Vous ne pouvez pas' : `${player} ne peut pas`} acheter {cell}</h3>);
    });
    this.state.socket.on('paid-rent', (player: string, renter: string, rent: number) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'Vous avez' : `${player} a`} payer {rent}€ à {renter === this.state.name ? 'vous' : renter}</h3>);
    });
    this.state.socket.on('cant-upgrade', () => {
      toast.error(<h3 className="popup">Vous ne pouvez pas acheter de maisons!</h3>);
    });
    this.state.socket.on('player-in-jail', (player: string) => {
      if (player === this.state.name) {
        confirmAlert({
          title: 'Vous avez été envoyer en prison!',
          message: 'Vous n\'en sortirez que dans 3 tours. A moins que vous ne payez 50€ ou que vous avez une carte Sortir de Prison',
          buttons: [
            {
              label: 'Ok',
              onClick: () => {}
            }
          ]
        })
      } else {
        toast.info(<h3 className="popup">{player} est en Prison!</h3>);
      }
    });
    this.state.socket.on('bought-house', (cell: string) => {
      toast.success(<h3 className="popup">Vous avez acheter une maison sur {cell}!</h3>);
    });
    this.state.socket.on('paid-luxury-taxe', (player: string) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'Vous avez' : `${player} a`} payer 100€ pour la taxe de luxe.</h3>);
    });
    this.state.socket.on('paid-taxes', (player: string) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'Vous avez' : `${player} a`} payer 200€ d'impôts.</h3>);
    });
    this.state.socket.on('chance-card', (card: string) => {
      confirmAlert({
        title: 'Vous avez une carte chance!',
        message: card,
        buttons: [
          {
            label: 'Ok',
            onClick: () => {}
          }
        ]
      });
    });
    this.state.socket.on('cc-card', (card: string) => {
      confirmAlert({
        title: 'Vous avez une carte caisse de communauté!',
        message: card,
        buttons: [
          {
            label: 'Ok',
            onClick: () => {}
          }
        ]
      });
    });
    this.state.socket.on('player-move', (player: string, cell: string) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'Vous devez vous' : `${player} dois se`} rendre à {cell}</h3>);
    });
    this.state.socket.on('fine', (player: string, price: number) => {
      toast.info(<h3 className="popup">{player === this.state.name ? 'Vous devez' : `${player} dois`} payer une amende de {price}€</h3>);
    });
    this.state.socket.on('earn', (player: string, price: string | number) => {
      toast.success(<h3 className="popup">{player === this.state.name ? 'Vous avez' : `${player} a`} gagner {typeof price === 'number' ? `${price}€` : price}!</h3>);
    });
    this.state.socket.on('player-broke', (player: string) => {
      toast.error(<h3 className="popup">{player === this.state.name ? 'Vous êtes' : `${player} est`} ruiné!</h3>);
    });
    this.state.socket.on('exit-jail', (player: string) => {
      toast.success(<h3 className="popup">{player === this.state.name ? 'Vous sortez' : `${player} sort`} de prison!</h3>);
    });
    this.state.socket.on('is-in-jail', (player: string) => {
      toast.error(<h3 className="popup">{player === this.state.name ? 'Vous êtes' : `${player} est`} en prison!</h3>);
    });
    this.state.socket.on('used-exit-jail-card', (player: string) => {
      toast.error(<h3 className="popup">{player === this.state.name ? 'Vous avez' : `${player} a`} utilisé une carte sortie de prison!</h3>);
    });
    this.state.socket.on('friend-gift', (player: string) => {
      toast.error(<h3 className="popup">{player === this.state.name ? 'Vous avez reçu 10€ de la part de chaque joueur!' : `Vous avez donné 10€ à ${player}`}</h3>);
    });
    this.state.socket.on('trade-req-sent', () => {
      toast.success(<h3 className="popup">Demande d'échange envoyé!</h3>);
    });
    this.state.socket.on('canceled-trade', () => {
      toast.error(<h3 className="popup">Echange refusé!</h3>);
    });
    this.state.socket.on('trade-req', (player: string, json: string) => {
      const trade = JSON.parse(json);
      confirmAlert({
        title: `${player} demande de faire un échange`,
        message: `${player} vous demande ${trade.cardToReceive.length ? trade.cardToReceive.map((card: any) => card.label).join(', ') : 'Aucune propriété'} et ${trade.moneyToReceive}€ contre ${trade.cardToGive.length ? trade.cardToGive.map((card: any) => card.label).join(', ') : 'Aucune propriété'} et ${trade.moneyToGive}€`,
        buttons: [
          {
            label: 'Accepter',
            onClick: () => this.state.socket.emit('response-trade', true)
          },
          {
            label: 'Refuser',
            onClick: () => this.state.socket.emit('response-trade', false)
          }
        ],
        closeOnEscape: false,
        closeOnClickOutside: false
      });
    });
    this.state.socket.on('info', (message: string) => {
      toast.info(<h3 className="popup">{message}</h3>);
    });
    this.state.socket.on('warn', (message: string) => {
      toast.warn(<h3 className="popup">{message}</h3>);
    });
    this.state.socket.on('success', (message: string) => {
      toast.success(<h3 className="popup">{message}</h3>);
    });
    this.state.socket.on('choice', (question: string, choices: string[]) => {
      confirmAlert({
        title: question,
        buttons: choices.map((choice, index) => {
          return {
            label: choice,
            onClick: () => this.state.socket.emit('response-choice', index)
          }
        }),
        closeOnEscape: false,
        closeOnClickOutside: false
      });
    });
  }

  componentWillUnmount() {
    this.state.socket?.disconnect();
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

  handleCreateGame = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const gameId = uuidv4().split('-')[0];
    this.state.socket.emit('request-join-game', gameId);
    this.setState({
      isInGame: true,
      gameId
    });
    const el = document.createElement('textarea');
    el.value = gameId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast.success(<h3 className="popup">Identifiant de la partie copié!</h3>);
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
          <h4 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', fontSize: '6rem' }}>Connecté en tant que: {this.state.name}</h4>
          <form style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center' }}>
            <input placeholder="ID de la partie" value={this.state.gameId} type="text" onChange={this.handleJoinGameChange} style={{ width: '25rem', height: '8rem', fontSize: '3rem' }} />
            <button onClick={this.handleJoinGameClick} style={{ width: '16rem', height: '8rem', fontSize: '3rem' }}>Rejoindre la partie</button>
          </form>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}><br />
            <button style={{ width: '32rem', height: '8rem', fontSize: '3rem' }} onClick={this.handleCreateGame}>Créer une partie</button>
          </div>
        </>
      ) : (
        <>
          <ToastContainer position="top-right" />
          <h1 style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center', marginTop: '22%', fontSize: '15rem' }}>Monoponline</h1>
          <form style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'center' }}>
            <input placeholder="Pseudo" value={this.state.name} type="text" onChange={this.handleNameChange} style={{ width: '25rem', height: '6rem', fontSize: '3rem' }} />
            <button onClick={this.handleLoginClick} style={{ width: '20rem', height: '6rem', fontSize: '3rem' }}>Se connecter</button>
          </form>
        </>
      )
    );
  }
}

interface AppProps {
  updateState: (gameState: State) => void;
  resetState: () => void;
  players: Player[];
}

const mapStateToProps = (state: State) => {
  return {
    players: state.players
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateState: (gameState: State) => {
      dispatch(updateState(gameState));
    },
    resetState: () => {
      dispatch(resetState());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
