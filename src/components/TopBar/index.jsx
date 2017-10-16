import React, {Component} from 'react'
import {createHashHistory } from 'history'

import './style.styl'

class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                <i className="icon-back" onClick={this.goBack}></i>
                <div className="top-title">{this.props.title}</div>
            </div>
        )
    }

    goBack() {
        createHashHistory().go(-1)
    }
}

export default TopBar