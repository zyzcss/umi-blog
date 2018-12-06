import React, { Component } from 'react'
import styles from './Switch.css'
class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            checked:this.props.defaultChecked
        }
    }
    onChange = () =>{
        const checked = !this.state.checked;
        this.setState({
            checked
        })
        this.props.onChange(checked);
    }
    render() { 
        const checked = this.state.checked;
        return (  
        <div className={styles.right}>
            <div 
                className={styles.wrapbox}
                onClick={this.onChange}
            ></div>
            <div className={styles.box}>
                <div 
                    className={styles.switch}
                    style={{
                        background:checked ? 'rgb(53, 134, 226)' : '#ccc',
                        borderColor:checked ? 'rgb(53, 134, 226)' : '#ccc'
                    }}
                ></div>
                <div 
                    className={styles.ball}
                    style={{
                        borderColor:checked ? 'rgb(53, 134, 226)' : '#ccc',
                        left:checked ? '15px' : '-5px'
                    }}
                ></div>
            </div>
        </div>
        );
    }
}
 
export default Switch;