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

const arr = [
    {
        id:0,
        name:'在职中',
        checkArr:false,
    },
    {
        id:1,
        name:'调离',
        checkArr:false,
    },
    {
        id:2,
        name:'离职',
        checkArr:false,
    }
];

export default class PersonnelManagementDetail extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'人员管理',
            msg:'',
            flag:true,
            checkSy:false,
            _data:[
                {
                    id:0,
                    name:'在职中',
                    checkArr:false,
                },
                {
                    id:1,
                    name:'调离',
                    checkArr:false,
                },
                {
                    id:2,
                    name:'离职',
                    checkArr:false,
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

    manageCheck = ()=>{
        this.setState({flag:false})
    }

    handleMakeSure = ()=>{
        this.setState({flag:true})
    }

    handleChange = (obj)=>{
        console.log(obj.target.value);
        const {_data} = this.state;
        let msg = '';
        _data.map(item=>{
            if(item.id == obj.target.value){

                msg = item.name;
                item.checkArr = true;

            }
        });
        this.setState({msg,_data})
    }

    render(){

        console.log(this.state.msg);

        const _data = this.state._data;

        const child = _data.map(obj=>
            <li className="modal-content-radio-item">
                <label htmlFor={obj.id}>
                    <span>{obj.name}</span>
                    <input id={obj.id} type="radio" name="sy" value={obj.id} checked={obj['checkArr']}/>
                    <span className="icon"></span>
                </label>
            </li>
        )

        const manageChild = this.state.flag ?
                (
                    <div className="container">
                        <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.state.lttile}</header>
                        <div className="person-manage-detail">
                            <ul>
                                <li><span>员工姓名：</span></li>
                                <li><span>员工编号：</span></li>
                                <li><span>身份证：</span></li>
                                <li><span>省市区：</span></li>
                                <li><span>加盟时间：</span></li>
                                <li><span>移除时间：</span></li>
                            </ul>
                        </div>
                        <div className="person-manage-detail-manage">
                            <header>员工管理</header>
                            <ul>
                                <li><span className="title">手机号</span><span className="content"></span></li>
                                <li><span className="title">在职位管理</span><a className="content" href="javascript:;" onClick={this.manageCheck.bind(this)}>{this.state.msg===''?'请填写':this.state.msg}<span className="icon"></span></a></li>
                            </ul>
                        </div>
                    </div>
                )
                :
                (
                    <div className="container">
                        <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>员工管理</header>
                        <div className="modal-content">
                            <h3 className="modal-content-header">修改员工在职状态</h3>
                            <ul className="modal-content-radio" onChange={this.handleChange.bind(this)}>
                                {child}
                            </ul>
                        </div>
                        <div className="inventory-btn-group">
                            <a className="inventory-btn" href="javascript:;" onClick={this.handleMakeSure.bind(this)}>确定</a>
                        </div>
                    </div>
                );
        return (
            <div className="big-scroll">
                {manageChild}
            </div>
        )
    }

}