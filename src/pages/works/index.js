import React, { Component } from 'react'
import { connect } from 'dva';
import Loadding from '../components/Loadding'
import App from '../components/App'
class Works extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            works:[]
        }
    }
    componentDidMount(){
        const { dispatch } = this.props;
		dispatch({
			type: 'global/getApps'
		});
    }
    render() { 
        const {apps} = this.props;
        const loadding = !apps || apps.length === 0;
        return ( 
            <React.Fragment> 
                <div 
                    className="loadding-container"
                    style={{
						height: loadding ? '50px' : '0px'
					}}
                    >
                    <Loadding loadding={loadding}/>
                </div>
                {!loadding 
                ?
                (<div className="common-content">
                    <div className="common-content-title">Apps</div>
                    <div className="flex-app">
                    {apps.map((app) =>(
                        <App 
                            key={app.id}
                            app={app}
                        >
                        </App>
                    ))}
                    </div>
                </div>)
                :''
                }
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
	const { apps } = state.global;
	return {
		apps,
	};
}
export default connect(mapStateToProps)(Works);
