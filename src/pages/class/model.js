import request from '../../common/request';
export default {
	namespace: 'class',
	state: {
		searchLoadding:false,
		searchList:[],
		tags:[],
		minCount:-1,
        sumCount:-1,
	},
	reducers: {
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
	},
	effects: {
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
