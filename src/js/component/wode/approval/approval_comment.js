/**
 * Created by jiminze on 2017/10/10.
 */

//审批评论

import React from 'react';

export default class ApprovalComment extends React.Component{
    constructor(){
        super();
    }

    handleAddSaoma = (obj)=>{
        console.log(obj);
    };

    render(){
        return (
            <div>
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>评论</header>
                <div>
                    <textarea placeholder="说点什么"></textarea>
                </div>
                <div>
                    <span>图片</span>
                    <span></span>
                </div>
                <div>
                    <span>附件</span>
                    <span></span>
                </div>
                <div className="inventory-btn-group inventory-btn-group-bottom">
                    <a className="inventory-btn" onClick={this.handleAddSaoma.bind(this)}>提交申请</a>
                </div>
            </div>
        )
    }
}