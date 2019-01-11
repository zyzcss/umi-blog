import React, { Component } from 'react'
import styles from './Footer.css'
import beianIcon from '../../assets/beian.png'
import {Row, Col} from 'antd'
class Foter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className={styles.footer}>
                <p>个人网站 纯属娱乐</p>
                <Row>
                    <Col span={12} style={{textAlign:'right',paddingRight:10}}>
                        <a 
                            target="_blank" 
                            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010802009578" 
                            className={styles.link_container}>
                            <img src={beianIcon} style={{float:'left'}}/>
                            <span>浙公网安备 33010802009578号</span>
                        </a>
                    </Col>
                    <Col span={12} style={{textAlign:'left',paddingLeft:10}}>
                        <p>联系站长：<a href="mailto:yzdslloli@163.com" style={{color:'#aaa'}}>yzdslloli@163.com</a></p>
                    </Col>
                </Row>
            </div>
        );
    }
}
 
export default Foter;