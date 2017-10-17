export default {
    props:{
        scrollNeedFresh: false
    },
    methods:{
        testMethod: function(){
            console.log(this)
        }
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
                console.log(2)
            }
        },
        componentDidUpdate(){
            if(this.scrollNeedFresh) {
                console.log(1)
                this.refs.scrollView.style.bottom = '60px';
                this.refs.scroll.refresh()
                this.scrollNeedFresh = false
            }
        }
    }
}
