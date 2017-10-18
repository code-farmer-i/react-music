import React, { Component } from 'react'

//components
import Slide from '../../../components/common/Slide'
import FlexList from '../../../components/FlexList'
import Scroll from '../../../components/common/Scroll'
import Loading from '../../../components/common/Loading'

import {setRecommendCd} from "../../../store/Global/Actions";
import {addSongToList} from "../../../store/Play/Actions";
import {createSong2} from "../../../util/createSong";
import API from '../../../util/ApiServer'
import withMixins from '../../../Mixins'

import './style.styl'

@withMixins(['refreshScrollMixin'])
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
                                    itemClick={this.toRecommendCd.bind(this)}
                                    complete={this.refrehScroll.bind(this)}
                                ></FlexList>
                                <FlexList
                                    ref="newSongList"
                                    title="新歌首发"
                                    imgName="discImg"
                                    msgName="title"
                                    itemClick={this.addSongToList.bind(this)}
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

    toRecommendCd(cd) {
        this.props.dispatch(setRecommendCd({
            name: cd.title,
            bg: cd.cover
        }))

        this.props.history.push(`/RecommendCd/${cd.content_id}`)
    }

    addSongToList(song) {
        this.props.dispatch(addSongToList(song))
    }
}

export default Recommend