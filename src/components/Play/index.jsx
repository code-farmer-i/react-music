import React, {Component} from 'react'
import {connect} from 'react-redux'
import cs from 'classnames'

import Slide from '../../components/common/Slide'

import {
    play,
    pause,
    changeMode,
    nextSong,
    prevSong,
    showMini
} from '../../store/Play/Actions'

import './style.styl'

class User extends Component {
    state = {
        currentLyricTxt: '',
        audioCurrentTime: '',
        audioDuration: '',
        progressWidth: 0,
        prevCurrentTime: 0
    }

    progressBtnWidth = 30

    progressWidth = 0

    render() {
        const {
            fullScreen,
            currentSong,
            playing,
            songListCount,
            dispatch
        } = this.props;

        const {
            currentLyricTxt,
            audioCurrentTime,
            audioDuration
        } = this.state

        return (
            <div>
                <div className={cs('normal-player', fullScreen ? 'show enter' : 'leave')}>
                    <div className="title-group">
                        <div className="player-header">
                            <i className="icon-back" onClick={dispatch.bind(this, showMini())}></i>
                            <div className="song-name" dangerouslySetInnerHTML={{__html: currentSong.name}}></div>
                        </div>
                        <div className="singerName">
                            <span dangerouslySetInnerHTML={{__html: currentSong.singerName}} className="text"></span>
                        </div>
                    </div>
                    <div className="middle">
                        <Slide autoPlay={false} loop={false} ref="slide">
                            <div className="slider-item cd-slider">
                                <div className="player-cd">
                                    <div className={cs('cd-wrap', playing ? 'play' : 'pause')}>
                                        <img src={currentSong.discImg} width="100%" height="100%"/>
                                    </div>
                                </div>
                                <div className="currentLyricTxt">
                                    <span className="text">{currentLyricTxt}</span>
                                </div>
                            </div>
                            <div className="slider-item">
                                {/*<lyric ref="lyric" */}
                                {/*lyricTxtChange="setCurrentLyricTxt"*/}
                                {/*lyricReady="refreshLyric"*/}
                                {/*></lyric>*/}
                            </div>
                        </Slide>
                    </div>
                    <div className="bottom">
                        <div className="progress-wrapper">
                            <span className="time time-l">{this.showCurrentTime()}</span>
                            <div className="progress-bar-wrapper">
                                <div className="progress-bar" onClick={this.progressClick.bind(this)} ref="progress">
                                    <div className="bar-inner">
                                        <div className="progress" style={{width: `${this.getRatio() * 100}%`}}></div>
                                        <div className="progress-btn-wrapper"
                                             style={{transform: `translate3d(${this.getRatio() * this.progressWidth}px, 0px, 0px)`}}>
                                            <div className="progress-btn"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="time time-r">{this.showDuration()}</span>
                        </div>
                        <div className="operators">
                            <div className="icon i-left">
                                <i className={this.getModeIcon()} onClick={this.changeMode.bind(this)}></i>
                            </div>
                            <div className="icon i-left">
                                <i className="icon-prev" onClick={this.changeSong.bind(this, 'prev')}></i>
                            </div>
                            <div className="icon i-center">
                                <i className={cs(playing ? 'icon-pause' : 'icon-play')}
                                   onClick={this.togglePlay.bind(this)}></i>
                            </div>
                            <div className="icon i-right">
                                <i className="icon-next" onClick={this.changeSong.bind(this, 'next')}></i>
                            </div>
                            <div className="icon i-right">
                                <i className="icon"
                                   className="[isFavorite(currentSong.id) ? 'icon-favorite' : 'icon-not-favorite']"
                                   click="toggleFavorite(currentSong)"
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div className="player-bg">
                        <img src={currentSong.discImg} width="100%" height="100%"/>
                    </div>
                </div>
                <div className={cs('mini-player', !fullScreen && songListCount ? '' : 'hide')} click="showFull">
                    <div className="icon">
                        <img width="40" height="40" src={currentSong.discImg} className={cs(playing ? 'play' : 'pause')}/>
                    </div>
                    <div className="text">
                        <h2 className="name" dangerouslySetInnerHTML={{__html: currentSong.name}}></h2>
                        <p className="desc" dangerouslySetInnerHTML={{__html: currentSong.singerName}}></p>
                    </div>
                    <div className="control">
                        <div className="progress-circle" click="togglePlay">
                            <div className={cs({'circle-item': true, 'gt50': this.getRatio() * 360 > 180})}>
                                <div className="circle" style={{transform: `rotateZ(${this.getRatio() * 360}deg)`}}></div>
                                <div className={cs('circle-fill gt50', this.getRatio() * 360 > 180 ? 'show' : 'hide')}></div>
                                <div className={cs('circle-fill gt50', this.getRatio() * 360 < 180 ? 'show' : 'hide')}></div>
                                <div className="inner-circle"></div>
                                <div className={cs('play-icon', playing ? 'play' : 'pause')}></div>
                            </div>
                        </div>
                    </div>
                    <div className="control" click="showPlayList">
                        <i className="icon-playlist"></i>
                    </div>
                </div>
                <audio ref="audioEl"
                       onEnded={this.audioEnd.bind(this)}
                       onTimeUpdate={this.audioTimeupdate.bind(this)}
                       onDurationChange={this.updateDuration.bind(this)}
                ></audio>
            </div>
        )
    }

