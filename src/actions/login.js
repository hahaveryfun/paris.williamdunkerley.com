import { createError } from '../utils';
import axios from 'axios';

export const actionTypes = {
	POST_USERLOGIN_BEGIN: "POST_USERLOGIN_BEGIN",
	POST_USERLOGIN_SUCCESS: "POST_USERLOGIN_SUCCESS",
	POST_USERLOGIN_FAILURE: "POST_USERLOGIN_FAILURE",
	GET_USERINFO_BEGIN: "GET_USERINFO_BEGIN",
	GET_USERINFO_SUCCESS: "GET_USERINFO_SUCCESS",
	GET_USERINFO_FAILURE: "GET_USERINFO_FAILURE",
}

const postUserLoginBegin = () => ({
	type: actionTypes.POST_USERLOGIN_BEGIN,
});

const postUserLoginSuccess = (payload) => ({
	type: actionTypes.POST_USERLOGIN_SUCCESS,
	payload,
});

const postUserLoginFailure = (payload) => ({
	type: actionTypes.POST_USERLOGIN_FAILURE,
	payload,
});

const postUserLogin = (payload) => {
	return (dispatch) => {
		dispatch(postUserLoginBegin());
		return axios.post(`${process.env.API_BASE}/user/login`, payload)
			.then((response) => {
				localStorage.setItem('access_token', response.data.access_token);
				localStorage.setItem('refresh_token', response.data.refresh_token);
				dispatch(postUserLoginSuccess(response.data));
				return response;
			})
			.catch((error) => {
				dispatch(postUserLoginFailure(createError(error)));
				return error;
			})
	}
};

const getUserInfoBegin = () => ({
	type: actionTypes.GET_USERINFO_BEGIN,
});

const getUserInfoSuccess = (payload) => ({
	type: actionTypes.GET_USERINFO_SUCCESS,
	payload,
});

const getUserInfoFailure = (payload) => ({
	type: actionTypes.GET_USERINFO_FAILURE,
	payload,
});

const getUserInfo = () => {
	return (dispatch) => {
		dispatch(getUserInfoBegin());
		return axios.get(`${process.env.API_BASE}/user/info`, { 
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('access_token')}`
			}
		})
			.then((response) => {
				dispatch(getUserInfoSuccess(response.data));
				return response;
			})
			.catch((error) => {
				dispatch(getUserInfoFailure(createError(error)));
				return error;
			})
	}
};

// const validateAccessToken = () => {
// 	return (dispatch) => {
// 		return axios.get(`${process.env.API_BASE}/user/info`, {
// 			headers: {
// 				'Authorization': `Bearer ${localStorage.getItem('access_token')}`
// 			}
// 		})
// 			.then((response) => {
// 				return response;
// 			})
// 			.catch((error) => {
// 				return error;
// 			});
// 	}
// }

// const refreshAccessToken = () => {
// 	return async (dispatch) => {
// 		try {
// 			const reponse = await axios.get(`${process.env.API_BASE}/user/token/refresh`, {
// 				headers: {...headers(localStorage.getItem('refresh_token'))}
// 			});
// 		}
// 		catch (error) {
// 			//
// 		}
// 		return 'done';
// 	}
// }

// const redirectToLogin = () => {
// 	//dispatch true to "redirect to login page action"
// 	//dispatch false to "redirect to login page action" 
// }

export const actions = {
	postUserLogin,
	getUserInfo,
}