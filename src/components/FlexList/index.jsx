import React, { Component } from 'react'

import './style.styl'

class FlexList extends Component {
    ITEM_MARGIN = 8

    GROUP_NUM = 3

    MAX_GROUP = 3

    static defaultProps = {
        title: '',
        imgName: '',
        msgName: ''
    }

    state = {
        data: []
    }

    render() {
        const {title, imgName, msgName, itemClick}  = this.props;
        const {data, itemHeight}  = this.state;

        return (
            <div className="flex-list">
                <div className="title">{title}</div>
                {
                    data.map((group, idx)=>{
                        return (
                            <div className="item-group" key={idx}>
                                {
                                    group.map((item, idx)=>{
                                        return (
                                            <div className="item" onClick={itemClick.bind(this, item)} key={idx}>
                                                <img src={item[imgName]} style={{height: `${itemHeight}px`}} />
                                                <div className="msg">{item[msgName]}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    componentWillMount() {
        this.setState({
            itemHeight: ((window.innerWidth > 500 ? 500 : window.innerWidth) - this.ITEM_MARGIN) / this.GROUP_NUM
        })
    }

    formatData(data){
        const {GROUP_NUM, MAX_GROUP} = this;
        let newData = [];
        let startNum = 0;
        let endNum = GROUP_NUM;
        let groupNum = parseInt(data.length / GROUP_NUM);
        groupNum = groupNum > MAX_GROUP ? MAX_GROUP : groupNum

        for(let i = 0;i< groupNum;i++){
            newData.push(data.slice(startNum, endNum))

            startNum += GROUP_NUM;
            endNum += GROUP_NUM;
        }

        this.setState({
            data: newData
        }, ()=>{
            this.props.complete()
        })
    }
}

export default FlexList