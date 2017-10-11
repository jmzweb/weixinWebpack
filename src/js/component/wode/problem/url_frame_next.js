/**
 * Created by jiminze on 2017/9/1.
 */


//常见问题、


import React from 'react';
import propType from 'prop-types';
import '../progress/progress.scss';


export default class UrlFrameNext extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){

        const arr = [
            {
                "Q":"售卖糖猫提示此台机器SN码验证有误是怎么回事？",
                "A":"在您扫码时，扫码框中还有其他条形码同时提交。建议您在扫码时挡住干扰码，保证扫码框中仅有设备SN码或者二维码。"
            },
            {
                "Q":"售卖糖猫提示此台机器已经销售或激活是怎么回事？",
                "A":"在您销售此台糖猫之前，糖猫已经被他人销售过或激活过，已经销售或激活的糖猫不能获得销售奖励。如有疑问请您与店铺负责人联系。"
            },
            {
                "Q":"提示售卖的糖猫没有奖励是怎么回事？",
                "A":"搜狗糖猫之家的销售奖励仅针对线下销售渠道，电商渠道不在奖励之内。如有疑问请您与店铺负责人联系。"
            },
            {
                "Q":"手太快选错了店铺怎么办？",
                "A":"此模块稍后上线。"
            },
            {
                "Q":"来不及录入系统就被客户拿走机器了，这种情况怎么办？",
                "A":"请在客户拿走机器前务必拍照留底，店铺不忙的时候尽快上传系统里，以免客户拿走机器后激活，再录入就拿不到奖励的情况发生。"
            },
            {
                "Q":"我刚售卖的糖猫明明已经在柜台激活了，为什么系统中还显示未激活呢？",
                "A":"激活数据每天6:00开始计算，计算周期为上一日00:00-24:00，故激活数据要在次日才能看到。如果当天在柜台激活但当天又解绑了，次日再看还是未激活状态。"
            },
            {
                "Q":"红包未领取被退回怎么办？",
                "A":"请在24小时内领取微信红包，未领取将会退回您的账户，可重新提现。每周三10:30集中发放红包，如您在本周三10:30以后申请提现，那么将在下周三获得红包奖励。"
            },
            {
                "Q":"遇到的问题均不在以上范围，怎么办？",
                "A":"请您描述遇到的问题在搜狗糖猫之家微信服务号中发送，我们的客服人员将及时回复消息或者电话与您联系。"
            },
        ];

        const child = arr.map((obj,index)=>(
            <div className="show-problem-list">
                <p><span className="show-problem-list-title">{`Q${index+1} : `}</span><span>{obj.Q}</span></p>
                <p><span className="show-problem-list-title">{`A${index+1} : `}</span><span>{obj.A}</span></p>
            </div>
        ))

        return (

            <div className="show-problem show-problem-next">
                {/*<div className="tip-msg">*/}
                {/*进度模块还在努力建设中，请先浏览应用其他模块～～～～*/}
                {/*</div>*/}
                {child}
            </div>

        )
    }
}
