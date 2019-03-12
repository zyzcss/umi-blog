import React, { Component } from 'react'
import {Row, Col, Icon, Input} from 'antd'
import styles from './Paging.css';
class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            inputPage: this.props.current + 1
        }
    }
    changeInput = (e) =>{
        const inputPage = e.target.value,
              number = Number(inputPage);
        if(inputPage === '' || String(number) === inputPage && number === parseInt(inputPage)){
            this.setState({
                inputPage: inputPage
            })
        }
    }
    keyPress = (e) =>{
        if(e.key === 'Enter' ){
            e.preventDefault();
            this.changePage();
        }
    }
    changePage = (inputPage = Number(this.state.inputPage)) =>{
        if(inputPage == this.props.current + 1){
            return;
        }
        if(inputPage == 0){
            this.setState({
                inputPage: this.props.current + 1
            })
            return;
        }
        const {count} = this.props;
        if(inputPage > count + 1){
            this.setState({
                inputPage: count + 1
            })
            this.props.changePage(count + 1);
            return;
        }
        this.props.changePage(inputPage);
        this.setState({
            inputPage
        })
    }
    buttonClick = (e, inputPage) =>{
        e.target.blur();
        this.changePage(inputPage);
    }
    buttonKeyPress = (e, inputPage) =>{
        if(e.key === 'Enter'){
            this.buttonClick(e, inputPage);
        }
    }
    resetInput = (inputPage)=>{
        this.setState({
            inputPage
        })
    }
    render() { 
        const {current = 0, count = 0, enabled} = this.props;
        const cursor = enabled ? 'pointer' : 'wait';
        return (  
            <Row>
                <Col md={{span:3,offset:0}} xs={{span:3,offset:1}}>
                    <div 
                        className={styles.paging_button}
                        style={{
                            opacity: current > 0 ? 1 : 0,
                            visibility: current > 0 ? 'visible' : 'hidden',
                            cursor
                        }}
                        onClick={(e) => this.buttonClick(e, current)}
                        onKeyPress={(e) => this.buttonKeyPress(e, current)}
                        tabIndex="0"
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
                <Col 
                    md={18} 
                    xs={16} 
                    style={{
                        textAlign:"center",
                        visibility:count > 1 ? 'visible' : 'hidden'
                    }}
                >
                    <div 
                        className={styles.paging_number}
                    >
                        <Input 
                            size={"small"} 
                            value={this.state.inputPage}
                            onChange={this.changeInput}
                            style={{
                                width:45
                            }}
                            onKeyPress={this.keyPress}
                        /> / {count + 1} 页
                    </div>
                    <div 
                        className={styles.paging_button + ' ' + styles.paging_go}
                        onClick={this.buttonClick}
                        onKeyPress={this.buttonKeyPress}
                        tabIndex="0"
                    >
                        前往
                    </div>
                </Col>
                <Col md={{span:3}} xs={{span:3}}>
                    <div 
                        className={styles.paging_button + ' right'}
                        style={{
                            opacity: current < count ? 1 : 0,
                            visibility: current < count ? 'visible' : 'hidden',
                            cursor
                        }}
                        onClick={(e) => this.buttonClick(e, current + 2)}
                        onKeyPress={(e) => this.buttonKeyPress(e, current + 2)}
                        tabIndex="0"
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