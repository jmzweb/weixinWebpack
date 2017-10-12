/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';

import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import './store_style.scss';
import back from '../../../../images/back.png';
import marketPic from '../../../../images/market-pic.png';


export default class MyStore extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="big-scroll">
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.props.lttile}<a className="refresh_position" href="javascript:;">变更</a></header>
                <div className="myStoreContainer">
                    <section className="timo_market">
                        <div className="timo_sell_user"><h3 className="user_market">小蛮牛的店铺<small>主营：<a>T1,T2系列</a></small></h3><div className="mark"><span>已认证</span></div></div>
                        <div className="now_address">
                            <div><address>河北省，承德市，西城区</address></div>
                            <div>惠新西街东口 新思小区23号楼3号底商</div>
                        </div>
                    </section>
                    <section className="timo_market_picture">
                        <ul><li><img src={marketPic}/></li><li><img src={marketPic}/></li></ul>
                    </section>
                    <section className="management">
                        <ul>
                            <li className="item-0">巡店签到<a className="show-info show-info-a" href="javascript:;">请签到</a></li>
                            <li className="item-1">巡店日志<a className="show-info"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                            <li className="item-2">销售数据<a className="show-info"><span className="icon"></span></a></li>
                            <li className="item-3">库存<a className="show-info" href="./#/wode/store/inventory"><span className="icon"></span></a></li>
                        </ul>
                    </section>
                    <section className="management">
                        <header>资料变更</header>
                        <ul>
                            <li className="item-4">物料管理<a className="show-info"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                            <li className="item-5">人员管理<a className="show-info" href="./#/wode/store/personmanage"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                            <li className="item-6">在售产品系列<a className="show-info"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                        </ul>
                    </section>
                    <section className="management">
                        <header>店铺管理</header>
                        <ul>
                            <li className="item-7">店铺类型<a className="show-info" href="./#/store/storemanager/type"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                            <li className="item-8">店铺属性<a className="show-info" href="./#/store/storemanager/attribute"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                            <li className="item-9">代理商<a className="show-info" href="./#/store/storemanager/agent"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                            <li className="item-10">所属客户<a className="show-info" href="./#/store/storemanager/customer"><span className="show-info-text">未填写</span><span className="icon"></span></a></li>
                        </ul>
                    </section>
                    <footer className="btn-group-management">
                        <a className="btn btn-small btn-bg-default" href="./#/wode/store/mytimemarket1">更新店铺</a>
                    </footer>
                </div>
            </div>
        )
    }

}