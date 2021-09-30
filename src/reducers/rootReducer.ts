import { ReducerAction } from "react";

const initState: State = {
  houses: [
    {
      cell: 18,
      houses: 3
    },
    {
      cell: 1,
      houses: 5
    }
  ],
  players: [
    {
      name: 'Hugo',
      avatar: 'battleship',
      cell: 19,
      properties: [16, 37]
    },
    {
      name: 'Emma',
      avatar: 'dog',
      cell: 27,
      properties: [9, 8, 6]
    }
  ]
}

const rootReducer = (state = initState, action: ReducerAction<any>) => {
  return state;
}

export default rootReducer;

export interface State {
  houses: Houses[];
  players: Player[];
}

export interface Player {
  name: string;
  avatar: string;
  cell: number;
  properties: number[];
}

export interface Houses {
  cell: number;
  houses: number;
}
