import React, { Component } from 'react'
import { connect } from 'dva';
import {Icon,Col,Row} from 'antd'
import styles from './Setting.css'
import Switch from './Switch'
class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isSpread: false
        }
    }
    spreadBox = () =>{
        this.setState({
            isSpread: !this.state.isSpread
        })
    }
    changeAnimation = (checked) =>{
        this.dispatchSetting('animationSwitch', checked)
    }
    changeEmoji = (checked) =>{
        this.dispatchSetting('emojiSwitch', checked)
    }
    dispatchSetting = (settingName, settingValue) =>{
        const { dispatch } = this.props;
        const setting = {};
        setting[settingName] = settingValue;
		dispatch({
            type: 'global/setSetting',
            payload:{
                setting
            }
		});
    }
    render() { 
        const {isSpread} = this.state;
        const boxShadow = isSpread ? '0px 0px 10px rgba(0, 0, 0, 0.6)' : '0px 0px 10px #e3f5ff';
        const setting = this.props.setting;
        return (  
            <div 
            className={styles.setting_container} 
            style={{
                height:isSpread ? 'auto' : '5px',
                boxShadow,
            }}
            >
                <div 
                className={styles.setting_arrow}
                style={{boxShadow}}
                onClick={this.spreadBox}
                >
                    <Icon type={isSpread ? 'down' : 'up'}/>
                </div>
                <div className={styles.setting_content}>
                    <Row className={styles.setting_item}>
                        <Col span={15} style={{textAlign:'right'}}>滚动显示动效</Col>
                        <Col span={9}><Switch defaultChecked={setting.animationSwitch} onChange={this.changeAnimation}/></Col>
                    </Row>
                    <Row className={styles.setting_item}>
                        <Col span={15} style={{textAlign:'right'}}>兼容性emoji</Col>
                        <Col span={9}><Switch defaultChecked={setting.emojiSwitch} onChange={this.changeEmoji}/></Col>
                    </Row>
                    <Row className={styles.setting_item} style={{textAlign:'center',paddingLeft:'25px'}}>
                        (建议移动端关闭此选项)
                    </Row>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const {setting} = state.global;
	return {
        setting
	};
}
export default connect(mapStateToProps)(Setting);