import React, {Component} from 'react'
import { connect } from 'react-redux'

import TopBar from '../../components/TopBar'
import Loading from '../../components/common/Loading'
import ListView from '../../components/ListView'

import {addSongToList} from "../../store/Play/Actions";
import { createSong } from "../../util/createSong";
import API from '../../util/ApiServer'
import withMixins from '../../Mixins'

import './style.styl'

class RecommendCd extends Component {
    state = {
        songList: []
    }

    render() {
        const { recommendCd } = this.props;

        return (
            <div className="recommend-cd">
                <TopBar title={recommendCd.name}></TopBar>
                <div className="cd-photo" style={{'backgroundImage': `url(${recommendCd.bg})`}}></div>
                <div className="list-wrap">
                    {
                        this.state.songList.length ?
                        <ListView itemClick={this.addSongToList.bind(this)} data={this.state.songList}></ListView>
                        :
                        <Loading></Loading>
                    }
                </div>
            </div>
        )
    }

    componentWillMount() {
        const disstid = this.props.match.params.disstid;

        if(!disstid || !this.props.recommendCd){
            this.props.history.go(-1)
        }else{
            this.getCdInfo(disstid)
        }
    }

    async getCdInfo(disstid){
        let result = await API.getCdInfo(disstid);
        result = result.replace('playlistinfoCallback(', ' ')
        result = JSON.parse(result.substr(0, result.length - 1))

        let songList = result.cdlist[0].songlist;
        songList = songList.map((song)=>{
            return new createSong(song)
        })

        this.setState({
            songList
        })
    }

    addSongToList(song){
        this.props.dispatch(addSongToList(song))
    }
}

export default connect(
    (state) => {
        return {
            recommendCd: state.recommendCd
        }
    }
)(RecommendCd)