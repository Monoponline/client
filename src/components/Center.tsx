import { FC, useContext } from 'react';
import { connect } from 'react-redux';
import SocketContext from '../contexts/SocketContext';
import { State } from '../reducers/rootReducer';
import chance from './../images/chance.png';
import communitychest from './../images/communitychest.png';
import { getAvatar } from './RenderPlayers';

const Center: FC<CenterProps> = (props) => {
  const socket = useContext(SocketContext);
  // const [view, setView] = useState(0);
  
  // useEffect(() => {
  //   switch (view) {
  //     case 1:
  //       document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(0deg)';
  //       break;
  //     case 2:
  //       document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(90deg)';
  //       break;
  //     case 3:
  //       document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(180deg)';
  //       break;
  //     case 4:
  //       document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(270deg)';
  //       break;
  //   }
  // }, [view]);

  // const handleSwitchView = () => {
  //   let views = [1, 2, 3, 4];
  //   setView(views[views.indexOf(view) + 1] ?? views[0]);
  // };

  return (
    <div className="center">
      {/* <div style={{ display: 'flex', position: 'fixed', marginBottom: '20rem', marginLeft: '15rem' }}>
        <button style={{ fontSize: '1rem' }} onClick={handleSwitchView}>Switch View</button>
      </div> */}
      {props.isPlayerTurn ? (        
        <>
          <div style={{ display: 'flex', position: 'fixed', marginBottom: '45rem', marginLeft: '27rem' }}>
            <h3 style={{ fontSize: '3rem' }}>C'est votre tour!</h3>
          </div>
          <div style={{ display: 'flex', position: 'fixed', marginBottom: '32rem', marginLeft: '27rem' }}>
            <button style={{ fontSize: '3rem' }} onClick={() => socket.emit('roll-dice')}>Lancer les dés</button>
          </div>
        </>
      ) : <></>}
      {props.isPlayer ? (
        <>
          <div style={{ display: 'flex', position: 'fixed', marginTop: '30rem', marginRight: '45rem' }}>
            <h3 style={{ fontSize: '3rem' }}>Compte:</h3>
          </div>
          <div style={{ display: 'flex', position: 'fixed', marginTop: '42rem', marginRight: '45rem' }}>
            <h2 style={{ fontSize: '4rem' }}>{props.account}€</h2>
          </div>
          <div style={{ display: 'flex', position: 'fixed', marginTop: '30rem', marginRight: '6rem' }}>
            <h2 style={{ fontSize: '3rem' }}>Pion:</h2>
          </div>
          <div style={{ display: 'flex', position: 'fixed', marginTop: '37rem', marginRight: '14rem' }}>
            <img style={{ position: 'fixed', width: '7rem' }} src={getAvatar(props.avatar as string)} alt={props.avatar} />
          </div>
        </>
      ) : <></>}
      <div className="community-chest-deck">
        <h2 className="label">Caisse de communauté</h2>
        <div className="deck">
          <img src={communitychest} className="deck-card" alt="Caisse de communauté" />
        </div>
      </div>
      <h1 className="title">MONOPONLINE</h1>
      <div className="chance-deck">
        <h2 className="label">Chance</h2>
        <div className="deck">
          <img src={chance} className="deck-card" alt="Chance" />
        </div>
      </div>
    </div>
  );
}

interface CenterProps {
  username: string;
  isPlayerTurn?: boolean;
  isPlayer?: boolean;
  avatar?: string;
  account?: number;
}

const mapStateToProps = (state: State, ownProps: CenterProps) => {
  return {
    isPlayerTurn: state.turn === ownProps.username,
    isPlayer: state.players.some((player) => player.name === ownProps.username),
    avatar: state.players.find((player) => player.name === ownProps.username)?.avatar,
    account: state.players.find((player) => player.name === ownProps.username)?.account
  }
}

export default connect(mapStateToProps)(Center);
