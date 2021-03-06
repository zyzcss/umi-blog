import { connect } from 'dva';
import React,{ Component } from 'react';
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
	changePage = (page) =>{
		const { dispatch } = this.props;
		dispatch({
			type: 'index/changPage',
			payload:{
				page
			}
		});
		window.scrollTo(0,0);
	}
	render() {
		const {articles, count, current, isLoadding} = this.props;
		const Articles = articles.map((article,index) => 
			<Article article={article} key={index} />
		)
		const loadding = !articles || articles.length === 0;
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
				{Articles}
				<Paging 
					changePage= {this.changePage}
					current= {current}
					count= {count}
					enabled= {!isLoadding}
				/>
			</React.Fragment>
		);
	}
}
function mapStateToProps(state) {
	const { articles, isLoadding } = state.global;
	const {count, current} = state.index;
	return {
		articles,
		current,
		count,
		isLoadding
	};
}
export default connect(mapStateToProps)(App);
