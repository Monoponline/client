import Actions from "./Actions";

const initState: State = {
  houses: [],
  players: [],
  spectating: 0,
  turn: '',
  id: '',
  started: false
}

const rootReducer = (state = initState, action: { type: Actions, gameState?: State }) => {
  switch (action.type) {
    case Actions.UPDATE_STATE:
      state = action.gameState!;      
      break;
    case Actions.RESET_STATE:
      state = initState;
      break;
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