    componentDidMount() {
        this.progressWidth = this.refs.progress.clientWidth

        this.audioEl = this.refs.audioEl;
        this.refs.slide.renderSlide()
    }

    componentWillReceiveProps(nextProps) {
        const {
            currentSong: prevSong,
            MiniShow: prevMiniShow
        } = this.props;

        const {
            currentSong,
            playing,
            MiniShow
        } = nextProps;

        //当前歌曲变化
        if (currentSong.id !== prevSong.id) {
            this.changeSrc(currentSong);
        }

        if (playing) {
            this.playAudio()
        } else {
            this.pauseAudio()
        }
    }

    getRatio() {
        return this.state.audioCurrentTime / this.state.audioDuration
    }

    showCurrentTime() {
        return this.formatTime(this.state.audioCurrentTime)
    }

    showDuration() {
        return this.formatTime(this.state.audioDuration)
    }

    formatTime(seconds) {
        return [
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
        ]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
    }

    audioEnd() {
        this.changeSong('next')
    }

    progressClick({nativeEvent: e}) {
        const n = (e.offsetX - (this.progressBtnWidth / 4)) / this.progressWidth;

        this.setState({
            audioCurrentTime: n * this.state.audioDuration
        }, () => {
            this.audioEl.currentTime = n * this.state.audioDuration;
        })
    }

    changeSong(type) {
        const {
            dispatch,
            songListCount,
            currentIdx,
            currentSong,
            mode
        } = this.props

        //loop
        if (mode == 1 || songListCount == 1) {
            this.changeSrc(currentSong);
            this.playAudio();
        } else {
            dispatch(type == 'next' ? nextSong() : prevSong())
        }
    }

    audioTimeupdate() {

        if (this.state.prevCurrentTime == Math.floor(this.audioEl.currentTime)) return

        // if(!isRefreshLyric){
        //     this.$refs.lyric.refreshLyric(this.audioEl.currentTime)
        //     isRefreshLyric = true;
        // }

        this.setState({
            audioCurrentTime: this.audioEl.currentTime,
            prevCurrentTime: Math.floor(this.audioEl.currentTime)
        });
    }

    updateDuration() {
        this.setState({
            audioDuration: Math.floor(this.audioEl.duration)
        })
    }

    getModeIcon() {
        const {mode} = this.props;
        let icon;

        if (mode == 0) {
            icon = 'icon-sequence'
        } else if (mode == 1) {
            icon = 'icon-loop'
        } else {
            icon = 'icon-random'
        }

        return icon
    }

    togglePlay() {
        const {
            dispatch,
            playing
        } = this.props;

        if (playing) {
            dispatch(pause())
        } else {
            dispatch(play())
        }
    }

    changeMode() {
        const {
            dispatch,
            mode
        } = this.props;

        if (mode == 2) {
            dispatch(changeMode(0))
        } else {
            dispatch(changeMode(mode + 1))
        }
    }

    changeSrc(song) {
        this.audioEl.src = song.audioSrc
    }

    pauseAudio() {
        this.audioEl.pause()
    }

    playAudio() {
        this.audioEl.play()
    }
}

export default connect(
    (state) => {
        let Play = state.Play;

        return {
            songListCount: Play.songList.length,
            currentSong: Play.songList[Play.currentIdx] || {},
            playing: Play.playing,
            fullScreen: Play.fullScreen,
            mode: Play.mode
        }
    }
)(User)