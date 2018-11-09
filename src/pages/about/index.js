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
                <p>此网站是本人练手的作品,纪录本人一些原创或转载的博文。</p>
                <p>此网站有任何bug或其他疑问欢迎联系<b>yzdslloli@163.com</b>。</p>
            </div>
        );
    }
}
 
export default About;