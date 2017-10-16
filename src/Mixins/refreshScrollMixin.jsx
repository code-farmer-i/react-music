import React, {Component} from 'react'
import { connect } from 'react-redux'

export default (InnerComponent) => {

    class withScrollRefresh extends Component {
        scrollNeedFresh = false

        render() {
            return <InnerComponent ref="component" {...this.props}/>
        }
    }

    const oldComponentDidMount = InnerComponent.prototype.componentDidMount;

    InnerComponent.prototype.componentDidMount = function(){
        oldComponentDidMount && oldComponentDidMount()

        if(this.props.MiniShow){
            this.refs.scrollView.style.bottom = '60px';
            this.refs.scroll.refresh()
        }
    }

    if(!InnerComponent.prototype.componentWillReceiveProps){
        InnerComponent.prototype.componentWillReceiveProps = function(nextProps){
            const {
                prevMiniShow
            } = this.props;

            const {
                MiniShow
            } = nextProps

            if(MiniShow != prevMiniShow){
                this.scrollNeedFresh = true
            }
        }
    }

    if(!InnerComponent.prototype.componentDidUpdate){
        InnerComponent.prototype.componentDidUpdate = function(){
            if(this.scrollNeedFresh) {
                this.refs.scrollView.style.bottom = '60px';
                this.refs.scroll.refresh()
                this.scrollNeedFresh = false
            }
        }
    }

    return connect(
        (state) => {
            return {
                MiniShow: state.Play.MiniShow
            }
        }
    )(withScrollRefresh)
}