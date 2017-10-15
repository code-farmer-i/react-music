import React, { Component } from 'react'
import { createHashHistory } from 'history'

import './style.styl'

class MainHead extends Component {
    render() {
        return (
            <div className="m-header">
                <img src="./logo.png" className="logo"/>
                <h1 className="text">React Music</h1>
                <div className="mine" onClick={this.linkToUser.bind(this)}>
                    <i className="icon-mine"></i>
                </div>
            </div>
        )
    }

    linkToUser() {
        const history = createHashHistory();

        history.push('/User/Favorite')
    }
}

export default MainHead