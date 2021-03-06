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
            className={setting.animationSwitch ? styles.container + " index-article " + styles.article_home : styles.container + " index-article index-article-show "  + styles.article_home} 
            
            >
                <Link to={`article?id=${article.id}`}><div className={styles.title} title={article.article_title}>{article.article_title}</div></Link>
                {article.article_corver ?   
                    <Link to={`article?id=${article.id}`}>
                        <img 
                            className={styles.corver + ' ' + styles.corver_home} 
                            src={article.article_corver} 
                            title={article.article_title} 
                            alt={article.article_title}
                        />
                    </Link>: 
                    ''}
                <Link to={`article?id=${article.id}`}><div className={styles.describe} title={styles.describe}>{describe}</div></Link>
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