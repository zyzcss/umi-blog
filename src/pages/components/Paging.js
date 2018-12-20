import React, { Component } from 'react'
import {Row, Col, Icon} from 'antd'
import styles from './Paging.css';
class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    prePage = () =>{
        this.props.changePage(-1);
    }
    nextPage = ()=>{
        this.props.changePage(1);
    }
    render() { 
        const {current = 0, count = 0} = this.props;
        return (  
            <Row>
                <Col md={{span:3,offset:0}} xs={{span:3,offset:1}}>
                    <div 
                        className={styles.paging_button}
                        style={{
                            opacity: current > 0 ? 1 : 0
                        }}
                        onClick={this.prePage}
                    >
                        <Icon 
                            type="left"
                            style={{
                                margin:'0px 10px 0px -10px'
                            }}
                        />
                        上一页
                    </div>
                </Col>
                <Col md={18} xs={16}>
                    
                </Col>
                <Col md={{span:3}} xs={{span:3}}>
                    <div 
                        className={styles.paging_button + ' right'}
                        style={{
                            opacity: current < count ? 1 : 0
                        }}
                        onClick={this.nextPage}
                    >
                        下一页
                        <Icon 
                            type="right"
                            style={{
                                margin:'0px -10px 0px 10px'
                            }}
                        />
                    </div>
                </Col>
            </Row>
        );
    }
}
 
export default Paging;