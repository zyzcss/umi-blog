import React, { Component } from 'react'
import styles from './Switch.css'
class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
        <div className={styles.right}>
            <label htmlFor="check"></label>
            <input id="check" type="checkbox" />
            <div className={styles.box}>
                <div className={styles.switch}></div>
                <div className={styles.ball}></div>
            </div>
        </div>
        );
    }
}
 
export default Switch;