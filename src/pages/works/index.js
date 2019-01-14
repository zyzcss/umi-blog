import React, { Component } from 'react'
import { connect } from 'dva';
import Loadding from '../components/Loadding'
import Article from '../components/Article'
class Works extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            works:[]
        }
    }
    componentDidMount(){
        const { dispatch } = this.props;
		dispatch({
			type: 'global/getArticles'
		});
       /*  const articles = this.props.articles;
        if(!articles || articles.length == 0){
            //加载
            const { dispatch } = this.props;
            dispatch({
                type: 'global/getArticles'
            });
        }else{
            //直接过滤使用
            this.setState({
                works:articles.filter((article) => article.article_type === 1)
            })
        } */
    }
    render() { 
        const articles = this.props.articles;
        const works = articles.filter((article) => article.article_type === 1);
		const Articles = works.map((article,index) => 
			<Article article={article} key={index} />
        )
        const loadding = !this.props.articles || this.props.articles.length === 0;
        return ( 
            <React.Fragment> 
                <div 
                    className="loadding-container"
                    style={{
						height: loadding ? '50px' : '0px'
					}}
                    >
                    <Loadding loadding={loadding}/>
                </div>
                {!works || works.length === 0 && this.props.articles.length > 0 
                ?
                (<div className="common-content">
                    <div className="common-content-title">未搜索到相关数据</div>
                </div>)
                :Articles
                }
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
	const { articles } = state.global;
	return {
		articles,
	};
}
export default connect(mapStateToProps)(Works);
