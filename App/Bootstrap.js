import React, { Component } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { forget, gotoOnboardingOrLocked } from '../thunks';
import Navigator from './Navigation';
import NavigationService from './NavigationService';

class Bootstrap extends Component {
  componentDidMount() {
    AppState.addEventListener('change', nextAppState =>
      this.handleAppStateChange(nextAppState)
    );
    this.props.dispatch(gotoOnboardingOrLocked());
  }

  render() {
    return (
      <Navigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }

  handleAppStateChange(nextAppState) {
    if (nextAppState === 'background') {
      this.props.dispatch(forget());
      this.props.dispatch(gotoOnboardingOrLocked());
    }
  }
}

export default connect(
  ({ navigation, wallet }) => ({
    navigation,
    wallet
  }),
  dispatch => ({ dispatch })
)(Bootstrap);
