import { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link'
import {Icon} from 'antd'
import styles from './Article.css'
import tools from '../../common/Tools'
import router from 'umi/router';

new Date().toLocaleDateString();
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
    render() {
        const article = this.props.article;
        const describe = article.article_describe 
                        ? article.article_describe
                        : article.article_content.slice(0,50) + '...' ;
        const tags = article.article_tags && article.article_tags.length > 0
                     ? article.article_tags.map((tag, index) => <a key={index} onClick={() => this.searchTag(tag.tagid)} className={styles.icons_tag}>{tag.tag.name}</a>)
                     : '暂无标签'
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
                    <span style={{cursor:'default'}}>标签: {tags}</span>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
	return {
	};
}
export default connect(mapStateToProps)(Article);