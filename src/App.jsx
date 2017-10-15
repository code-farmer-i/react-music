import React, { Component } from 'react'
import {Provider} from 'react-redux';

import route from './router';
import store from './store';

import './assets/stylus/index.styl'

class App extends Component{
    render() {
        return (
            <div className="App">
                {route}
            </div>
        )
    }
}

export default App