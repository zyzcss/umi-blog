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
        const article_tags = this.props.article_tags;
        const tags = article_tags && article_tags.length > 0
                    ? article_tags.map((tag, index) => 
                        <a key={index} onClick={() => this.searchTag(tag.tagid)} className={styles.icons_tag}>{tag.tag.name}</a>
                    )
                    : '暂无标签'
        return (  
            <React.Fragment>
                <div className={styles.row}></div>
                <span className={styles.slash} style={{cursor:'default'}}>/</span>
                <span style={{cursor:'default'}}>标签: </span>
                {tags}
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
	return {
	};
}
export default connect(mapStateToProps)(Tag);