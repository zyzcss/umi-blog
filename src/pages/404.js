import React, { Component } from 'react'
class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="common-content" style={{background:`url(/images/404.png)`,backgroundSize:'280px 150px'}}>
                <h1 style={{color:'red'}}>我是谁?<br/>我在哪？<b/>404 NOT FOUND</h1>
            </div>
        );
    }
}
 
export default NotFound;