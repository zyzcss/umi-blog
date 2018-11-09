import React, { Component } from 'react'

class Loadding extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {loadding, fail} = this.props;
        return (  
            <div className="bouncing-loader" style={{display: loadding || fail  ? 'flex' : 'none'}}>
                <div className="bouncing-box" style={{visibility: loadding&&!fail ? 'visible' : 'hidden'}}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p style={{visibility: fail ? 'visible' : 'hidden'}}>加载失败</p>
            </div>
        );
    }
}
 
export default Loadding;