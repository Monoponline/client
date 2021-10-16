import { FC, useContext, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Select from 'react-dropdown-select';
import { connect } from 'react-redux';
import Board from '../Board';
import SocketContext from '../contexts/SocketContext';
import { Player, State } from '../reducers/rootReducer';
import chance from './../images/chance.png';
import communitychest from './../images/communitychest.png';
import { getAvatar } from './RenderPlayers';

const Center: FC<CenterProps> = (props) => {
  const socket = useContext(SocketContext);
  const values1 = useRef([] as { label: string; value: any }[]);
  const values2 = useRef([] as { label: string; value: any }[]);
  
  const moneyToGive = useRef(0);
  const moneyToReceive = useRef(0);

  return (
    <div className="center">
      {props.isPlayerTurn ? (        
        <>
          <div style={{ display: 'flex', position: 'fixed', marginBottom: '55rem', marginLeft: '27rem' }}>
            <h3 style={{ fontSize: '3rem' }}>C'est votre tour!</h3>
          </div>
          <div style={{ display: 'flex', position: 'fixed', marginBottom: '37rem', marginLeft: '27rem' }}>
            <button style={{ fontSize: '3rem' }} onClick={() => socket.emit('roll-dice')}>Lancer les dés</button>
          </div>
          <div style={{ display: 'flex', position: 'fixed', marginBottom: '20rem', marginLeft: '27rem' }}>
            <button style={{ fontSize: '3rem' }} onClick={() => {
              confirmAlert({
                title: 'Faire un échange avec:',
                buttons: props.players!.filter((player) => player.name !== props.username).map((player) => {
                  return {
                    label: player.name,
                    onClick: () => {
                      setTimeout(() => {
                        confirmAlert({
                          title: `Echange avec ${player.name}`,
                          message: 'Donner',
                          childrenElement: () => {
                            values1.current = [];
                            values2.current = [];

                            let options1 = [] as { label: string, value: any }[];
                            let temp = props.players!.find((player) => player.name === props.username)!;
                            temp.properties.forEach((j) => {
                              options1.push({
                                label: Board.find((cell) => cell.position === j)?.name ?? '',
                                value: j
                              });
                            });
                            let options2 = [] as { label: string, value: any }[];
                            player.properties.forEach((j) => {
                              options2.push({
                                label: Board.find((cell) => cell.position === j)?.name ?? '',
                                value: j
                              });
                            });
          
                            return (
                              <>{' '}
                                <input
                                  type="number"
                                  placeholder="Argent supplémentaire"
                                  defaultValue={0}
                                  onChange={(e) => (moneyToGive.current = parseInt(e.target.value))} />€ et
                                <Select
                                  multi={true}
                                  searchable={true}
                                  values={values1.current}
                                  onChange={(v) => (values1.current = v)}
                                  options={options1} />
                                contre <input
                                        type="number"
                                        placeholder="Argent supplémentaire"
                                        defaultValue={0}
                                        onChange={(e) => (moneyToReceive.current = parseInt(e.target.value))} />€ et
                                <Select
                                  multi={true}
                                  searchable={true}
                                  values={values2.current}
                                  onChange={(v) => (values2.current = v)}
                                  options={options2} />
                              </>
                            );
                          },
                          buttons: [
                            {
                              label: 'Echanger',
                              onClick: () => {
                                socket.emit('trade-request', JSON.stringify({
                                  player: player.name,
                                  moneyToReceive: moneyToReceive?.current ?? 0,
                                  moneyToGive: moneyToGive?.current ?? 0,
                                  cardToGive: values1.current,
                                  cardToReceive: values2.current
                                }));
                              }
                            }
                          ]
                        });
                      }, 250);
                    }
                  }
                })
              });
            }}>Faire un échange</button>
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
  players?: Player[];
}

const mapStateToProps = (state: State, ownProps: CenterProps) => {
  return {
    isPlayerTurn: state.turn === ownProps.username,
    isPlayer: state.players.some((player) => player.name === ownProps.username),
    avatar: state.players.find((player) => player.name === ownProps.username)?.avatar,
    account: state.players.find((player) => player.name === ownProps.username)?.account,
    players: state.players
  }
}

export default connect(mapStateToProps)(Center);
