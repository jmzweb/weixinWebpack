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

export default class MaterialBinding extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'资产物料绑定',
            msg:'',
            flag:true,
            checkSy:false,
            mData:{},
            _data:[
                {
                    id: 0,
                    name:'机模',
                    code:'WF212E2D6W5',
                    shopName:'teemo',
                    provDes:'北京市',
                    countyDes:'海淀区',
                    cityDes:'北京市',
                    address:'五道口',
                    bindingUser:'张龙',
                    telephone:'13888888888',
                },
                {
                    id: 1,
                    name:'机模',
                    code:'WF212E2D6W5',
                    shopName:'teemo',
                    provDes:'北京市',
                    countyDes:'海淀区',
                    cityDes:'北京市',
                    address:'五道口',
                    bindingUser:'张龙',
                    telephone:'13888888888',
                },
            ]
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
    };

    myFetch(){
        const {_data} = this.state;
        let $obj = {};
        _data.map((obj,index)=>{
            obj.id === this.props.params.mid ?
                $obj = _data[index]
                :
                ''
        })
        this.setState({
            mData:$obj,
        })
    }

    componentWillMount(){
        this.myFetch()
    }

    render(){

        console.log(this.state.msg);

        const {mData} = this.state;

        const arr = ['海报','彩页','表拖'];

        const checkbox = arr.map(obj=>
            <li className="modal-content-radio-item">
                <label htmlFor={obj.id}>
                    <span>{obj.name}</span>
                    <input id={obj.id} type="checkbox" name="sy" value={obj.id}/>
                    <span className="icon"></span>
                </label>
            </li>
        )

        return (
            <div className="big-scroll">
                <div className="container">
                    <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.state.lttile}</header>
                    {
                        this.state.lttile == '资产物料绑定' ?
                            (
                                <div>
                                    <div className="person-manage-detail-manage">
                                        <header>绑定资产</header>
                                        <ul>
                                            <li>{mData.name}</li>
                                        </ul>
                                    </div>
                                    <div className="person-manage-detail-manage">
                                        <header>物料编号</header>
                                        <ul>
                                            <li>{mData.code}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="person-manage-detail-manage">
                                    <header>绑定资产</header>
                                    <ul className="modal-content-radio" onChange={this.handleChange.bind(this)}>
                                        {checkbox}
                                    </ul>
                                </div>
                            )
                    }


                    <div className="person-manage-detail-manage">
                        <header>申请店铺</header>
                        <ul>
                            <li>{mData.shopName}</li>
                            <li>{`${mData.provDes} ${mData.cityDes} ${mData.countyDes}`}</li>
                            <li>{mData.address}</li>
                        </ul>
                    </div>
                    <div className="person-manage-detail-manage">
                        <header>物料绑定人</header>
                        <ul>
                            <li>{mData.bindingUser}</li>
                            <li>{mData.telephone}</li>
                        </ul>
                    </div>
                    <div className="inventory-btn-group">
                        <a className="inventory-btn" href="javascript:;" onClick={this.handleMakeSure.bind(this)}>提交申请</a>
                    </div>
                </div>
            </div>
        )
    }

}