import React, { Component } from 'react'
import {Provider} from 'react-redux';
import FastClick from 'fastclick';

import DevTools from './components/common/DevTools'
import Play from './components/Play'

import route from './router';
import createStoreWithMiddleware from './store';

import './assets/stylus/index.styl'

FastClick.attach(document.body)

const store = createStoreWithMiddleware();

class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <div onTouchMove={this.preventDefault}>
                    {route}
                    {/*<DevTools />*/}
                    <Play></Play>
                </div>
            </Provider>
        )
    }

    preventDefault(e) {
        e.preventDefault()
    }
}

export default App