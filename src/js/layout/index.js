import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import '../../style/layout.scss'

export default class Layout extends React.Component{

    render(){
        return(
            <CSSTransitionGroup
                component="div"
                transitionName="page"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={30}>
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </CSSTransitionGroup>
        )
    }

}
