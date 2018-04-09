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
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetInitialData());
  }

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <LoadingBar />
            <div className="container">
              <Navbar />
              {this.props.loading ? null : (
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
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
