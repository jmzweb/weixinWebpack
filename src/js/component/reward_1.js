import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';
import btnNLaction from '../../images/btn-location-next.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class sellReward extends React.Component{

    constructor(){
        super();
        this.state = {
            allow:'pointer',
            left:'',
            available:'',
            withdrawn:'',
            accumulate:'',
            keyObj:true,

        };

    }

    handleDetail(e){
        this.state.keyObj=false;
        this.setState({keyObj:false});
        location.href = './#/rewarddetail';
    }

    handleApply(){
        if(this.state.available == 0)
        {
            alert('您已经提取了全部金额');
            this.setState({allow:'not-allowed'})
        }
        else
        {
            this.state.keyObj=false;
            this.setState({keyObj:false});
            location.href = './#/rewardcash/'+this.state.available;

        }


    }

    fetched(){
        reqwest({
            url:`${teem.get('accessToke')}cash/cash_limit`,
            method:'post',
        }).then(data=>{
            console.log('jine',data);
            if(data.code === 0 || data.code === 200){
                teem.set('userName',data.data.user_name)
                this.setState({
                    available:teem.toDecimal2(data.data.available/100),
                    withdrawn:teem.toDecimal2(data.data.withdrawn/100),
                    accumulate:teem.toDecimal2(data.data.accumulate/100),
                })
            }
        })
    }


    componentDidMount(){
        this.fetched();
    }

    // componentWillMount(){
    //     window.addEventListener("popstate", function(e) {
    //         console.log('第一次监听popstate');
    //     }, false);
    // }

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
            appId:teem.get('appId'),
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

    handleClose(){

        this.wxConfig();
        wx.ready(()=>{
            wx.hideOptionMenu();
            wx.closeWindow();
        });

    }


    render(){

        return(
            <div className="container">
                <header className="myHeader">
                    <a className="btn-back" href="javascript:;" onClick={this.handleClose.bind(this)}>
                        <img src={back}/>
                    </a>
                    销售奖励
                    <a className="btn-next btn-next-width" style={{marginTop:3}} onClick={()=>location.href = `./#/wode/sellList`}>
                        <img src={btnNLaction}/>
                    </a>
                </header>
                <div className="user_reward" onClick={this.handleDetail.bind(this)}>
                    <header>可申请奖励(¥)<strong>{this.state.available}</strong></header>
                    <div className="user_item">
                        累计奖励金额(¥)<strong>{this.state.accumulate}</strong>
                    </div>
                </div>

                <div className="btn_for_cash">
                    <a href="javascript:;" className="btn_back btn_default" style={{cursor:this.state.allow}} onClick={this.handleApply.bind(this)}>申请提现</a>
                </div>
                <ol className="reward_info">
                    <li>糖猫工作人员每周三统一审核发放奖励；</li>
                    <li>奖励申请在审核通过后，将以微信红包形式发出，领取后存入您的微信钱包；</li>
                    <li>实际到账金额请以最终审核为准，无效销售和异省激活的SN对应奖励将被扣除，在法律允许范围内，提现发放的最终解释权归糖猫所有；</li>
                    <li>已发放未领取的红包会退回到您的账户，可重新提现。</li>
                </ol>
                <footer className="reward_pic"><a href='./#/reviewinstructor'>奖励政策</a></footer>
            </div>
        )
    }
}

export default sellReward;