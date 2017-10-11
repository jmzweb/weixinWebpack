import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class RewardWithdrawal extends React.Component{

    constructor(){
        super();
        this.state = {
            keyObj:false,
            id:'',
            status:'',
            apply_amount:'',
            final_amount:'',
            apply_date:'',
            send_date:'',
            userName:'',
            redpack_list:[],

        };

    }

    handleDetail(){
        location.href = './#/rewardcashdetail';
    }

    handleApply(){
        reqwest({
            url:`${teem.get('accessToke')}cash/cash_detail`,
            method:'post',
            data:{
                cashId:this.props.params.id,
            }
        }).then(data=>{
            console.log(data);
            let _id = data.data.detail.id===undefined ? '': data.data.detail.id;
            if(data.code === 0){
                this.setState({
                    id:_id,
                    status:data.data.detail.status,
                    apply_amount:data.data.detail.apply_amount/100,
                    final_amount:data.data.detail.final_amount/100,
                    apply_date:data.data.detail.apply_date,
                    send_date:data.data.detail.send_date,
                    redpack_list:data.data.detail.redpack_list,
                    userName:data.data.detail.user_name,
                })
            }
        })
    }

    componentDidMount(){
        this.handleApply();
        setTimeout(()=>{
            this.setState({keyObj:true});
        },1500)
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextState.keyObj);
    //     console.log('window',  window.history.length);
    //     window.addEventListener("popstate", function(e) {
    //         if(nextState.keyObj){
    //             console.log('close');
    //             location.href = `./#/review1`
    //         }else {
    //             console.log('关闭浏览器',2);
    //         }
    //     }, false);
    // }


    handleBack(){
        // location.href = `./#/review1`
        window.history.go(-1);
    }

    render(){

        const {redpack_list} = this.state;

        const child = redpack_list.length > 0 ?
            redpack_list.map(item=>(
                <a key={item.id} href="javascript:;">
                    {teem.formatDateTime(item.createTime)}
                    <span style={{color:'#54bc49'}}>
                        {`+ ${item.amount/100}`}
                        <strong style={{
                            paddingLeft:20,
                            fontWeight:'normal',
                            display:'inline-block',
                            width:110,
                            verticalAlign:'middle',
                            marginTop:-4,
                            overflow:'hidden',
                            textOverflow:'ellipsis',
                            whiteSpace:'nowrap'
                        }}>
                            {teem.sStatus(item.status)}
                            </strong>
                    </span>
                </a>
            ))
            :
            "";

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={this.handleBack.bind(this)}><img src={back}/></a>提现详情</header>
                <div className="withdrawal-details">
                    <p>审核通过金额：</p>
                    <p>+<strong>{this.state.status==='审核未通过'?'0':this.state.final_amount}</strong>元（申请金额：{this.state.apply_amount}元）</p>
                    <p>提现单号：{this.state.id}</p>
                    <a className="mark" href="javascript:;">{this.state.status}</a>
                </div>
                <div className="cash_detail refresh_cash_detail">
                    <div className="cash_detail_apply_time">
                        <header>提现账号<span>{this.state.userName === undefined||this.state.userName === 'undefined'? '' : this.state.userName}</span></header>
                        <a href="javascript:;">提现申请时间<span>{this.state.apply_date === undefined ? "" : teem.formatDateTime(this.state.apply_date)}</span></a>
                        <a href="javascript:;">
                            提现发放时间
                            <span>{this.state.status==='已发放'?this.state.send_date === undefined ? "" : teem.formatDateTime(this.state.send_date) :''}</span>
                        </a>
                    </div>
                </div>
                {
                    child === "" ?
                        ""
                        :
                        (
                            <div className="apply_for_cash cash_remark">
                                <h3>已发放红包明细：</h3>
                                {child}
                            </div>
                        )
                }
                <footer className="widthdrawal-footer">
                    备注：<span>提现发放后红包在七个工作日内到账。<br/>已发放未领取的红包会退回到您的账号，可重新提现。</span>
                </footer>
            </div>
        )
    }
}

export default RewardWithdrawal;