/**
 * Created by jiminze on 2017/10/9.
 */


//待审批  已审批

import React from 'react';

export default class ApprovalDetail extends React.Component{

    constructor(){
        super();
        this.state={
            data: {
                id: 0,
                name: '国美中关村店',
                prov: '北京',
                city: '北京',
                county: '海淀区',
                address: '中关村东路 华泰大厦1200号',
                applyname: '刘文昌',
                apply_tel: '13834168850',
                apply_time: 1507531109849,
                apply_sth: [
                    {name: 'X展架', count: 10},
                    {name: '机膜', count: 100},
                    {name: '彩页', count: 500}
                ],
                comment:[
                    {
                        name:'赵文丽',
                        approval:0,
                        time:1507531109849,
                    }
                ]
            }

        }
    }


    render(){

        return (
            <div>
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.props.param.td==0?'已审批':'待审批'}</header>
                <div>
                    {/*信息*/}
                    <div><span>店铺名称：</span></div>
                    <div><span>省市区：</span></div>
                    <div><span>地址：</span></div>
                    <div><span>申请人：</span></div>
                    <div><span>联系电话：</span></div>
                    <div><span>申请时间：</span></div>
                </div>
                <div>
                    {/*物料*/}
                    <header>物料：</header>
                    <div>
                        <ul>
                            <li>
                                <span></span>
                                <div>
                                    <span></span>
                                    <span><input placeholder=""/></span>
                                    <span></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    {/*评论*/}
                    <div>
                        {/*对勾*/}
                        <span></span>
                        <div>
                            {/*圆圈*/}
                            <span></span>
                            <div>
                                <p>赵文丽</p>
                                <p>发起申请</p>
                            </div>
                            <div>
                                <span>2017.06.20</span>
                                <span>详情</span>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    {
                        this.props.param.td==0 ?
                            (
                                <div><a>评论</a></div>
                            )
                            :
                            (
                                <ul>
                                    <li><a>修改</a></li>
                                    <li><a>拒绝</a></li>
                                    <li><a>同意</a></li>
                                    <li><a>评论</a></li>
                                </ul>
                            )
                    }

                </footer>
            </div>
        )

    }
}