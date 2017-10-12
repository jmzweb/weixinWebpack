/*
 kgt8ON7yVITDhtdwci0qeQ9SSw8SuTPRz9LhC_GOSNGkbOQwDyo7nuE_hbHTlh8cyamfCUFKx-q2CFlyBaMmmA
 kgt8ON7yVITDhtdwci0qeQ9SSw8SuTPRz9LhC_GOSNGkbOQwDyo7nuE_hbHTlh8cyamfCUFKx-q2CFlyBaMmmA

 4b6847d81e451f159f4b55fe411c06e2372b7f5f
 4b6847d81e451f159f4b55fe411c06e2372b7f5f

 */


import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,browserHistory,IndexRoute} from "react-router";
import Main from  './component/main';
import Login from  './component/login';
import CreateMarket from './component/create_market';
import GetLocation from './component/get_location';
import MyTimeMarket from './component/my_timo_market';
import Position from './component/position';
import Review from './component/review';
import ReviewAward from './component/reward_award';
import Review1 from './component/reward_1';
import RewardInstructor from './component/reward_instructor';
import sellRewardDetail from './component/reward_detail';

import rewardCash from './component/reward_cash';
import RewardWithdrawal from './component/reward_withdrawal';
import RewardCashDetail from './component/reward_cash_detail';
import RewardSellDetail from './component/wode/reward_sell_detail';
import RewardAppeal from './component/wode/reward_appeal';
import Saoma from './component/saoma';
import SaoErr from './component/saoma_err';
import SaoResult from './component/saoma_result';
import SaomaSellRp from './component/saoma_sellRp'
import ManualInput from './component/manual_input';
import SaleDate from './component/wode/index';
import SellList from './component/wode/sell_list';

import Problem from './component/wode/problem/index';
import Progress from './component/wode/progress/index';
import Store from './component/wode/store/index';
import StoreManager from './component/wode/store/store_manage_temple';
import Inventory from './component/wode/store/inventory';
import PersonnelManagement from './component/wode/store/personnel_management';
import PersonnelManagementDetail from './component/wode/store/personnel_management_detail';
import MaterialManagement from './component/wode/store/material_management';
import MaterialBinding from './component/wode/store/material_binding';
import MaterialDetail from './component/wode/store/material_detail';
import MaterialWriteError from './component/wode/store/material_write_error';
import MyTimemarket1 from './component/wode/store/my_timo_market_1';

import reqwest from 'reqwest';
import {hex_sha1} from './component/lib/sha1';
import Teem from './component/lib/page';

import Layout from './layout/index';

import '../style/mobileCom.css'

const teem = new Teem();

class Root extends React.Component {

    constructor(){
        super();
        this.state = {

        };

    }

