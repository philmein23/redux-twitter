import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import NewTweet from './NewTweet';
import { handleGetInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetInitialData());
  }

  render() {
    return (
      <div>
        <Router>
          <div className="container">
            <Navbar />
            {this.props.loading ? (
              <h1>Loading...</h1>
            ) : (
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/addtweet" component={NewTweet} />
                <Route
                  render={() => (
                    <h1 className="text-center">404 Error</h1>
                  )}
                />
              </Switch>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }) {
  return {
    loading: authedUser === null,
    users,
    tweets
  };
}

export default connect(mapStateToProps)(App);
