import React, { Component } from 'react';
import styles from './App.css'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isIn: false
        }
    }
    onMouseIn = () =>{
        console.log('=in');
        
        this.setState({
            isIn: true
        })
    }
    onMouseOut = () =>{
        console.log('out');
        this.setState({
            isIn: false
        })
    }
    render() { 
        const {corver, name, url} = this.props.app;
        const {isIn} = this.state;
        return (  
            <a href={url} target="_blank">
                <div 
                    className={styles.app}
                    onMouseEnter={this.onMouseIn}
                    onMouseLeave={this.onMouseOut}
                >
                    <div 
                        className={styles.corver}
                    >
                        <div className={
                                isIn 
                                ? styles.ball + ' ' + styles.scaleAni 
                                : styles.ball
                            }>
                        </div>
                        <div className={
                                isIn 
                                ? styles.triangle + ' ' + styles.scaleAni 
                                : styles.triangle
                            }>
                        </div>
                        <div 
                            className={
                                isIn 
                                ? styles.border + ' ' + styles.border_top + ' ' + styles.rotateAni 
                                : styles.border + ' ' + styles.border_top
                            }
                        ></div>
                        <div 
                            className={
                                isIn 
                                ? styles.border + ' ' + styles.border_left + ' ' + styles.rotateAni 
                                : styles.border + ' ' + styles.border_left
                            }
                        ></div>
                        <div 
                            className={styles.corver_img}
                            style={{backgroundImage:'url('+ corver +')'}}
                        >
                        </div>
                    </div>
                    <div
                        className={styles.name}
                    >
                        {name}
                    </div>
                </div>
            </a>
        );
    }
}
 
export default App;