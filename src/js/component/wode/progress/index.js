/**
 * Created by jiminze on 2017/9/1.
 */


//申请进度
import React from 'react';
import './progress.scss';
import back from '../../../../images/back.png';

export default class Progress extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>申请进度</header>
                <div className="tip-msg">
                    进度模块还在努力建设中，请先浏览应用其他模块～～～～
                </div>
            </div>
        )
    }
}