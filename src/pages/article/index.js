import React,{ Component } from 'react';
import { connect } from 'dva';
import Tools from '../../common/Tools'
import request from '../../common/request.js'
import ArticleContent from '../components/ArticleContent'
import router from 'umi/router';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {  
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
            }
        }
    }
    componentDidMount(){
        const id = parseInt(Tools.getUrlString('id'),10);
        const article = this.props.articles.find((article) =>
            article.id === id 
        );
        if(article){
            //存在 直接使用
            this.setState({
                article
            })
            request({
                method: 'GET',
                url: '/article/' + id,
            });
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
            this.setState({
                article:data.data
            })
        }else{
            router.push('/404');
        }
	}
    render() { 
        const article = this.state.article;
        return (  
            <div>
                <ArticleContent article={article} />
            </div>
        );
    }
}
function mapStateToProps(state) {
	const { articles } = state.global;
	return {
		articles,
	};
}
export default connect(mapStateToProps)(Article);
