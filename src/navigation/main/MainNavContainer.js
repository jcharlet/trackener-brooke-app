'use strict'

// React
import React from 'react'

// Navigation
import {addNavigationHelpers} from 'react-navigation'
import {MainNavNavigator} from "./MainNavConfiguration"

//Redux
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        navigationState: state.mainNav,
    }
}

class MainNavComponent extends React.Component {

    render() {
        const {dispatch, navigationState} = this.props
        return (
            <MainNavNavigator
                navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
            />
        )
    }
}
;

export default connect(mapStateToProps)(MainNavComponent);
