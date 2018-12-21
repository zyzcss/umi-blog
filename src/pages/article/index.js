import React,{ Component } from 'react';
import { connect } from 'dva';
import {getUrlString} from '../../common/Tools'
import request from '../../common/request.js'
import ArticleContent from '../components/ArticleContent'
import router from 'umi/router';

class Article extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const id = parseInt(getUrlString('id'),10);
        const {articles, dispatch} = this.props;
        const article = articles.find((article) =>
            article.id === id 
        );
        if(article){
            //存在 直接使用
            dispatch({
                type: 'global/setArticle',
                payload:{
                    article,
                }
            })
            /* request({
                method: 'GET',
                url: '/article/' + id,
            }); */
        }else{
            //ajax请求后台获取
            this.getArticle(id);
        }
    }
    async getArticle(id){
		const data = await request({
			method: 'GET',
			url: '/article/' + id,
        });
        if(data && data.data && !data.data.msg){
            this.props.dispatch({
                type: 'global/setArticle',
                payload:{
                    article:data.data
                }
            })
        }else{
            router.push('/404');
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch({
            type: 'global/setArticle',
            payload:{
                article:{
                    id:null,
                    article_title:'',
                    article_describe:'',
                    article_corver:'',
                    article_date:'',
                    article_tags:[],
                    article_comments:[],
                    article_content:'',
                    article_click:null,
                    messages:[],
                    comment:0
                },
            }
        })
    }
    render() { 
        const article = this.props.currentArticle;
        return (  
            <div>
                <ArticleContent article={article} />
            </div>
        );
    }
}
function mapStateToProps(state) {
	const { articles, currentArticle } = state.global;
	return {
        articles,
        currentArticle
	};
}
export default connect(mapStateToProps)(Article);
