import React, { Component } from 'react'

import Scroll from '../../../components/common/Scroll'

import { setSinger } from '../../../store/Global/Actions'
import createSinger from '../../../util/createSinger'
import API from '../../../util/ApiServer'
import withMixins from '../../../Mixins'

import './style.styl'

class SingerList extends Component {
    state = {
        singerList: [],
        sortList: [],
        sortActiveIdx: 0
    }

    render() {
        const {singerList} = this.state;

        return (
            <div className="singer-list" ref="scrollView">
                <Scroll
                    probeType="3"
                    listenScroll={true}
                    ref="scroll"
                    scrolling={this.onScroll.bind(this)}
                >
                    <ul>
                        {
                            singerList.map((group)=> {
                                return (
                                    <li className="list-group" ref="listGroup" key={group.sort}>
                                        <h2 className="list-group-title">{group.sort}</h2>
                                        <ul>
                                            {
                                                group.items.map((item)=>{
                                                    return (
                                                        <li onClick={this.chooseSinger.bind(this, item)} className="list-group-item" key={item.id}>
                                                            <img src={item.avatar} className="avatar" />
                                                            <span className="name">{item.name}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Scroll>
            </div>
        )
    }

    componentWillMount() {
        this.getSingerList()
    }

    async getSingerList(){
        const result = await API.getSingerList();

        this.formatSingerList(result.list)
    }

    formatSingerList(list){
        //拿到热门歌手
        const singerList = {};
        let title = new Set();

        singerList['热门'] = [];
        title.add('热门');

        list.forEach((val, index)=> {
            const singer = {
                sort: val.Findex,
                id: val.Fsinger_mid,
                name: val.Fsinger_name,
                avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${val.Fsinger_mid}.jpg?max_age=2592000`
            }

            if (index < 10) {
                singerList['热门'].push(singer)
            }

            if (title.has(val.Findex)) {
                singerList[val.Findex].push(singer)
            } else {
                singerList[val.Findex] = [];
                singerList[val.Findex].push(singer)
            }

            title.add(val.Findex);
        })

        let hotList = [];
        let otherList = [];
        let sortList = ['热'];

        for (const [key, singers] of Object.entries(singerList)) {
            const item = {
                sort: key,
                items: singers
            };

            if (key.match(/[a-zA-Z]/)) {
                otherList.push(item)
            } else if (key === '热门') {
                hotList.push(item)
            }
        }

        otherList.sort((a, b)=> {
            return a.sort.charCodeAt(0) - b.sort.charCodeAt(0)
        })

        sortList = sortList.concat(otherList.map( val => val.sort));

        this.setState({
            sortList,
            singerList: hotList.concat(otherList)
        }, () => {
            this.refs.scroll.refresh()
        })
    }


    onScroll() {

    }

    chooseSinger(singer) {
        const { history, dispatch } = this.props;
        const singerObj = new createSinger(singer.id, singer.name)

        dispatch(setSinger(singer), ()=>console.log(1))

        history.push(`/Singer/${singer.id}`)
    }
}

export default withMixins(SingerList, ['refreshScrollMixin'])