import React from 'react';
import ReactSwipe from 'react-swipe';
import '../../../style/wode.scss';
import Banner01 from '../../../images/wode_banner.jpg';
import Banner02 from '../../../images/banner02.png';
// import Banner03 from '../../../images/wode_banner.jpg';
import WodeProgress from '../../../images/wode_progress.png';
import WodeSaleData from '../../../images/wode_sale_data.png';
// import wodeNewApply from '../../../images/wode_new_apply.png';
// import WodeStore from '../../../images/wode_store.png';
// import WodeShopTour from '../../../images/wode_shop_tour.png';
// import WodeApproval from '../../../images/wode_approval.png';
// import WodePerformance from '../../../images/wode_performance.png';
// import WodeEwamination from '../../../images/wo_examination.png';
// import WodeBigIntegral from '../../../images/wode_big_integral.png';
import WodeProblem from '../../../images/wode_problem.png';

import reqwest from 'reqwest';
import {hex_sha1} from '../lib/sha1';
import Teem from '../lib/page';

const teem = new Teem();

class SaleDate extends React.Component{

    constructor(){
        super();
        this.state = {
            //是否是手机物理键
            keyObj:true,
        };

    }

    handleExamine(){
        reqwest({
            url:`${teem.get('accessToke')}user/query_shop?longitude=${this.props.params.j}latitude=${this.props.params.w}`,
            method: 'get',
            type: 'json',
        }).then((data) => {
            console.log(data);
            if(data.code === 0){
                this.setState({
                    province:data.data.province,
                    provId:data.data.provinceId,
                    city:data.data.city,
                    cityId:data.data.cityId,
                    county:data.data.district,
                    countyId:data.data.districtId,
                })
            }else if(data.code === 1){
                alert('未得到地址信息');
            }
        })
    }

    componentDidMount(){
        // setTimeout(()=>{
        //     this.setState({keyObj:true});
        // },1500)
    }
    wxConfig(){
        let timestamp = Date.parse(new Date())/1000;
        const url1 = location.href;
        const url = `${url1}`;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + url ];
        vars = vars.sort();
        console.log(ticked);
        let string1 = vars.join('&');
        let signature = hex_sha1(string1);
        wx.config({
            debug: false,
            appId:'wxf008db15f0cf1b7f',
            timestamp:timestamp,
            nonceStr:'teemo',
            signature:signature,
            jsApiList:[
                'checkJsApi',
                'getLocation',
                'hideOptionMenu',
                'scanQRCode',
                'closeWindow'
            ]
        })

    }
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextState.keyObj);
    //     console.log('window',  window.history.length);
    //     this.wxConfig();
    //     wx.ready(()=>{
    //         wx.hideOptionMenu();
    //
    //         window.addEventListener("popstate", function(e) {
    //             if(nextState.keyObj){
    //                 console.log('close');
    //                 wx.closeWindow();
    //             }else {
    //                 console.log('关闭浏览器',2);
    //                 // location.href = './#/getlocation?code='+teem.get('code')
    //             }
    //             // wx.closeWindow();
    //         }, false);
    //     })
    //
    //     // return true;
    // }

    handleClose(){

        this.wxConfig();
        wx.ready(()=>{
            wx.hideOptionMenu();
            wx.closeWindow();
        });

    }

    handleSaleData(){
        location.href = `./#/wode/sellList`;
        this.setState({keyObj:false});
    }

    render(){
        return(
            <div className="container">
                <header className="myHeader">个人</header>
                <section className="banner">
                    <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
                        <div>
                            <img src={`${location.href.split('#')[0]}${Banner01}`} alt="第一张"/>
                        </div>
                        <div>
                            <img src={`${location.href.split('#')[0]}${Banner02}`} alt="第2张"/>
                        </div>
                        {/*<div>*/}
                            {/*<img src={`${location.href.split('#')[0]}${Banner01}`} alt="第一张"/>*/}
                        {/*</div>*/}
                    </ReactSwipe>
                </section>
                <section className="oneself_info" style={{display:'none'}}>
                    <div>
                        <ul>
                            <li>王晓明</li>
                            <li>0.5年</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li><span>经验值</span>：1520</li>
                            <li><span>积分</span>：211522</li>
                        </ul>
                    </div>
                </section>
                <section className="main_info">
                    <div>
                        <a href="./#/wode/progress"><img src={WodeProgress}/><span>申请进度</span></a>
                    </div>
                    <div>
                        <a href="javascript:;" onClick={this.handleSaleData.bind(this)}><img src={WodeSaleData}/><span>销售数据</span></a>
                    </div>
                </section>
                <section className="other_info">
                    <h3>常用应用</h3>
                    <ul>
                        <li>
                            <a href="./#/wode/problem"><dl><dt><img src={WodeProblem}/></dt><dd>常见问题</dd></dl></a>
                        </li>
                        <li>
                            <a href="javascript:;"><dl><dt></dt><dd></dd></dl></a>
                        </li>
                        <li>
                            <a href="javascript:;"><dl><dt></dt><dd></dd></dl></a>
                        </li>
                        <li>
                            <a href="javascript:;"><dl><dt></dt><dd></dd></dl></a>
                        </li>
                    </ul>

                </section>
            </div>
        )
    }
}

export default SaleDate;
