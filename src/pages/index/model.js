
import {getLimit} from '../../common/tools';
export default {
	namespace: 'index',
	state: {
        limit: getLimit(),
        offset: 0,
		current: 0,
		count:0,
	},
	reducers: {
		changPageReducer(state, { payload:{ page } }) {
			let {limit, offset, current} = state;
			current = page - 1;
			offset = limit*current;
			offset = Math.max(offset, 0);
			current = Math.max(current, 0);
			return {
				...state,
				offset,
				current
			}
		},
		setCount(state, {payload: {count}}){
			return {
				...state,
				count: Math.ceil(count/state.limit) - 1
			}
		}
	},
	effects: {
		*changPage({ payload }, { select, call, put }) {
			const page = payload.page;
			yield put({
				type:'changPageReducer',
				payload:{
					page
				}
			})
			const state = yield select(state => state.index);
			const {limit, offset} = state;
            yield put({
                type:'global/getArticles',
                payload:{
                    limit,
                    offset
                }
            })
            
		},
		throwError() {
			throw new Error('hi error');
		},
	},
};
