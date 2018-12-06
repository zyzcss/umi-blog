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
		searchLoadding:false,
		searchList:[],
		tags:[],
		minCount:-1,
		sumCount:-1,
		isLoadding: false,
		setting:{
			animationSwitch: localAnimationSwitch == null ? true : localAnimationSwitch,
			emojiSwitch: localEmojiSwitch == null ? defaultEmojiSwitch : localEmojiSwitch,
		}
	},
	reducers: {
		setArticles(state, { payload: { articles } }) {
			return {
				...state,
				articles: state.articles.concat(articles),
			}
		},
		search(state, { payload: { searchLoadding,searchList } }) {
			return {
				...state,
				searchLoadding,
				searchList
			}
		},
		setTags(state, { payload: { tags, minCount ,sumCount } }) {
			return {
				...state,
				tags, 
				minCount,
				sumCount
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
		*getSearch({payload}, { call, put }) {
			yield put({
				type: 'search',
				payload: {
					searchLoadding:true,
					searchList: []
				}
			});
			const response = yield call(request, {
				method: 'GET',
				url: '/searchTag/'+payload.id,
			});
			if(response['data']){
				yield put({
					type: 'search',
					payload: {
						searchLoadding:false,
						searchList: response.data
					}
				});
			}
		},
		*getTags(_, {call, put}){
			const response = yield call(request, {
				method: 'GET',
				url: `/hottags`,
			});
			if(response['data'] && response['data'].length > 0){
				const tags = response['data'];
				if(tags.length > 0){
					let min = tags[0]['count'],
						max = tags[0]['count'];
					for (let i in tags) {
						const tag = tags[i];
						const count = tag['count'];
						min = Math.min(count, min)
						max = Math.max(count, max)
					}
					yield put({
						type: 'setTags',
						payload: {
							tags:response['data'], 
							minCount:min,
							sumCount:max
						}
					});
				}
			}
		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
