import React, { Component } from 'react'
import Slide from '../../../components/common/Slide'
import Api from '../../../util/ApiServer'

import './style.styl'

class Recommend extends Component {
    state = {
        slideList: []
    }

    render() {
        return (
            <div className="recommend">
                <div className="slider-wrapper">
                    <Slide
                        ref="slide"
                        slot={
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
                    ></Slide>
                </div>
            </div>
        )
    }

    componentWillMount(){
        this.getSlide()
    }

    async getSlide() {
        const result = await Api.getRecommend()

        this.setState({
            slideList: result.slider
        }, () => {
            this.refs.slide.renderSlide()
        })
    }
}

export default Recommend