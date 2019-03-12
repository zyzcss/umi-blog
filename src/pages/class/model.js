import request from '../../common/request';
import {getLimit} from '../../common/tools';
const limit = getLimit();
let searchType = 'getSearch',
	_id = 0,
	_searchText = '';
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
		search(state, { payload: { searchLoadding,searchList = [], count = 0 } }) {
			const {offset} = state;
			let allSearchList = [...state.allSearchList];
			for (let i = 0; i < searchList.length; i++) {
				allSearchList[i + offset] = searchList[i];
			}
			return {
				...state,
				searchLoadding,
				searchList,
				allSearchList,
				count: Math.ceil(count / limit) - 1
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
		clearSearchData(state){
			return{
				...state,
				searchList: [],
				allSearchList: [],
				count: 0,
				offset: 0,
				current: 0,
			}
		},
		setPage(state, {payload: {page, offset}}){
			return{
				...state,
				current: page - 1,
				offset
			}
		},
		setHasSearchData(state){
			const {allSearchList, offset} = state
			let searchList;
			if(allSearchList[offset]){
				searchList = [...allSearchList.slice(offset, offset + limit)];
			}else{
				searchList = [];
			}
			return {
				...state,
				searchList,
				searchLoadding: searchList.length > 0 ? false : true
			}
		},
	},
	effects: {
		*getSearch({payload}, {select, call, put}) {
			const state = yield select(state => state.class);
			const {offset = 0} = state;
			//记录信息
			_id = payload.id;
			if(!payload.clear){
				searchType = 'getSearch';
			}
			//发出请求
			const response = yield call(request, {
				method: 'GET',
				url: `/searchTag/${payload.id}?limit=${limit}&offset=${offset}`,
			});
			yield put({
				type: 'getResponseData',
				payload: {
					response
				}
			});
		},
		*getTags(_, {call, put}){
			const response = yield call(request, {
				method: 'GET',
				url: `/hottags`,
			});
			if(response.code === 200){
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
		*getSearchByText({payload}, {select, call, put }) {
			const state = yield select(state => state.class);
			const {offset = 0} = state;
			_searchText = payload.searchText;
			if(!payload.clear){
				searchType = 'getSearchByText';
			}
			//发出请求
			const response = yield call(request, {
				method: 'GET',
				url: `/search/${payload.searchText}?limit=${limit}&offset=${offset}`,
			});
			yield put({
				type: 'getResponseData',
				payload: {
					response
				}
			});
		},
		*getResponseData({payload}, {put}){
			const {response} = payload;
			//请求成功后更新数据，如果搜索结果为空或者失败显示无搜索结果状态
			if(response.code === 200){
				yield put({
					type: 'search',
					payload: {
						searchLoadding:false,
						searchList: response.data['articles'],
						count: response.data['count']
					}
				});
				if(response.data['articles'].length === 0){
					yield put({
						type: 'setSearchEnd',
						payload:{
							searchEnd:true
						}
					})
				}
			}else{
				yield put({
					type: 'setSearchEnd',
					payload:{
						searchEnd:true
					}
				})
			}
		},
		*searchStateChange({payload}, {put}){
			//加载开始
			yield put({
				type: 'search',
				payload: {
					searchLoadding:true
				}
			});
			//清空和调用缓存
			if(payload.clear){
				yield put({
					type: 'clearSearchData',
				});
			}else{
				searchType = 'getSearch';
				yield put({
					type: 'setHasSearchData',
				})
			}
			//清空无搜索结果状态
			yield put({
				type: 'setSearchEnd',
				payload:{
					searchEnd:false
				}
			})
			yield put({
				type: searchType,
				payload
			})
		},
		*changPage({payload:{page}}, {put}){
			yield put({
				type: 'setPage',
				payload: {
					page,
					offset: Math.max(limit*(page - 1), 0)
				}
			});
			yield put({
				type: 'searchStateChange',
				payload: {
					searchText:_searchText,
					id:_id
				}
			});

		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
