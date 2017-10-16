import React, { Component } from 'react'
import {Route, Redirect} from 'react-router'

import MainHead from '../../components/MainHead'
import NavBar from '../../components/NavBar'

//router
import Recommend from './Recommend'
import SingerList from "./SingerList"
import RankList from "./RankList"
import Search from "./Search"

import './style.styl'

class Home extends Component {
    constructor({match}) {
        super()
    }

    render() {
        return (
            <div className="Home">
                <MainHead/>
                <NavBar/>
                <Route path="/Home/Recommend" component={Recommend}/>
                <Route path="/Home/SingerList" component={SingerList}/>
                <Route path="/Home/Search" component={Search}/>
                <Route path="/Home/RankList" component={RankList}/>
            </div>
        )
    }
}

export default Home