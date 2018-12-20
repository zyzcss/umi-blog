import { connect } from 'dva';
import { Component } from 'react';
import Article from '../components/Article';
import Loadding from '../components/Loadding';
import animation from '../../common/animation';
import Paging from '../components/Paging'
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch({
			type: 'global/getArticles'
		});
		window.scrollTo(0,0);
		animation.showScrollAnimation();
	}
	componentDidUpdate(preProp){
		if(preProp.articles.length !== this.props.articles.length){
			animation.showScrollAnimation();
		}
	}
	changePage = (isNext) =>{
		const { dispatch } = this.props;
		dispatch({
			type: 'index/changPage',
			payload:{
				isNext:isNext
			}
		});
		window.scrollTo(0,0);
	}
	render() {
		const {articles, count, current} = this.props;
		const Articles = articles.map((article,index) => 
			<Article article={article} key={index} />
		)
		const loadding = !articles || articles.length == 0;
		return (
			<div>
				<div 
					className="loadding-container" 
					style={{
						height: loadding ? '50px' : '0px'
					}}
				>
					<Loadding loadding={loadding}/>
				</div>	
				{Articles}
				<Paging 
					changePage= {(isNext) =>this.changePage(isNext)}
					current= {current}
					count= {count}
				/>
			</div>
		);
	}
}
function mapStateToProps(state) {
	const { articles } = state.global;
	const {count, current} = state.index;
	return {
		articles,
		current,
		count
	};
}
export default connect(mapStateToProps)(App);
