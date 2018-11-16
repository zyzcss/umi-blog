import { Component } from 'react'
import Link from 'umi/link'
import tools from '../../common/Tools'
import {Icon} from 'antd'
class ArticleInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {  

        }
    }
    getIconDom = (dom, url) =>{
        if(url){
            return (
                <Link to={url}>
                    {dom}
                </Link>
            )
        }else{
            return (
                <React.Fragment>
                    {dom}
                </React.Fragment>
            )
        }
    }
    render() { 
        const article = this.props.article;
        const id = article.id;
        const isLink = this.props.isLink;
        const time = this.getIconDom(
            <React.Fragment>
                <Icon type="clock-circle" theme="filled" />{tools.getDateString(article.article_date)}
            </React.Fragment>,
            isLink ? `article?id=${id}` : ''
        )
        const click = this.getIconDom(
            <React.Fragment>
                <Icon type="fire" theme="filled" />{article.article_click}
            </React.Fragment>,
            isLink ? `article?id=${id}` : ''
        )
        const comments = this.getIconDom(
            <React.Fragment>
                <Icon type="smile" theme="filled" />{article.comment}
            </React.Fragment>,
            isLink ? `article?id=${id}#message` : ''
        )
        return (  
            <React.Fragment>
                <span title="发布时间">
                    {time}
                </span>
                <span title="观看次数">
                    {click}
                </span>
                <span title="评论数" onClick={() =>{
                    if(this.props.commentClick){
                        this.props.commentClick();
                    }
                }}>
                    {comments}
                </span>
            </React.Fragment>
        );
    }
}
 
export default ArticleInformation;