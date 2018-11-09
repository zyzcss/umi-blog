import { connect } from 'dva';
import { Component } from 'react'
import request from '../../common/request'
import Article from '../components/Article'
import Loadding from '../components/Loadding'
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
		window.scrollTo(0,0)
	}
	async axios(){
		const data = await request({
			method: 'GET',
			url: '/articles',
		});
	}
	render() {
		console.log('aritcles',this.props.articles);
		const articles = this.props.articles
		const Articles = articles.map((article,index) => 
			<Article article={article} key={index} />
		)
		return (
			<div>
				<div className="loadding-container">
					<Loadding loadding={!articles || articles.length == 0}/>
				</div>	
				{Articles}
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
export default connect(mapStateToProps)(App);
