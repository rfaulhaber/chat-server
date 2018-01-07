import { NEW_CONNECTION } from './actions';

const inititalState = {
    connections: 0
};

export default function app(state = inititalState, action) {
    switch(action.type) {
        case NEW_CONNECTION:
            return Object.assign({}, state, {
                connections: state.connections + 1
            });
        default:
            break;
    };
}