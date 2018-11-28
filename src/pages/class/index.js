import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './index.css'
import Article from '../components/Article'
import request from '../../common/request'
import Loadding from '../components/Loadding'
import ScrollReveal from 'scrollreveal';
const colorBoard = ['#6F706F','#559A3C','#F69997','#F36D6A','#FFE581','#FFE066','#5F9FB9','#3787A8','#8ACCC0','#70C1B3','#DC5754']
class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            searchText:'',
            searchEnd:false
        }
        this.search = this.search.bind(this)
        this.searchTag = this.searchTag.bind(this);
    }
    componentDidMount(){
        const { dispatch } = this.props;
		dispatch({
            type: 'global/getTags',
        });
        ScrollReveal().reveal('.index_article', { scale: 0.1 ,interval: 50});
    }
    changeSearch = (e) => {
        this.setState({
            searchText:e.target.value
        })
    }
    async search(){
        const searchText = this.state.searchText;
        if(!searchText && searchText.trim() === ''){
            return
        }
        const { dispatch } = this.props;
		dispatch({
            type: 'global/search',
            payload:{
                searchLoadding:true,
                searchList:[]
            }
        });
        this.setState({
            searchEnd:false
        })
        const response = await request({
			method: 'GET',
			url: `/search/${searchText}`,
        });
        if(response['data'] && response['data'].length > 0){
            dispatch({
                type: 'global/search',
                payload:{
                    searchLoadding:false,
                    searchList:response['data']
                }
            });
        }else{
            dispatch({
                type: 'global/search',
                payload:{
                    searchLoadding:false,
                    searchList:[]
                }
            });
            this.setState({
                searchEnd:true
            })
        }
    }
    async searchTag (id){
        this.setState({
            searchEnd:false
        })
        const { dispatch } = this.props;
		dispatch({
            type: 'global/getSearch',
            payload:{
                id
            }
		});
    }
    componentDidUpdate(preProp){
		if(preProp.searchList !== this.props.searchList && this.props.searchList.length > 0){
			ScrollReveal().reveal('.index_article', { scale: 0.1 ,interval: 50});
		}
	}
    render() { 
        const {searchFail,searchEnd} = this.state;
        const {searchList,searchLoadding, tags,minCount,sumCount} = this.props;
        const articles = searchList.map((article,index)=> <Article article={article} key={index}/>)
        const tagsWord = tags.map((tag) => {
            const multiple = (tag['count'] - minCount)/sumCount;
            return(<span key={tag['id']} 
                className={styles.tag} 
                style={{fontSize:multiple + 1 + 'em',color:colorBoard[Math.round(multiple*10)]}}
                onClick={() =>this.searchTag(tag['tag.id'])}
            >
                {tag['tag.name']}({tag['count']})
            </span>)
        }) 
        return ( 
            <React.Fragment> 
                <div className="common-content">
                    <div className="common-content-title">搜索文章</div>
                    <div className={styles.search}>   
                        <input 
                            type="text" 
                            className={styles.search_input} 
                            placeholder="请输入你要搜索的内容 空格区分关键词"
                            value={this.state.searchText}
                            onChange={(e) => this.changeSearch(e)}
                            onKeyPress={(e)=>{
                                if(e.key === 'Enter')this.search();
                            }}
                        />
                        <div className={styles.back1}></div>
                        <div className={styles.back2}></div>
                        <div className={styles.search_button} onClick={this.search}>搜索</div>
                    </div>
                    <div style={{marginTop:15}}>热门标签：</div>
                    <p className={styles.hottags}>
                        {tagsWord}
                    </p>
                </div>
                {searchEnd ? <div className={styles.search_nothing}>暂未搜索到相关内容</div> : ''}
                <div className="loadding-container" style={{height:50}}>
                    <Loadding loadding={searchLoadding} fail={searchFail}/>
                </div>
                {/* <Article article={{id: 18, article_title: "test ", 
                article_describe: "测试测试测试测试测试", article_corver: null, article_date: "2018-10-05T15:37:39.000Z",
                article_click:10,article_comment:null,article_content:"<p>😅😧<br></p><blockquote>笑就完事了</blockquote><p>测试测试测试</p>",article_corver:null,article_date:"2018-10-05T15:37:39.000Z",
                article_describe:"测试测试测试测试测试",article_tags:[],article_title:"test ",article_type:0,id:18}}></Article> */}
                {articles}
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
	const { searchLoadding,searchList,tags,minCount,sumCount } = state.global;
	return {
        searchLoadding,
        searchList,
        tags,
        minCount,
        sumCount
	};
}
export default connect(mapStateToProps)(Tag);
