import React, {useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../actions';
import Loading from '../common/Loading';
import ReviewCard from '../ReviewCard';

const ReviewFeed = (props) => {
	const {feed, feedLoading, feedError} = useSelector(state => ({...state.letterboxd}));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getFeed());
	}, []);

	const renderBody = () => {
		if (feedError) {
			return (<span>{feedError.message || "There was an error"}</span>)
		}
		return (feedLoading ? (
			<Loading style={{ width: 100, height: 'auto' }} />
		) : (
			feed.sort((a, b) => b.publishedDate - a.publishedDate)
			).map((review, i) => <ReviewCard {... {key: i, ...review}} />)
		);
	}

	return (
		<Grid
			container
			justify={"center"}
		>
			<Grid
				item
			>
				{renderBody()}
			</Grid>
		</Grid>
	)
}

export default ReviewFeed;