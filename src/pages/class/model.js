import request from '../../common/request';
import {getLimit} from '../../common/Tools';
const limit = getLimit();
export default {
	namespace: 'class',
	state: {
		searchLoadding:false,
		searchList:[],
		allSearchList:[],
		tags:[],
		searchEnd:false,
		minCount:-1,
		sumCount:-1,
        offset: 0,
		current: 0,
		count:0,
	},
	reducers: {
		search(state, { payload: { searchLoadding,allSearchList = [] } }) {
			const start = state.current * limit;
			return {
				...state,
				searchLoadding,
				searchList: allSearchList.slice(start, start + limit),
				allSearchList,
				count: Math.ceil(allSearchList.length / limit) - 1
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
		setSearchEnd(state, { payload: {searchEnd } }){
			return {
				...state,
				searchEnd
			}
		},
		changPage(state, { payload: {isNext}}){
			let current = state.current;
			if(isNext == 1){
				current++;
				current = Math.min(current, state.count);
			}else{
				current--;
				current = Math.max(current, 0);
			}
			const start = current * limit;
			console.log(current);
			
			return{
				...state,
				current,
				searchList: state.allSearchList.slice(start, start + limit),
			}
		}
	},
	effects: {
		*getSearch({payload}, { call, put }) {
			yield put({
				type: 'search',
				payload: {
					searchLoadding:true
				}
			});
			yield put({
				type: 'setSearchEnd',
				payload:{
					searchEnd:false
				}
			})
			const response = yield call(request, {
				method: 'GET',
				url: '/searchTag/'+payload.id,
			});
			if(response['data']){
				yield put({
					type: 'search',
					payload: {
						searchLoadding:false,
						allSearchList: response.data
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
		*getSearchByText({payload}, { call, put }) {
			const {searchText} = payload;
			console.log(searchText);
			yield put({
				type: 'search',
				payload: {
					searchLoadding:true
				}
			});
			yield put({
				type: 'setSearchEnd',
				payload:{
					searchEnd:false
				}
			})
			const response = yield call(request, {
				method: 'GET',
				url: `/search/${searchText}`,
			});
			let allSearchList = [];
			if(response['data'] && response['data'].length > 0){
				allSearchList = response['data']
			}else{
				yield put({
					type: 'setSearchEnd',
					payload:{
						searchEnd:true
					}
				})
			}
			yield put({
				type: 'search',
				payload:{
					searchLoadding:false,
					allSearchList
				}
			})
		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
