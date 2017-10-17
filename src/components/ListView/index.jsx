import React, {Component} from 'react'

import Scroll from '../../components/common/Scroll'

import withMixins from '../../Mixins'

import './style.styl'

class ListView extends Component {
    render() {
        const {data} = this.props;

        return (
            <div className="list-view" ref="scrollView">
                <Scroll ref="scroll">
                    <div>
                        {
                            data.map((item)=> {
                                return (
                                    <div className="item" onClick={this.props.itemClick.bind(null, item)} key={item.id}>
                                        <div className="item-wrap">
                                            <h2 dangerouslySetInnerHTML={{__html: item.name}}></h2>
                                            <p dangerouslySetInnerHTML={{__html: `${item.singerName} - ${item.albumName}`}}></p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Scroll>
                {/*<no-result msg="暂无歌曲" v-show="!data.length"></no-result>*/}
            </div>
        )
    }
}

export default withMixins(ListView, ['refreshScrollMixin'])