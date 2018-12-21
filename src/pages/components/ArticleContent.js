import React,{ Component } from 'react';
import styles from './Article.css'
import {scollToTop} from '../../common/Tools'
import emojione from 'emojione'
import { connect } from 'dva';
import Message from './Message.js'
import Tag from './Tag.js'
import ArticleInformation from './ArticleInformation'
class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: false,
        }
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
                if(target)scollToTop(target);//target.scrollIntoView();
            }
            this.setState({
                isRender: true
            })
        }
    }
    scrollToMessage = (url) => {
        const target = document.getElementById(url);
        if(target)scollToTop(target);//target.scrollIntoView();
    }
    render() {
        const article = this.props.article; 
        const describe = article.article_describe;
        const emojiSwitch = this.props.emojiSwitch;
        return (  
            <React.Fragment>
            <div className={styles.container}>
                <div className={styles.title} title={article.article_title}>{article.article_title}</div>
                {article.article_corver ? <img className={styles.corver} src={article.article_corver} alt={article.article_title}/> : ''}
                <div className={styles.describe}>{describe}</div>
                <div 
                    className={styles.describe} 
                    dangerouslySetInnerHTML={{
                        __html:emojiSwitch ? emojione.toImage(article.article_content) : article.article_content
                    }}
                    >
                </div>
                <div className={styles.icons}>
                    <ArticleInformation article={article} commentClick={() => this.scrollToMessage('message')}/>
                    <Tag article_tags={article.article_tags}/>
                </div>
            </div>
            <div className={styles.container} id="message">
                <div className={styles.title}>评论留言</div>
                <Message messages={article.messages} articleId={article.id}/>
            </div>
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
    const {setting} = state.global;
	return {
        emojiSwitch:setting.emojiSwitch
	};
}
export default connect(mapStateToProps)(ArticleContent);