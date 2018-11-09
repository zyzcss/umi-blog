import React, { Component } from 'react'
import styles from './Footer.css'
class Foter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className={styles.footer}>
                <p>个人网站 纯属娱乐</p>
                <p>联系站长：yzdslloli@163.com</p>
            </div>
        );
    }
}
 
export default Foter;