import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import theme from './assets/theme';
import Container from './src/components/Container';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => (
	<div className="App">
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container />
			</ThemeProvider>
		</Provider>
	</div>
);
ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
	module.hot.accept();
}