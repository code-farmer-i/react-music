export default {
    props:{
        scrollNeedFresh: false
    },
    addState(state){
        return {
            MiniShow: state.Play.MiniShow
        }
    },
    hook: {
        componentDidMount(){
            if(this.props.MiniShow){
                this.refs.scrollView.style.bottom = '60px';
                this.refs.scroll.refresh()
            }
        },
        componentWillReceiveProps(nextProps){
            const {
                prevMiniShow
            } = this.props;

            const {
                MiniShow
            } = nextProps

            if(MiniShow != prevMiniShow){
                this.scrollNeedFresh = true
            }
        },
        componentDidUpdate(){
            if(this.scrollNeedFresh) {
                this.refs.scrollView.style.bottom = '60px';
                this.refs.scroll.refresh()
                this.scrollNeedFresh = false
            }
        }
    }
}
