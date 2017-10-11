/**
 * Created by jiminze on 2017/9/1.
 */


//常见问题、


import React from 'react';
import propType from 'prop-types';
import './url_iframe.scss';


export default class IframeProblem extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <iframe className="show-problem" src='http://x1.sogou.com/web/faqnew/question.html'></iframe>
        )
    }
}
