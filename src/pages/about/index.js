import { Component } from 'react';
const aboutHtml = document.getElementById('aboutHtml').innerHTML;
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="common-content">
                <div className="common-content-title">关于</div>
                <div dangerouslySetInnerHTML={{__html:aboutHtml}}></div>
            </div>
        );
    }
}
 
export default About;