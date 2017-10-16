import React, { Component } from 'react'
import { createHashHistory } from 'history'

import './style.styl'

class NavBar extends Component {
    state = {
        activePath: createHashHistory().location.pathname
    }

    render() {
        const { activePath } = this.state;

        return (
            <div className="nav-bar">
                <div
                    className={`tab-item ${activePath.indexOf('/Recommend') != -1 && 'router-link-active'}`}
                     onClick={this.LinkTo.bind(this, '/Home/Recommend')}
                >
                    <span className="tab-link">推荐</span>
                </div>
                <div
                    className={`tab-item ${activePath.indexOf('/SingerList') != -1 && 'router-link-active'}`}
                     onClick={this.LinkTo.bind(this, '/Home/SingerList')}
                >
                    <span className="tab-link">歌手</span>
                </div>
                <div
                    className={`tab-item ${activePath.indexOf('/RankList') != -1 && 'router-link-active'}`}
                    onClick={this.LinkTo.bind(this, '/Home/RankList')}
                >
                    <span className="tab-link">排行</span>
                </div>
                <div
                    className={`tab-item ${activePath.indexOf('/Search') != -1 && 'router-link-active'}`}
                    onClick={this.LinkTo.bind(this, '/Home/Search')}
                >
                    <span className="tab-link">搜索</span>
                </div>
            </div>
        )
    }

    LinkTo(path) {
        const history = createHashHistory();

        history.replace(path)
        this.setState({
            activePath: path
        })
    }

}

export default NavBar