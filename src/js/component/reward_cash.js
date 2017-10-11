import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';
import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class applyForCash extends React.Component{

    constructor(){
        super();
        this.state = {

            left:'',

        };

    }

    handleApplyNow(){
        console.log('double',parseFloat(this.props.params.cash));
        reqwest({
            url:`${teem.get('accessToke')}cash/cash_apply`,
            method:'post',
            data:{
                // money:this.props.params.cash,
                money:this.props.params.cash,
            }
        }).then(data=>{
            console.log(data);
            if(data.code === 0){
                location.href = './#/rewardcashdetail/'+data.data.id;
            }else{
                alert(data.msg);
            }

        })
    }

    render(){
        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>申请提现</header>
                <div className="apply_for_cash">
                    <a href="javascript:;">金额<span>本次可提取现金 ¥{this.props.params.cash}</span></a>

                </div>
                <div className="apply_for_cash">
                    <a href="javascript:;" style={{color:'#aaa'}}>审核通过的金额将以红包发送到账户<span></span></a>
                    <a href="javascript:;">{teem.get('userName')}<span className="bd_mark">已绑定</span></a>
                </div>
                <div className="btn_for_cash reward_btn">
                    <a href="javascript:;" className="btn_back btn_default" onClick={this.handleApplyNow.bind(this)}>立即申请</a>
                </div>
            </div>
        )
    }
}

export default applyForCash;