import axios from 'axios';
import { notification } from 'antd';

/**
 * 一、功能：
 * 1. 统一拦截http错误请求码；
 * 2. 统一拦截业务错误代码；
 * 3. 统一设置请求前缀
 * |-- 每个 http 加前缀 baseURL = /api/v1，从配置文件中获取 apiPrefix
 * 4. 配置异步请求过渡状态：显示蓝色加载条表示正在请求中，避免给用户页面假死的不好体验。
 * |-- 使用 NProgress 工具库。
 * 
 * 二、引包：
 * |-- axios：http 请求工具库
 * |-- NProgress：异步请求过度条，在浏览器主体部分顶部显示蓝色小条
 * |-- notification：Antd组件 > 处理错误响应码提示信息
 * |-- routerRedux：dva/router对象，用于路由跳转，错误响应码跳转相应页面
 * |-- store：dva中对象，使用里面的 dispatch 对象，用于触发路由跳转
 */

// 设置全局参数，如响应超市时间，请求前缀等。
axios.defaults.timeout = 10000
/* axios.defaults.withCredentials = true; */

// 状态码错误信息
const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

/* axios.interceptors.request.use((config) => {
	return config;
}, (error) => {
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	return Promise.reject(error);
}); */

export default async function request(opt) {
	let response;
	try {
		response = await axios(opt)
			.then((response) => {
				console.log(response);
				return response['data'];
			})
			.catch((error) => {
				console.log(error);
				if (!error.response) {
					console.log('Error', error);
					notification.error({
						message: `发生错误`,
						description: '服务器出错，请稍后重试！或联系yzdslloli@163.com询问。',
					});
					return { code: 500, message: '服务器错误' };
				}
				const status = error.response.status;
				const errortext = codeMessage[status] || error.response.statusText;

				notification.error({
					message: `请求错误 ${status}`,
					description: errortext,
				});
				console.log(`[${opt.method} ${opt.url}]请求失败，响应数据：%o`, error.response);
				return { code: status, message: errortext };
			});;
		return response
	} catch (err) {
		console.log(err);
		return { code: 500, message: '服务器错误' };
	}
}