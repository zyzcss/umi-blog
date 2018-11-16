import React, { Component } from 'react'
import styles from './Header.css'
import router from 'umi/router';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isSpread:false,
            checkIndex:0
        }
    }
    changeCheck = (url,index) => {
        const locationUrl = window.location.href;
        if(url === locationUrl.slice(locationUrl.lastIndexOf('/'))){
            return;
        }
        router.push(url);
        this.setState({
            checkIndex:index
        })
    }
    componentDidUpdate(){
        console.log('====');
        
        const url = window.location.href;
        let defaultIndex = 0;
        switch(url.slice(url.lastIndexOf('/') + 1)){
            case '':
                defaultIndex = 0;
                break;
            case 'class':
                defaultIndex = 1;
                break;
            case 'works':
                defaultIndex = 2;   
                break;
            case 'about':
                defaultIndex = 3;
                break;
            default:
                defaultIndex = 4;
                break;
        }
        if(defaultIndex !== this.state.checkIndex){
            this.setState({
                checkIndex:defaultIndex
            })
        }
    }
    componentDidMount(){
        const _this = this;
        document.body.addEventListener('click',function(e){
            if(_this.state.isSpread){
                _this.setState({isSpread:false})
            }
        },false);
        this.refs.icon.addEventListener('click',function(e){
            e.stopPropagation();
            _this.setState({isSpread:!_this.state.isSpread})
        })
        const url = window.location.href;
        let defaultIndex = 0;
        switch(url.slice(url.lastIndexOf('/') + 1)){
            case '':
                defaultIndex = 0;
                break;
            case 'class':
                defaultIndex = 1;
                break;
            case 'works':
                defaultIndex = 2;   
                break;
            case 'about':
                defaultIndex = 3;
                break;
            default:
                defaultIndex = 4;
                break;
        }
        this.setState({
            checkIndex:defaultIndex
        })
        console.log('check:'+defaultIndex);
        
    }
    render() { 
        const {checkIndex, isSpread} = this.state;
        return (  
            <div className={styles.header}>
                <div className={styles.desktop}>
                    <span style={{fontSize:24}}>zyzcss</span>
                    <div className={styles.tags}>
                        <div>
                            <input type="radio" id="index" name="tags" checked={checkIndex === 0 ? 'checked' :''} onChange={() => this.changeCheck('/',0)}/>
                            <label htmlFor="index">首页</label>
                        </div>
                        <div>
                            <input type="radio" id="class" name="tags" checked={checkIndex === 1 ? 'checked' :''} onChange={() => this.changeCheck('/class',1)}/>
                            <label htmlFor="class">刨根究底</label>
                        </div>
                        <div>
                            <input type="radio" id="works" name="tags" checked={checkIndex === 2 ? 'checked' :''} onChange={() => this.changeCheck('/works',2)}/>
                            <label htmlFor="works">杂七杂八</label>
                        </div>
                        <div>
                            <input type="radio" id="about" name="tags" checked={checkIndex === 3 ? 'checked' :''} onChange={() => this.changeCheck('/about',3)}/>
                            <label htmlFor="about">关于</label>
                        </div>
                    </div>
                </div>
                <div className={styles.mobie}>
                    <div className={styles.menu_icon} ref="icon">
                        <div className={isSpread ? styles.linner + ' ' + styles.spread : styles.linner}></div>
                    </div>
                    <span style={{fontSize:24}}>zyzcss</span>
                    <div className={styles.menus} style={{maxHeight:isSpread ? 300 : 0}}>
                        <div 
                        className={checkIndex === 0 ? styles.menu + ' ' + styles.menu_check : styles.menu}
                        onClick={() => this.changeCheck('/',0)}
                        >
                            首页
                        </div>
                        <div 
                        className={checkIndex === 1 ? styles.menu + ' ' + styles.menu_check : styles.menu}
                        onClick={() => this.changeCheck('/class',1)}
                        >
                            刨根究底
                        </div>
                        <div 
                        className={checkIndex === 2 ? styles.menu + ' ' + styles.menu_check : styles.menu}
                        onClick={() => this.changeCheck('/works',2)}
                        >
                            杂七杂八
                        </div>
                        <div 
                        className={checkIndex === 3 ? styles.menu + ' ' + styles.menu_check : styles.menu}
                        onClick={() => this.changeCheck('/about',3)}
                        >
                            关于
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
