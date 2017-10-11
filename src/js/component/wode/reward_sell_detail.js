import React from 'react';
import '../../../style/header.scss';
import '../../../style/reward.scss';
import back from '../../../images/back.png';
import reqwest from 'reqwest';
import Teem from '../lib/page';
import {hex_sha1} from '../lib/sha1';
const teem = new Teem();

class RewardSellDetail extends React.Component{
    constructor(){
        super();
        this.state = {

            imgUrl:'http://userimage8.360doc.com/17/0130/21/35391316_201701302105480796169888.jpg',
            date:'',
            status:'',
            amount:'',
            so_amount:'',
            active_amount:'',
            cut_amount:'',

        };

    }

    handleAppeal(){
        location.href = './#/wode/rewardappeal/'+this.props.params.sn;
    }

    fetch(){
        reqwest({
            url:`${teem.get('accessToke')}sell/sn_detail`,
            method:'post',
            data:{
                "SN":this.props.params.sn
            },
            contentType:'application/x-www-form-urlencoded;charset=utf-8',
        }).then(data=>{
            console.log(data);
            if(data.code === 0){
                this.setState({
                    date:data.data.sellTime,
                    status:data.data.status,
                    amount:data.data.amount/100,
                    so_amount:data.data.soAmount/100,
                    active_amount:data.data.activeAmount/100,
                    cut_amount:data.data.cutAmount/100,
                    imgUrl:data.data.sellImage,
                })
            }
        })
    }

    componentDidMount(){
        this.fetch();
    }

    render(){

        let childA = '';
        switch (this.state.status){
            case '审核未通过':
                childA = (
                    <div style={{textAlign:'center'}}>
                        <a href="javascript:;" style={{display:"block",color:'#ff7e15',fontSize:14}}>审核未通过</a>
                        <a href="javascript:;" style={{display:"block",fontSize:14,color:'#666'}}>无效参与</a>
                    </div>

                );
                break;
            case '异地激活':
                childA = (
                    <div style={{textAlign:'center'}}>
                        <a href="javascript:;" style={{display:"block",color:'#ff7e15',fontSize:14}}>审核未通过</a>
                        <a href="javascript:;" style={{display:"block",fontSize:14,color:'#666'}}>异地激活</a>
                    </div>

                );
                break;
            case '申诉通过':
                childA = (
                    <div style={{textAlign:'center'}}>
                        <a href="javascript:;" style={{display:"block",color:'#ff7e15',fontSize:14}}>{this.state.status}</a>
                        <a href="javascript:;" style={{display:"block",fontSize:14,color:'#666'}}>有效激活，奖励{this.state.so_amount+this.state.active_amount}元</a>
                    </div>

                );
                break;
            case '审核通过':
                childA = (
                    <div style={{textAlign:'center'}}>
                        <a href="javascript:;" style={{display:"block",color:'#ff7e15',fontSize:14}}>{this.state.status}</a>
                        <a href="javascript:;" style={{display:"block",fontSize:14,color:'#666'}}>有效激活，奖励{this.state.so_amount+this.state.active_amount}元</a>
                    </div>

                );
                break;
            default:
                childA = (
                    <div style={{textAlign:'center'}}>
                        <a href="javascript:;" style={{color:'#ff7e15',fontSize:14}}>{this.state.status}</a>
                    </div>

                );
                break;
        }

        return(
            <div className="container">
                <header className="myHeader">
                    <a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>
                    销售详情
                    <a className="btn-next" style={{display:this.state.status==='异地激活'?'block':'none'}} href="javascript:;" onClick={this.handleAppeal.bind(this)}>申诉</a>
                </header>
                <div className="cash_detail sell_detail">

                    <h3>设备SN：{this.props.params.sn}</h3>
                    <a href="javascript:;">{teem.formatDateTime(this.state.date)}</a>

                    {
                        childA
                    }
                    {/*<a href="javascript:;">有效激活，奖励25元</a>*/}

                </div>
                <div className="apply_for_cash cash_remark">
                    <h3>奖励明细：</h3>
                    <a href="javascript:;">销售奖励金<span>{this.state.so_amount}元</span></a>
                    <a href="javascript:;">激活奖励金<span>{this.state.active_amount-this.state.cut_amount}元</span></a>
                    <a href="javascript:;">累计奖励金<span>{this.state.amount}元</span></a>
                </div>
                <div className="take_photo" style={{paddingBottom:30}}>
                    <div><img src={this.state.imgUrl}/></div>
                </div>
            </div>
        )
    }
}

export default RewardSellDetail;