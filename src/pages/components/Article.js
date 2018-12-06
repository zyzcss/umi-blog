import { Component } from 'react'
import styles from './Article.css'
import { connect } from 'dva';
import Link from 'umi/link'
import Tag from './Tag'
import ArticleInformation from './ArticleInformation'
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const article = this.props.article;
        const setting = this.props.setting;
        const describe = article.article_describe 
                        ? article.article_describe
                        : article.article_content.slice(0,50) + '...' ;
        return (  
            <div 
            className={setting.animationSwitch ? styles.container + " index-article" : styles.container + " index-article index-article-show"} 
            >
                <div className={styles.title} title={article.article_title}><Link to={`article?id=${article.id}`}>{article.article_title}</Link></div>
                {article.article_corver ?
                <Link to={`article?id=${article.id}`}><img className={styles.corver} src={article.article_corver} alt={article.article_title}/></Link>
                : ''}
                <div className={styles.describe}>{describe}</div>
                <div className={styles.icons}>
                    <ArticleInformation article={article} isLink={true}/>
                    <Tag article_tags={article.article_tags}/>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
	const { setting } = state.global;
	return {
        setting
	};
}
export default connect(mapStateToProps)(Article);