import React, { Component } from 'react'
import {Icon} from 'antd'
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
    render() { 
        const {isSpread} = this.state;
        const boxShadow = isSpread ? '0px 0px 10px rgba(0, 0, 0, 0.6)' : '0px 0px 10px #e3f5ff';
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
                    <div className={styles.setting_item}>
                        动画效果 <Switch />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Setting;