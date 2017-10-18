export default {
    hook: {
        componentWillReceiveProps(nextProps){
            if(!this.watchProps) return

            for(const [propNameStr, watchCb] of Object.entries(this.watchProps)){
                let oldVal = this.props;
                let newVal = nextProps;
                const propNames = propNameStr.split('.')

                propNames.forEach((propName) => {
                    oldVal = oldVal[propName]
                    newVal = newVal[propName]
                })

                if(oldVal !== newVal){
                    watchCb.call(this, newVal, oldVal);
                }
            }
        }
    }
}