/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';
import Reqwest from 'reqwest';
import Teemo from '../../lib/page';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import './store_style.scss';
import back from '../../../../images/back.png';

const teem =  new Teemo();

export default class MaterialManagement extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'物料管理',
            active:1,
            _data:[
                {
                    id:0,
                    name:'展柜',
                    time:1505962159188,
                    code:'7644kk',
                    status:0,
                },
                {
                    id:0,
                    name:'展柜',
                    time:1505962159188,
                    code:'7644kk',
                    status:1,
                },
                {
                    id:1,  //资产物料，还是其他物料
                    name:'海报',
                    time:1505962159188,
                    code:'7644kk',
                    status:1, //是否是申请中
                }
            ],
            _totalData:[
                {
                    id:0,
                    name:'展柜',
                    time:1505962159188,
                    code:'7644kk',
                    status:0,
                },
                {
                    id:0,
                    name:'展柜',
                    time:1505962159188,
                    code:'7644kk',
                    status:1,
                },
                {
                    id:1,
                    name:'海报',
                    time:1505962159188,
                    code:'7644kk',
                    status:1,
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

    handleTureMenu = (key,obj)=>{
        const _data = this.state._totalData;
        const arr = [];
        switch (key){
            case 1:

                break;
            case 2:
                break;
            case 3:
                break;
        }
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
        _data.map(item=>{
            if(obj.target.innerHTML){}
        });
        this.setState({
            _data:arr,
            active:key,
        })

    }

    handleUserDetail = (key,obj)=>{
        location.href = `./#/wode/store/personmanagedetail/${key}`;
    }

    //微信方面
    handleAddSaoma(){

        teem.wxConfig([
            'scanQRCode',
            'hideOptionMenu',
            'closeWindow',
        ]);
        wx.ready(()=>{
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var _result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    const result = isNaN(parseFloat(_result)) ? _result.split(',')[1] : _result;
                    if(result === ''){
                        location.href = './#/saoerr';
                    }else{
                        Reqwest({
                            url:`${teem.get('accessToke')}/wx/sell/comp_sn`,
                            method: 'post',
                            type: 'json',
                            data:{
                                sn:result,
                            }
                        }).then((data) => {
                            if(data.code === 0){
                                teem.set('sn',result);
                                teem.set('sn_time',teem.formatDateTime(Date.parse(new Date())));
                                location.href = './#/saomasellrp?code='+teem.get('code');
                            }else if(data.code !== 0){
                                switch (data.code){
                                    case 403:
                                        teem.set('snMsg','设备SN码验证有误');
                                        break;
                                    case 801:
                                        teem.set('snMsg','SN码不属于出厂记录');
                                        break;
                                    case 805:
                                        teem.set('snMsg','SN码已被销售');
                                        break;
                                    case 806:
                                        teem.set('snMsg','SN码已经激活');
                                        break;
                                    case 808:
                                        teem.set('snMsg','SN码录入数量超过上限，感觉您对糖猫的支持');
                                        break;
                                    case 818:
                                        teem.set('snMsg','售后SN码不在奖励范围，请上传其他SN码');
                                        break;
                                    default:
                                        teem.set('snMsg','设备SN码验证有误');
                                        break;
                                }
                                location.href = './#/saoerr?code='+teem.get('code');
                            }
                        })
                    }
                }
            });
        })
    }



    render(){

        const _data = this.state._data;

        const _children = _data.map(obj =>
            <div className="person-manage-item">
                <div className="person-manage-left">
                    <span>{obj.name}</span>
                    <span>{teem.formatDateTime(obj.time)}</span>
                </div>
                <div className="person-manage-right" onClick={this.handleUserDetail.bind(this,obj.code)}>
                    {
                        this.state.active === 3?
                            ''
                            :
                            (<span>员工编号：{obj.code}</span>)
                    }
                    <span className="icon"></span>
                </div>
            </div>
        )

        const arr=['资产物料','其他物料','申请中'];
        const _arrList = arr.map((item,index)=>(
            <li className={this.state.active===index+1?'active':''} onClick={this.handleTureMenu.bind(this,index+1)}><a href="javascript:;">{item}</a></li>
        ))

        return (
            <div className="big-scroll">
                <div className="container">
                    <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.state.lttile}</header>
                    <nav className="person-manage-menu three-menu">
                        <ul>
                            {_arrList}
                        </ul>
                    </nav>
                    <div className="person-manage-list">
                        {
                            _children
                        }
                    </div>
                    {
                        this.state.active === 3?
                            ''
                            :
                            (
                                <div className="inventory-btn-group inventory-btn-group-bottom">
                                    <a className="inventory-btn" onClick={this.handleAddSaoma.bind(this)}>添加</a>
                                </div>
                            )
                    }

                </div>
            </div>
        )
    }

}