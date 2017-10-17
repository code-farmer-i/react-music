import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TopBar from '../../components/TopBar'
import Scroll from '../../components/common/Scroll'
import Loading from '../../components/common/Loading'

import { playList } from '../../store/Play/Actions'
import API from '../../util/ApiServer'
import { createSong } from "../../util/createSong";

import withMixins from '../../Mixins'

import './style.styl'

class Singer extends Component {
    state = {
        songList: []
    }

    render() {
        const { singer } = this.props;
        const { songList } = this.state;

        return (
            <div className="singer">
                <TopBar title={singer.name}></TopBar>
                <div className="singer-photo" style={{'backgroundImage': `url(${singer.avatar})`}}></div>
                <div className="song-list" ref="scrollView">
                    <Scroll ref="scroll">
                        <ul className="song-list-wrap">
                            {
                                songList.map((song, index)=>{
                                    return (
                                        <li className="song-wrap" onClick={this.playList.bind(this, index)} key={song.id}>
                                            <div dangerouslySetInnerHTML={{__html: song.name}} className="song-name"></div>
                                            <div className="song-disc" dangerouslySetInnerHTML={{__html: `${song.singerName} - ${song.albumName}`}}></div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Scroll>
                    <Loading hide={!!songList.length}/>
                </div>
            </div>
        )
    }

    componentWillMount() {
        const singerId = this.props.match.params.singerId
        const singer = this.props.singer;

        if(!singerId || !singer){
            this.props.history.go(-1)
        }else{
            this.getSingerDetails(singerId)
        }
    }

    async getSingerDetails(singerId){
        let singerDetails = await API.getSingerDetails(singerId)

        this.setState({
            songList: singerDetails.list.map(val => new createSong(val.musicData))
        }, () => {
            this.refs.scroll.refresh()
        })
    }

    playList(idx) {
        const {dispatch} = this.props;

        dispatch(playList(this.state.songList, idx))
    }

}

export default connect(
    (state) => {
        return {
            singer: state.singer
        }
    }
)(withMixins(Singer, ['refreshScrollMixin']))