/**
 * Created by jiminze on 2017/9/1.
 */

//审批

import React from 'react';
import Reqwest from 'reqwest';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import './store_style.scss';
import back from '../../../../images/back.png';

export default class Approval extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'审批',
            active:false,
            _data:[
                {
                    name:'物料申请：国美五道口',
                    text:'展柜，X展架，海报',
                    time:1507531109849,
                    status:0,
                },
                {
                    name:'物料申请：国美五道口',
                    text:'展柜，X展架，海报',
                    time:1507531109849,
                    status:1,
                },
                {
                    name:'物料申请：国美五道口',
                    text:'展柜，X展架，海报',
                    time:1507531109849,
                    status:0,
                }
            ],
            _totalData:[
                {
                    name:'物料申请：国美五道口',
                    text:'展柜，X展架，海报',
                    time:1507531109849,
                    status:0,
                },
                {
                    name:'物料申请：国美五道口',
                    text:'展柜，X展架，海报',
                    time:1507531109849,
                    status:1,
                },
                {
                    name:'物料申请：国美五道口',
                    text:'展柜，X展架，海报',
                    time:1507531109849,
                    status:0,
                }
            ],
        }
    }

    componentWillMount(){
        Reqwest({
            url:``,
            method:`get`,

        }).then(data=>{
            this.setState({
                // role:data.data.role,
            })
        })
    }

    handleAClick(e){
        console.log(e);
        this.setState({
            role:'temple'
        })

    }

    handleDetailFor(e){
        console.log(e);
        this.setState({
            lttile:e,
            role:'users'

        })
    }

    trueStatus(pth){
        switch (pth){
            case 0:
                return '审批';
                break;
            case 1:
                return '已审批';
                break;
        }
    }

    handleTureMenu = (obj)=>{
        const _data = this.state._totalData;
        const arr = [];
        if(obj.target.innerHTML == '现有店员名单'){
            _data.map(item=>{
                item.status === 0 ?
                    arr.push(item)
                    :
                    '';
            });
        }else{
            _data.map(item=>{
                arr.push(item)
            });
        }
        this.setState({
            _data:arr,
            active:!this.state.active,
        })

    }

    handleUserDetail = (key,obj)=>{
        location.href = `./#/wode/store/personmanagedetail/${key}`;
    }

    render(){

        const _data = this.state._data;

        const _children = _data.map(obj =>
            <div className="person-manage-item">
                <div className="person-manage-left">
                    <span>{obj.name}</span>
                    <span>{obj.text}</span>
                    <span>{obj.time}</span>
                </div>
                <div className="person-manage-right" onClick={this.handleUserDetail.bind(this,obj.code)}>
                    <span>{this.trueStatus(obj.status)}</span>
                    <span className="icon"></span>
                </div>
            </div>
        )

        return (
            <div className="big-scroll">
                <div className="container">
                    <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.state.lttile}</header>
                    <nav className="person-manage-menu">
                        <ul onClick={this.handleTureMenu.bind(this)}>
                            <li className={this.state.active?'active':''}><a href="javascript:;">待审批</a></li>
                            <li className={!this.state.active?'active':''}><a href="javascript:;">已审批</a></li>
                        </ul>
                    </nav>
                    <div className="person-manage-list">
                        {
                            _children
                        }
                    </div>
                </div>
            </div>
        )
    }

}