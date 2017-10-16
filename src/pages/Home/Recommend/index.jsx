import React, { Component } from 'react'

//components
import Slide from '../../../components/common/Slide'
import FlexList from '../../../components/FlexList'
import Scroll from '../../../components/common/Scroll'
import Loading from '../../../components/common/Loading'

import {createSong2} from "../../../util/createSong";
import API from '../../../util/ApiServer'
import componentWithRereshScroll from '../../../Mixins/refreshScrollMixin'

import './style.styl'

class Recommend extends Component {
    state = {
        slideList: [],
        flexListDataReady: false
    }

    render() {
        return (
            <div className="recommend" ref="scrollView">
                <Scroll ref="scroll">
                    <div className="slider-wrapper">
                        <Slide ref="slide">
                            {
                                this.state.slideList.map((item)=>{
                                    return (
                                        <div className="slider-item" key={item.id}>
                                            <a href={item.linkUrl}>
                                                <img className="needsclick" src={item.picUrl}/>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </Slide>
                    </div>
                    {
                        this.state.flexListDataReady &&
                            <div>
                                <FlexList
                                    ref="recomPlaylist"
                                    title="歌单推荐"
                                    imgName="cover"
                                    msgName="title"
                                    itemClick={this.addSongToList}
                                    complete={this.refrehScroll.bind(this)}
                                ></FlexList>
                                <FlexList
                                    ref="newSongList"
                                    title="新歌首发"
                                    imgName="discImg"
                                    msgName="title"
                                    itemClick={this.toRecommendCd}
                                    complete={this.refrehScroll.bind(this)}
                                ></FlexList>
                            </div>
                    }
                </Scroll>
                {
                    !this.state.flexListDataReady && <Loading/>
                }
            </div>
        )
    }

    componentWillMount(){
        this.getSlide()
        this.getRecommendList()
    }

    async getSlide() {
        const result = await API.getRecommend()

        this.setState({
            slideList: result.slider
        }, () => {
            this.refs.slide.renderSlide()
        })
    }

    async getRecommendList(){
        const result = await API.getRecommendList()
        let newSongList = result.new_song.data.song_list;

        newSongList = newSongList.map((song)=>{
            return new createSong2(song)
        })


        let rec = result.recomPlaylist.data.v_hot;
        rec = rec.sort((a, b)=>{
            return b.listen_num - a.listen_num
        })

        this.setState({
            flexListDataReady: true
        }, () => {
            this.refs.recomPlaylist.formatData(rec);
            this.refs.newSongList.formatData(newSongList);
        })
    }

    refrehScroll() {
        this.refs.scroll.refresh()
    }

    toRecommendCd() {

    }

    addSongToList() {

    }
}

export default componentWithRereshScroll(Recommend)