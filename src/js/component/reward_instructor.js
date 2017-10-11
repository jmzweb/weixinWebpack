import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
const teem = new Teem();

class RewardInstructor extends React.Component{

    constructor(){
        super();
        this.state = {
            allow:'pointer',
            left:'',
            available:'',
            withdrawn:'',
            accumulate:'',
            keyObj:true,
            article:[],

        };

    }

    componentWillMount(){
        const _this = this;
        reqwest({
            url:`${teem.get('accessToke')}sell/rule`,
            method:'post',
        }).then(data=>{
            console.log(data);
            const _data = data.data;
            let startTime = _data.M1.startTime;
            let endTime = _data.M1.endTime;
            const article = [
                [
                    `1、${teem.formatDateTimey(startTime)}至${teem.formatDateTimey(endTime)}期间糖猫E1奖励加磅！销售人员每销售${_data.E1.priceModel}台糖猫E1可以获得${(JSON.parse(_data.E1.priceDesc).so/100).toFixed(2)}元的销售奖励，自销售之日起${_data.E1.activeDays}日内激活可再获得${(JSON.parse(_data.E1.priceDesc).act/100).toFixed(2)}元的激活奖励，即销售一台总共会获得${((JSON.parse(_data.E1.priceDesc).so+JSON.parse(_data.E1.priceDesc).act)/100).toFixed(2)}元的奖励。如果${_data.E1.activeDays}日内未激活，销售奖励的${(JSON.parse(_data.E1.priceDesc).act/100).toFixed(2)}元也会被退回。`,
                    `${teem.formatDateTimey(startTime)}至${teem.formatDateTimey(endTime)}期间糖猫M1奖励加磅！销售人员每销售${_data.M1.priceModel}台糖猫M1可以获得${(JSON.parse(_data.M1.priceDesc).so/100).toFixed(2)}元的销售奖励，自销售之日起${_data.M1.activeDays}日内激活可再获得${(JSON.parse(_data.M1.priceDesc).act/100).toFixed(2)}元的激活奖励，即销售一台总共会获得${((JSON.parse(_data.M1.priceDesc).so+JSON.parse(_data.M1.priceDesc).act)/100).toFixed(2)}元的奖励。如果${_data.M1.activeDays}日内未激活，销售奖励的${(JSON.parse(_data.M1.priceDesc).act/100).toFixed(2)}元也会被退回。`,
                    `${teem.formatDateTimey(startTime)}至${teem.formatDateTimey(endTime)}期间糖猫M2奖励加磅！销售人员每销售${_data.M2.priceModel}台糖猫M1可以获得${(JSON.parse(_data.M2.priceDesc).so/100).toFixed(2)}元的销售奖励，自销售之日起${_data.M2.activeDays}日内激活可再获得${(JSON.parse(_data.M2.priceDesc).act/100).toFixed(2)}元的激活奖励，即销售一台总共会获得${((JSON.parse(_data.M2.priceDesc).so+JSON.parse(_data.M2.priceDesc).act)/100).toFixed(2)}元的奖励。如果${_data.M2.activeDays}日内未激活，销售奖励的${(JSON.parse(_data.M2.priceDesc).act/100).toFixed(2)}元也会被退回。`,
                    `销售人员每销售${_data.T1.priceModel}台糖猫T1可以获得${(JSON.parse(_data.T1.priceDesc).so/100).toFixed(2)}元的销售奖励，自销售之日起${_data.T1.activeDays}日内激活可再获得${(JSON.parse(_data.T1.priceDesc).act/100).toFixed(2)}元的激活奖励，即销售一台总共会获得${((JSON.parse(_data.T1.priceDesc).so+JSON.parse(_data.T1.priceDesc).act)/100).toFixed(2)}元的奖励。如果${_data.T1.activeDays}日内未激活，销售奖励的${(JSON.parse(_data.T1.priceDesc).act/100).toFixed(2)}元也会被退回。`,
                    `销售人员每销售${_data.T2.priceModel}台糖猫T2可以获得${(JSON.parse(_data.T2.priceDesc).so/100).toFixed(2)}元的销售奖励，自销售之日起${_data.T2.activeDays}日内激活可再获得${(JSON.parse(_data.T2.priceDesc).act/100).toFixed(2)}元的激活奖励，即销售一台总共会获得${((JSON.parse(_data.T2.priceDesc).so+JSON.parse(_data.T2.priceDesc).act)/100).toFixed(2)}元的奖励。如果${_data.T2.activeDays}日内未激活，销售奖励的${(JSON.parse(_data.T2.priceDesc).act/100).toFixed(2)}元也会被退回。`,
                    `${teem.formatDateTimey(startTime)}至${teem.formatDateTimey(endTime)}期间糖猫T3奖励加磅！销售人员每销售${_data.T3.priceModel}台糖猫T3可以获得${(JSON.parse(_data.T3.priceDesc).so/100).toFixed(2)}元的销售奖励，自销售之日起${_data.T3.activeDays}日内激活可再获得${(JSON.parse(_data.T3.priceDesc).act/100).toFixed(2)}元的激活奖励，即销售一台总共会获得${((JSON.parse(_data.T3.priceDesc).so+JSON.parse(_data.T3.priceDesc).act)/100).toFixed(2)}元的奖励。如果${_data.T3.activeDays}日内未激活，销售奖励的${(JSON.parse(_data.T3.priceDesc).act/100).toFixed(2)}元也会被退回。`,
                ],
                '2、在激活后48小时之内上报销售都可以拿到奖励！',
                '3、该奖励会在可提现金额处更新，销售人员可以随时申请提现，由管理员审核后在每周三集中发放微信红包。',
                '4、零售人员需保证申请信息的真实有效性，不得作弊，不得向第三方泄露相关隐私信息，否则糖猫有权收回活动奖励。',
                '5、糖猫有权对销售奖励政策进行适时调整，在法律允许的范围内，本次活动的最终解释权归搜狗糖猫所有。'
            ];


            _this.setState({
                article:article
            })
        })
    }


    render(){

        const {article} = this.state;

        const children = article.length>0?
            article.map(obj=>(
                <li>
                    {
                        obj instanceof Array
                            ?
                            obj.map(item=>(
                                <p>{item}</p>
                            ))
                            :
                            <p>{obj}</p>
                    }
                </li>
            ))
            :
            '';

        return(
            <div className="container">
                <header className="myHeader">
                    <a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}>
                        <img src={back}/>
                    </a>
                    奖励政策
                </header>
                <article className="article_style">
                    <ul>
                        {children}
                    </ul>
                </article>
            </div>
        )
    }
}

export default RewardInstructor;