import { createError, corsHeaders as headers } from '../utils';
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

export const actions = {
	postUserLogin,
	getUserInfo,
}