import React, {Component} from 'react';
import loadable from '@loadable/component';
import {Affix, Alert, Layout} from "antd";
import {Route, Switch} from "react-router-dom";
import ReactGA from 'react-ga';
import {loggedInUser, logInUser, logInUserWithOtp, logOutUser,} from "./app/utils/auth";


const Auth = loadable(() => import('./app/components/auth/Auth'));
const AppBase = loadable(() => import('./app/components/core/AppBase'));

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-143616458-1');

    this.state = {
      user: loggedInUser(),
      redirect: false,
      production: (window.location.hostname == "clinic.bkarogyam.com")
    };


    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(data, withOtp = true) {
    const that = this;
    const successFn = function () {
      const user = loggedInUser();
      that.setState({
        user,
      });
    };
    const errorFn = function () {

    };
    if (withOtp)
      logInUser(data, successFn, errorFn);
    else
      logInUserWithOtp({...data}, successFn, errorFn)
  }

  logout() {
    const that = this;
    const successFn = function () {
      that.setState({
        user: null
      });
    };
    const errorFn = function () {
    };
    logOutUser(successFn, errorFn);
  }

  render() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    return (
      <Layout>
        {this.state.production ? null : (
          <Affix>
            <Alert
              message="Demo Version (Only for testing purposes)"
              banner
              closable
            />
          </Affix>
        )}
        <Switch>
          <Route exact path="/login" render={() => <Auth {...this.state} login={this.login} />} />
          <Route
            exact
            path="/password-reset/:token"
            render={(route) => <Auth {...route} {...this.state} login={this.login} />}
          />

          <Route render={(route) => (this.state.user ?
            <AppBase {...this.state} {...route} {...this.props} logout={this.logout} /> :
            <Auth {...this.state} login={this.login} />)}
          />
        </Switch>
      </Layout>
    )
  }
}

export default App;

