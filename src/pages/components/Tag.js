import { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './Tag.css'
class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {  
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
    render() { 
        const article_tags = this.props.article_tags
        console.log(article_tags);
        
        const tags = article_tags && article_tags.length > 0
                    ? article_tags.map((tag, index) => <a key={index} onClick={() => this.searchTag(tag.tagid)} className={styles.icons_tag}>{tag.tag.name}</a>)
                    : '暂无标签'
        return (  
            <div className={styles.tags_container}>
                <span className={styles.slash}>/</span>
                <span >标签: {tags}</span>
            </div>
        );
    }
}
function mapStateToProps(state) {
	return {
	};
}
export default connect(mapStateToProps)(Tag);