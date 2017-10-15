import React, { Component } from 'react'
import { createHashHistory } from 'history'

import './style.styl'

class NavBar extends Component {
    render() {
        return (
            <div className="nav-bar">
                <div className={`tab-item ${this.isActive('/Recommend')}`}>
                    <span className="tab-link" onClick={this.LinkTo.bind(this, '/Home/Recommend')}>推荐</span>
                </div>
                <div className={`tab-item ${this.isActive('/SingerList')}`}>
                    <span className="tab-link" onClick={this.LinkTo.bind(this, '/Home/SingerList')}>歌手</span>
                </div>
                <div className={`tab-item ${this.isActive('/RankList')}`}>
                    <span className="tab-link" onClick={this.LinkTo.bind(this, '/Home/RankList')}>排行</span>
                </div>
                <div className={`tab-item ${this.isActive('/Search')}`}>
                    <span className="tab-link" onClick={this.LinkTo.bind(this, '/Home/Search')}>搜索</span>
                </div>
            </div>
        )
    }

    LinkTo(path) {
        const history = createHashHistory();

        history.replace(path)
    }

    isActive (path){
        const currentPath = createHashHistory().location.pathname;

        return currentPath.indexOf(path) != -1 ? 'router-link-active' : ''
    }

}

export default NavBar