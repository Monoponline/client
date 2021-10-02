import Actions from "./Actions";

const initState: State = {
  houses: [],
  players: [],
  spectating: 0,
  turn: '',
  id: '',
  started: false
}

const rootReducer = (state = initState, action: any) => {
  if (action.type === Actions.UPDATE_STATE) {
    state = action.gameState;
  }
  return state;
}

export default rootReducer;

export interface State {
  houses: Houses[];
  players: Player[];
  spectating: number;
  turn: string;
  id: string;
  started: boolean;
}

export interface Player {
  name: string;
  avatar: string;
  position: number;
  properties: number[];
  account: number;
}

export interface Houses {
  cell: number;
  houses: number;
}