    pageChange(){
        const _this = this;
        let urls = `${teem.get('accessToke')}user/ticket`;
        // let urlk = `http://10.130.10.39:8080/token_wx/wx2/jssdk.php`;
        reqwest({
            url:`${teem.get('accessToke')}user/info?code=${teem.get('code')}&openId=132456`,//创建 带 openId 每次请求携带 新
            method: 'get',
            type: 'json',
        }).then((data) => {

            console.log(data);

            teem.ajax({
                url: urls,
                method: 'post',
                success: function (dap) {

                    teem.set('ticks',dap.data.tick);
                    console.log(teem.get('ticks'));

                    let timestamp = Date.parse(new Date())/1000;
                    const url1 = location.href;
                    const url = `${url1.split('#')[0]}`;
                    const noncestr = 'teemo';
                    const ticked = teem.get('ticks');
                    let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + url ];
                    vars = vars.sort();
                    let string1 = vars.join('&');
                    let signature = hex_sha1(string1);
                    wx.config({
                        debug: false,
                        appId:teem.get('appId'),
                        timestamp:timestamp,
                        nonceStr:'teemo',
                        signature:signature,
                        jsApiList:[
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'onVoicePlayEnd',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'translateVoice',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard',
                            'getLocalImgData',
                        ]
                    });

                    if(data.data.userStatus === 0 && data.data.shopStatus === 0){
                        //未注册
                        location.href='./#/login';
                    }
                    else if(data.data.userStatus === 1  && data.data.shopStatus === 0){
                        //已注册 店铺未注册
                        location.href='./#/review/add';
                    }
                    else if(data.data.userStatus === 1 && data.data.shopStatus === 1){
                        //已注册 店铺待审核
                        location.href='./#/review/load';
                    }
                    else if(data.data.userStatus === 1 && data.data.shopStatus === 3){
                        //已注册 店铺未通过审核
                        location.href='./#/review/error';
                    }
                    else if(data.data.userStatus === 1 && data.data.shopStatus === 2){
                        //已注册 店铺正常营业
                        if(teem.pageName('op')==='sale'){
                            location.href='./#/review1';
                        }else if(teem.pageName('op') === 'saoma'){
                            location.href='./#/saoma';
                        }else if(teem.pageName('op') === 'wode'){
                            location.href='./#/wode/saledata';
                        }
                    }
                }
            })

        });

    }

    componentWillMount(){
        const url1 = location.href;
        const url = `${url1}`;
        if(teem.pageName('code') !== null){
            teem.set('code',teem.pageName('code'));
            // alert(teem.pageName('code'));
        }
        teem.set('href',url);
        teem.set('accessToke','http://m.teemo.cn/wx2/'); // http://a0.www.teemo.cn/wx/  上线地址： http://m.teemo.cn/wx2/


        teem.set('jkhp','http://10.130.10.59:9090'); // http://a0.www.teemo.cn/wx/  上线地址： http://m.teemo.cn/wx2/


        teem.set('appId','wx353505bb820fcf88'); // wxf008db15f0cf1b7f  上线地址： wx353505bb820fcf88

        this.pageChange();

    }
    componentDidMount(){
        //
    }

    render(){
        return(
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={Layout}>
                        <Route path="createmarket" component={CreateMarket}/>
                        <Route path="login" component={Login}/>
                        <Route path="getlocation" component={GetLocation}/>
                        <Route path="mytimemarket/(:shopId)" component={MyTimeMarket}/>
                        <Route path="mytimemarket1" component={MyTimemarket1}/>
                        <Route path="position/(:j)/(:w)" component={Position}/>
                        <Route path="review/(:part)" component={Review}/>
                        <Route path="reviewaward" component={ReviewAward}/>
                        <Route path="review1" component={Review1}/>
                        <Route path="reviewinstructor" component={RewardInstructor}/>
                        <Route path="rewardcash/(:cash)" component={rewardCash}/>
                        <Route path="rewarddetail" component={sellRewardDetail}/>
                        <Route path="withdrawal/(:id)" component={RewardWithdrawal}/>
                        <Route path="rewardcashdetail/(:cashId)" component={RewardCashDetail}/>
                        <Route path="saoma" component={Saoma}/>
                        <Route path="saoerr" component={SaoErr}/>
                        <Route path="manual" component={ManualInput}/>
                        <Route path="saoresult/(:statu)" component={SaoResult}/>
                        <Route path="saomasellrp" component={SaomaSellRp}/>

                        <Route path="wode/">
                            <Route path="saledata" component={SaleDate}/>
                            <Route path="rewardappeal/(:sn)" component={RewardAppeal}/>
                            <Route path="rewardselldetail/(:sn)" component={RewardSellDetail}/>
                            <Route path="sellList" component={SellList}/>
                            <Route path="problem" component={Problem}/>
                            <Route path="progress" component={Progress}/>
                            <Route path="store/">
                                <Route path="index" component={Store}/>
                                <Route path="storemanager/(:temple)" component={StoreManager}/>
                                <Route path="inventory" component={Inventory}/>
                                <Route path="personmanage" component={PersonnelManagement}/>
                                <Route path="personmanagedetail/(:manage)" component={PersonnelManagementDetail}/>
                                <Route path="materialmanage" component={MaterialManagement}/>
                                <Route path="materialbinding" component={MaterialBinding}/>
                                <Route path="materialdetail/(:mid)" component={MaterialDetail}/>
                                <Route path="materialwrite" component={MaterialWriteError}/>
                                <Route path="mytimemarket1" component={MyTimemarket1}/>
                            </Route>
                        </Route>
                    </Route>
                </Router>
            </div>
        )
    }

}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);