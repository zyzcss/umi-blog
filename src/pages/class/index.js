import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './index.css'
import animation from '../../common/animation';
import Article from '../components/Article'
import Loadding from '../components/Loadding'
import Paging from '../components/Paging'
const colorBoard = ['#6F706F','#559A3C','#F69997','#F36D6A','#FFE581','#FFE066','#5F9FB9','#3787A8','#8ACCC0','#70C1B3','#DC5754']
class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            searchText:'',
        }
        this.search = this.search.bind(this)
        this.searchTag = this.searchTag.bind(this);
    }
    componentDidMount(){
        const { dispatch } = this.props;
		dispatch({
            type: 'class/getTags',
        });
        animation.showScrollAnimation();
    }
    changeSearch = (e) => {
        this.setState({
            searchText:e.target.value
        })
    }
    search(){
        const searchText = this.state.searchText;
        if(!searchText && searchText.trim() === ''){
            return
        }
        const { dispatch } = this.props;
		dispatch({
            type: 'class/getSearchByText',
            payload:{
                searchText
            }
        });
    }
    searchTag (id){
        const { dispatch } = this.props;
		dispatch({
            type: 'class/getSearch',
            payload:{
                id
            }
		});
    }
    changePage = (isNext) =>{
        const { dispatch } = this.props;
		dispatch({
			type: 'class/changPage',
			payload:{
				isNext
			}
		});
		window.scrollTo(0,200);
    }
    componentDidUpdate(preProp){
		if(preProp.searchList !== this.props.searchList && this.props.searchList.length > 0){
            animation.showScrollAnimation();
		}
	}
    render() { 
        const {searchFail} = this.state;
        const {searchList, searchLoadding, tags, minCount, sumCount, current, count, searchEnd} = this.props;
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
        console.log('==',current,count);
        
        return ( 
            <React.Fragment> 
                <div className="common-content">
                    <div className="common-content-title">搜索文章</div>
                    <div className={styles.search}>   
                        <input 
                            type="text" 
                            className={styles.search_input} 
                            placeholder="空格区分关键词"
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
                <div className="loadding-container" style={{height:50,marginTop:20,marginBottom:0}}>
                    <Loadding loadding={searchLoadding} fail={searchFail}/>
                </div>
                {articles}
                <Paging 
                    changePage= {(isNext) =>this.changePage(isNext)}
					current= {current}
					count= {count}
                />
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
	const { searchLoadding, searchList, tags, minCount, sumCount, current, count, searchEnd} = state.class;
	return {
        searchLoadding,
        searchList,
        tags,
        minCount,
        sumCount,
        current,
        count,
        searchEnd
	};
}
export default connect(mapStateToProps)(Tag);
