import request from '../common/request';
import Tools from '../common/Tools'
let length = 0,
	offset = 0;
const limit = 5;
const localAnimationSwitch = localStorage.getItem('animationSwitch'); 
const localEmojiSwitch = localStorage.getItem('emojiSwitch'); 
const defaultEmojiSwitch = Tools.isPc() ? true : false;
export default {
	namespace: 'global',
	state: {
		articles:[],
		isLoadding: false,
		setting:{
			animationSwitch: localAnimationSwitch === null ? true : JSON.parse(localAnimationSwitch),
			emojiSwitch: localEmojiSwitch === null ? defaultEmojiSwitch : JSON.parse(localEmojiSwitch),
		}
	},
	reducers: {
		setArticles(state, { payload: { articles } }) {
			return {
				...state,
				articles: state.articles.concat(articles),
			}
		},
		setIsLoadding(state, { payload: { isLoadding } }){
			return{
				...state,
				isLoadding
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
		setMessage(state, { payload: { message, articleId } }){
			const articles = state.articles;
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
				type: 'setIsLoadding',
				payload: {
					isLoadding: true
				}
			});
			const response = yield call(request, {
				method: 'GET',
				url: `/articles?limit=${limit}&offset=${offset}`,
			});
			if(response['data'] && response['data'].length !== length){
				length = response['data'].length;
				yield put({
					type: 'setArticles',
					payload: {
						articles: response.data
					}
				});
				offset += limit;
			}
			yield put({
				type: 'setIsLoadding',
				payload: {
					isLoadding: false
				}
			});
		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
