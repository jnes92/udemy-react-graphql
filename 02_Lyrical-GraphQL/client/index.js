import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import App from './components/App';

import './style/style.css';

const client = new ApolloClient({
  connectToDevTools: true,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client} >
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
