'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = app;

var _actions = require('./actions');

const inititalState = {
    connections: 0
};

function app(state = inititalState, action) {
    switch (action.type) {
        case _actions.NEW_CONNECTION:
            return Object.assign({}, state, {
                connections: state.connections + 1
            });
        default:
            break;
    };
}
//# sourceMappingURL=reducer.js.map