import { Component } from 'react';
import Link from 'umi/link'
import {Icon} from 'antd'
import styles from './Article.css'
import tools from '../../common/Tools'
import Tag from './Tag'
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const article = this.props.article;
        const describe = article.article_describe 
                        ? article.article_describe
                        : article.article_content.slice(0,50) + '...' ;
        return (  
            <div className={styles.container}>
                <div className={styles.title} title={article.article_title}><Link to={`article?id=${article.id}`}>{article.article_title}</Link></div>
                {article.article_corver ?
                <Link to={`article?id=${article.id}`}><img className={styles.corver} src={article.article_corver} alt={article.article_title}/></Link>
                : ''}
                <div className={styles.describe}>{describe}</div>
                <div className={styles.icons}>
                    <span title="发布时间"><Link to={`article?id=${article.id}`}><Icon type="clock-circle" theme="filled" />{tools.getDateString(article.article_date)}</Link></span>
                    <span title="观看次数"><Link to={`article?id=${article.id}`}><Icon type="fire" theme="filled" />{article.article_click}</Link></span>
                    <span title="评论数"><Link to={`article?id=${article.id}#message`}><Icon type="smile" theme="filled" />{article.comment}</Link></span>
                    <span style={{cursor:'default',verticalAlign:'1px'}}>/</span>
                    <Tag />
                </div>
            </div>
        );
    }
}

export default Article;