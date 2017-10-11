/**
 * Created by jiminze on 2017/9/1.
 */


//常见问题、


import React from 'react';
import IframeProblem from './url_frame';
import UrlFrameNext from './url_frame_next';
import './url_iframe.scss';
import back from '../../../../images/back.png';

export default class Problems extends React.Component{
    constructor(){
        super();
        this.state = {
            tip:true,
        }
    }

    tabClick = (e)=>{
        // console.log(e.target.innerHTML);
        e.target.innerHTML == '销售常见问题' ?
            this.setState({tip:true})
            :
            this.setState({tip:false})
    }

    render(){
        return (
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>常见问题</header>
                <ul className="problem-nav" onClick={this.tabClick}>
                    <li className={this.state.tip?'active':''}><a href="javascrip:;">销售常见问题</a></li>
                    <li className={this.state.tip?'':'active'}><a href="javascrip:;">产品常见问题</a></li>
                </ul>
                {
                    this.state.tip ?
                        (

                            <UrlFrameNext/>
                        )
                        :
                        (
                            <IframeProblem/>
                        )
                }
            </div>
        )
    }
}
