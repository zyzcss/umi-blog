import request from '../common/request';
import Tools from '../common/Tools'
let offset = 5;
const limit = 5;
const localAnimationSwitch = localStorage.getItem('animationSwitch'); 
const localEmojiSwitch = localStorage.getItem('emojiSwitch'); 
const defaultEmojiSwitch = Tools.isPc() ? true : false;
export default {
	namespace: 'global',
	state: {
		articles:[],
		currentArticle:{
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
		allArticles:[],
		setting:{
			animationSwitch: localAnimationSwitch === null ? true : JSON.parse(localAnimationSwitch),
			emojiSwitch: localEmojiSwitch === null ? defaultEmojiSwitch : JSON.parse(localEmojiSwitch),
		}
	},
	reducers: {
		setArticles(state, { payload: { articles, count } }) {
			let allArticles = state.allArticles;
			if(limit + offset >= count){
				//头+尾
				allArticles = [...allArticles.slice(0, offset), ...articles]
			}else{
				//头+中+尾
				allArticles = [...allArticles.slice(0, offset), ...articles, ...allArticles.slice(offset + limit)] 
			}
			return {
				...state,
				articles,
				allArticles
			}
		},
		setSetting(state, { payload: { setting } }){
			return{
				...state,
				setting:{
					...state.setting,
					...setting
				}
			}
		},
		setMessage(state, { payload: { message } }){
			/* const articles = state.articles;
			const articleIndex = articles.findIndex((article)=> article.id = articleId);
			const article = {...articles[articleIndex]};
			console.log(article,articleIndex,articleId,articles);
			let messages = article.messages;
			
			if(message.reply != null){
				const targetMessage = Tools.deepArrayFind(messages, 'son', function(obj){
					return obj.id == message.reply
				})
				if(targetMessage.son){
					targetMessage.son.push(message);
				}else{
					targetMessage.son = [message]
				}
			}else{
				console.log('====');
				messages = [...messages,message]
			}
			article.messages = messages;
			return{
				...state,
				articles:[...articles.slice(0, articleIndex), article, ...articles.slice(articleIndex + 1)]
			} */
			const currentArticle = state.currentArticle;
			let messages = currentArticle.messages;
			
			if(message.reply != null){
				//回复留言
				const targetMessage = Tools.deepArrayFind(messages, 'son', function(obj){
					return obj.id == message.reply
				})
				if(targetMessage.son){
					targetMessage.son.push(message);
				}else{
					targetMessage.son = [message]
				}
			}else{
				//回复文章
				messages = [...messages,message]
			}
			return{
				...state,
				currentArticle:{
					...currentArticle,
					messages,
				}
			}
		},
		setArticle(state, { payload: { article } }) {
			return {
				...state,
				currentArticle: article,
			}
		},
		setHasArticles(state){
			console.log('===');
			
			const {allArticles} = state
			let articles;
			if(allArticles[offset]){
				articles = allArticles.slice(offset, limit)
			}else{
				articles = [];
			}
			return {
				...state,
				articles
			}
		}
	},
	effects: {
		*getArticles(_, { select, call, put }) {
			const isLoadding = yield select(state => state.global.isLoadding);
			if(isLoadding){
				return;
			}
			yield put({
				type: 'setHasArticles',
			});
			const response = yield call(request, {
				method: 'GET',
				url: `/articles?limit=${limit}&offset=${offset}`,
			});
			if(response['data']){
				const {articles, count} = response.data;
				yield put({
					type: 'setArticles',
					payload: {
						articles,
						count 
					}
				});
				offset += limit;
			}
		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
