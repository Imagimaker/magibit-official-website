import * as React from 'react';
import * as ReactDom from 'react-dom';

import {createHashHistory as createHistory} from 'history';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import {bindActionCreators} from 'redux';

import TodoApp from '@src/demo-todo-app/components/TodoApp';
import {updateCurrent} from '@src/demo-todo-app/reducers/todo';
import store from '@src/store';

import mainStyle from '@src/resource/css/main.css';
import normalizeStyle from '@src/resource/css/normalize.css';
import {cssRaw} from 'typestyle';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// import global css style: normalize & main style sheet.
cssRaw(`
${normalizeStyle}
${mainStyle}
`);

const actions = bindActionCreators({
    updateCurrent,
}, store.dispatch);

const render = () => {
    const state = store.getState();
    ReactDom.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route path={'/'}>
                    <TodoApp
                        todos={state.todos}
                        currentTodo={state.currentTodo}
                        changeCurrent={actions.updateCurrent}
                    />
                </Route>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root') as HTMLElement
    );
};

render();

store.subscribe(render);
