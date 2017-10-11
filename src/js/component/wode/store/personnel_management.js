/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';
import Reqwest from 'reqwest';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import './store_style.scss';
import back from '../../../../images/back.png';

export default class PersonnelManagement extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'人员管理',
            active:false,
            _data:[
                {
                    name:'李孝利',
                    code:652712,
                    status:0,
                },
                {
                    name:'李孝利',
                    code:652713,
                    status:1,
                },
                {
                    name:'李孝利',
                    code:652714,
                    status:2,
                }
            ],
            _totalData:[
                {
                    name:'李孝利',
                    code:652712,
                    status:0,
                },
                {
                    name:'李孝利',
                    code:652713,
                    status:1,
                },
                {
                    name:'李孝利',
                    code:652714,
                    status:2,
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
                return '在职';
                break;
            case 1:
                return '离职';
                break;
            case 2:
                return '调离';
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
                    <span>员工编号：{obj.code}</span>
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
                            <li className={this.state.active?'active':''}><a href="javascript:;">现有店员名单</a></li>
                            <li className={!this.state.active?'active':''}><a href="javascript:;">历史店员名单</a></li>
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