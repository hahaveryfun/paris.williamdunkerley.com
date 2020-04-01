import Parser from 'rss-parser';
import {createError} from '../utils';

export const actionTypes = {
	GET_FEED_BEGIN: "GET_FEED_BEGIN",
	GET_FEED_SUCCESS: "GET_FEED_SUCCESS",
	GET_FEED_FAILURE: "GET_FEED_FAILURE",
}

const getFeedBegin = () => ({
	type: actionTypes.GET_FEED_BEGIN,
});

const getFeedSuccess = (payload) => ({
	type: actionTypes.GET_FEED_SUCCESS,
	payload,
});

const getFeedFailure = (payload) => ({
	type: actionTypes.GET_FEED_FAILURE,
	payload,
});

const getFeed = () => {
	return (dispatch) => {
		dispatch(getFeedBegin());
		const parser = new Parser();
		const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
		return parser.parseURL(`${CORS_PROXY}https://letterboxd.com/hahaveryfun/rss`)
			.then((response) => {
				dispatch(getFeedSuccess(response));
				return response;
			})
			.catch((error) => {
				dispatch(getFeedFailure(createError(error)));
				return error;
			});
	}
}

export const actions = {
	getFeed,
}