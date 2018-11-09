import React,{ Component } from 'react';
import {Icon} from 'antd'
import styles from './Article.css'
import tools from '../../common/Tools'
import emojione from 'emojione'
import { connect } from 'dva';
import router from 'umi/router';
import Message from './Message.js'
class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: false,
        }
        this.searchTag = this.searchTag.bind(this);

    }
    searchTag (id){
        const { dispatch } = this.props;
		dispatch({
            type: 'global/getSearch',
            payload:{
                id
            }
        });
        router.push('/class');
    }
    componentDidUpdate(){
        if(!this.state.isRender && this.props.article.id){
            const url = location.href.slice(location.href.lastIndexOf('#'))
            if(!url.startsWith('#message')){
                //没有message锚点
                //tools.scollToTop();
                window.scrollTo(0,0)
            }else{
                const target = document.getElementById(url.slice(1));
                if(target)tools.scollToTop(target);//target.scrollIntoView();
            }
            this.setState({
                isRender: true
            })
        }
    }
    scrollToMessage = (url) => {
        const target = document.getElementById(url);
        console.log(target);
        
        if(target)tools.scollToTop(target);//target.scrollIntoView();
    }
    render() {
        const article = this.props.article; 
        const describe = article.article_describe;
        const tags = article.article_tags && article.article_tags.length > 0
                     ? article.article_tags.map((tag, index) => <a key={index} onClick={() => this.searchTag(tag.tagid)} className={styles.icons_tag}>{tag.tag.name}</a>)
                     : '暂无标签';
        return (  
            <React.Fragment>
            <div className={styles.container}>
                <div className={styles.title} title={article.article_title}>{article.article_title}</div>
                {article.article_corver ? <img className={styles.corver} src={article.article_corver} alt={article.article_title}/> : ''}
                <div className={styles.describe}>{describe}</div>
                <div className={styles.describe} dangerouslySetInnerHTML={{__html:emojione.toImage(article.article_content)}}>
                </div>
                <div className={styles.icons}>
                    <span title="发布时间"><Icon type="clock-circle" theme="filled" />{tools.getDateString(article.article_date)}</span>
                    <span title="观看次数"><Icon type="fire" theme="filled" />{article.article_click}</span>
                    <span title="评论数" onClick={() => this.scrollToMessage('message')}><Icon type="smile" theme="filled" />{article.comment}</span>
                    <span style={{cursor:'default',verticalAlign:'1px'}}>/</span>
                    <span style={{cursor:'default'}}>标签: {tags}</span>
                </div>
            </div>
            <div className={styles.container} id="message">
                <div className={styles.title}>评论留言</div>
                <Message messages={article.messages}/>
            </div>
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
	return {
	};
}
export default connect(mapStateToProps)(ArticleContent);