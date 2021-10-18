import { State } from './rootReducer';

export default class Actions {
    public static readonly UPDATE_STATE = 'UPDATE_STATE';
    public static readonly RESET_STATE = 'RESET_STATE';
}

export function updateState(gameState: State) {
    return {
        type: Actions.UPDATE_STATE,
        gameState
    }
}

export function resetState() {
    return {
        type: Actions.RESET_STATE
    }
}
