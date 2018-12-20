
import {getLimit} from '../../common/Tools';
export default {
	namespace: 'index',
	state: {
        limit: getLimit(),
        offset: 0,
		current: 0,
		count:0,
	},
	reducers: {
		changPageReducer(state, { payload:{ isNext } }) {
			let {limit, offset, current} = state;
			if(isNext == 1){
				//下一页
				current ++ ;
				offset += limit;
			}else{
				//上一页
				current --;
				offset -= limit;
			}
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
				count: Math.floor(count/state.limit)
			}
		}
	},
	effects: {
		*changPage({ payload }, { select, call, put }) {
			const isNext = payload.isNext;
			yield put({
				type:'changPageReducer',
				payload:{
					isNext
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
