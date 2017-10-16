import React, { Component } from 'react'
import BScroll from 'better-scroll'

import './style.styl'

class Scroll extends Component {
    static defaultProps = {
        probeType: 1,
        click: true,
        listenScroll:false,
        pullUpLoad: false
    }

    render() {
        const {slot} = this.props;

        return (
            <div ref="wrapper" className="scroll-wrap">
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.initScroll()
    }

    initScroll(){
        const that = this;

        this.scroll = new BScroll(this.refs.wrapper, {
            scrollY: true,
            probeType: this.probeType,
            click: this.props.click,
            pullUpLoad: this.props.pullUpLoad
        })

        if(this.props.listenScroll){
            this.scroll.on('scroll', (pos)=>{
                that.$emit('scrolling', pos)
            })
        }

        if (this.props.pullUpLoad) {
            this.scroll.on('scrollEnd', () => {
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                    this.$emit('loadMore')
                }
            })
        }
    }

    initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
            this.$emit('loadMore')
        })
    }

    scrollToElement(...arg){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arg);
    }

    recaculate() {
        this.scroll && this.scroll.refresh()
    }

    refresh(){
        if(this.scroll) {
            this.scroll.refresh()
            this.scroll.scrollTo(0, 0)
        }
    }
}

export default Scroll