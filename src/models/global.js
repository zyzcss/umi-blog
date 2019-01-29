import request from '../common/request';
import {isPc, deepArrayFind} from '../common/tools'
const localAnimationSwitch = localStorage.getItem('animationSwitch'); 
const localEmojiSwitch = localStorage.getItem('emojiSwitch'); 
const defaultEmojiSwitch = isPc() ? true : false;
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
		},
		apps:[],
		isLoadding: false,/* 文章加载 */
	},
	reducers: {
		setArticles(state, { payload: { articles, count, limit, offset } }) {
			let allArticles = [...state.allArticles];
			for (let i = 0; i < articles.length; i++) {
				allArticles[i + offset] = articles[i];
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
			const currentArticle = state.currentArticle;
			let messages = currentArticle.messages;

			if(message.reply != null){
				//回复留言
				const targetMessage = deepArrayFind(messages, 'son', function(obj){
					return obj.id === message.reply
				})
				if(!targetMessage){
					window.location.reload();
				}
				if(targetMessage.son){
					targetMessage.son.push(message);
				}else{
					targetMessage.son = [message]
				}
			}else{
				//回复文章
				messages.push(message);
			}
			return{
				...state,
				currentArticle:{
					...currentArticle,
					messages:[...messages],
				}
			}
		},
		setArticle(state, { payload: { article } }) {
			return {
				...state,
				currentArticle: article,
			}
		},
		setIsLoadding(state, { payload: { isLoadding } }){
			return{
				...state,
				isLoadding
			}
		},
		setHasArticles(state, { payload: { limit, offset } }){
			const {allArticles} = state
			let articles;
			if(allArticles[offset]){
				articles = [...allArticles.slice(offset, offset + limit)];
			}else{
				articles = [];
			}
			return {
				...state,
				articles
			}
		},
		setApps(state, { payload:{ apps } }){
			return{
				...state,
				apps,
			}
		}
	},
	effects: {
		*getArticles({ payload = {} }, { select, call, put }) {
			const state = yield select(state => state.index);
			const {limit= state.limit, offset= state.offset} = payload;
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
			yield put({
				type: 'setHasArticles',
				payload:{
					limit,
					offset
				},
			});
			
			
			const response = yield call(request, {
				method: 'GET',
				url: `/articles?limit=${limit}&offset=${offset}`,
			});
			console.log(limit,offset,response);
			if(response.code === 200){
				const {articles, count} = response['data'];
				yield put({
					type: 'setArticles',
					payload: {
						...payload,
						articles,
						count ,
						offset
					}
				});
				yield put({
					type: 'index/setCount',
					payload: {
						count 
					}
				});
			}
			yield put({
				type: 'setIsLoadding',
				payload: {
					isLoadding: false
				}
			});
		},
		*getApps({ payload = {} }, { select, call, put }) {
			const response = yield call(request, {
				method: 'GET',
				url: `/apps`,
			});
			console.log(response);
			
			if(response.code === 200){
				yield put({
					type: 'setApps',
					payload: {
						apps: response['data']
					}
				});
			}
		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
