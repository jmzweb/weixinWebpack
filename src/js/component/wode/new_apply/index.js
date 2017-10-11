/**
 * Created by jiminze on 2017/9/1.
 */

//新申请

import React from 'react';

export default class NewApply extends React.Component{

    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>新申请</header>
                <section>
                    <h3>申请物料</h3>
                    <ul>
                        <li><dl><dt><img/></dt><dd>资产物料</dd></dl></li>
                        <li><dl><dt><img/></dt><dd>其他物料</dd></dl></li>
                    </ul>
                </section>
            </div>
        )
    }

}