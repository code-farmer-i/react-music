import React, { Component } from 'react'
import cs from 'classnames'
import BScroll from 'better-scroll'

import './style.styl'

class Slide extends Component {
    static defaultProps = {
        loop: true,
        autoPlay: true,
        interval: 4000
    }

    state = {
        currentPageIndex: 0,
        dots: []
    }

    render() {
        const {slot} = this.props;

        return (
            <div className="slider" ref="slider">
                <div className="slider-group" ref="sliderGroup">
                    {this.props.children}
                </div>
                <div className="dots">
                    {
                        this.state.dots.map((item, idx) => {
                            return (
                                <div
                                    className={cs('dot', {active: this.state.currentPageIndex == idx})}
                                    key={idx}
                                ></div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    renderSlide() {

        this.initSlideWidth()
        this.initSlide()

        if (this.props.autoPlay) {
            this.play()
        }

    }

    initSlideWidth() {
        const $refs = this.refs;
        const slider = $refs.slider;
        const sliderItems = $refs.sliderGroup.children;
        const itemWidth = slider.clientWidth;

        $refs.sliderGroup.style.width = `${this.props.loop ? itemWidth * sliderItems.length + 2 * itemWidth : itemWidth * sliderItems.length}px`;
        this.setState({
            dots: Array.from({length: sliderItems.length})
        })

        for(let item of sliderItems){
            item.style.width = `${itemWidth}px`;
        }
    }

    initSlide() {
        this.slide = new BScroll(this.refs.slider, {
            scrollX: true,
            momentum: false,
            snap: {
                loop: this.props.loop,
                threshold: 0.3,
                speed: 400
            },
            click: true
        })

        this.slide.on('scrollEnd', () => {
            this.onScrollEnd()
        })

        this.slide.on('touchend', () => {
            if (this.props.autoPlay) {
                this.play()
            }
        })

        this.slide.on('beforeScrollStart', () => {
            if (this.props.autoPlay) {
                clearTimeout(this.timer)
            }
        })
    }

    onScrollEnd() {
        let pageIndex = this.slide.currentPage.pageX

        if (this.props.loop) {
            pageIndex -= 1
        }
        this.setState({
            currentPageIndex: pageIndex
        })

        if (this.props.autoPlay) {
            this.play()
        }
    }

    play() {
        let pageIndex = this.slide.currentPage.pageX + 1

        clearTimeout(this.timer)

        this.timer = setTimeout(() => {

            this.slide.goToPage(pageIndex, 0, 400)

        }, this.props.interval)
    }

}

export default Slide