import { Component } from 'react';
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="common-content">
                <div className="common-content-title">关于</div>
                <div dangerouslySetInnerHTML={{__html:document.getElementById('about').innerHTML}}></div>
            </div>
        );
    }
}
 
export default About;