/**
 * Created by jiminze on 2017/10/10.
 */

import React from 'react';

export default class ApprovalCommentDetail extends React.Component{
    constructor(){
        super();
    }

    handleBack = (obj)=>{
        console.log(obj);
        window.history.go(-1);
    }
    render(){
        return (
            <div>
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>详情</header>
                <div>
                    <div>
                        <ul>
                            <li><span>修改人：</span></li>
                            <li><span>修改时间：</span></li>
                            <li><span>X展架：</span></li>
                            <li><span>彩页：</span></li>
                            <li><span>机膜：</span></li>
                        </ul>
                    </div>
                    <div>
                        <span>评论：</span>
                        <div>
                            <article>
                                你的地址填写错误，请重新编辑申请你的地址填写错误，你的地址填写错误，请重新编辑申请你的地址填写错误！
                            </article>
                            <ul>
                                <li><img/></li>
                                <li><img/></li>
                            </ul>
                        </div>
                    </div>
                    <div className="inventory-btn-group inventory-btn-group-bottom">
                        <a className="inventory-btn" onClick={this.handleBack.bind(this)}>返回</a>
                    </div>
                </div>
            </div>
        )
    }
}

