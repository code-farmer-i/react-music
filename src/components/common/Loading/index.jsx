import React, {Component} from 'react'
import cs from 'classnames'

import './style.styl'

class Loading extends Component {
    static defaultProps = {
        title: '',
        hide: false
    }

    render() {
        return (
            <div className={cs({'loading': true, 'hide': this.props.hide})}>
                <img src={require('./loading.gif')} width="10%" />
                    <p className="desc">{this.props.title}</p>
            </div>
        )
    }
}

export default Loading