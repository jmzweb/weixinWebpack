import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';
import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class cashDetail extends React.Component{

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
            redpack_list:[],

        };

    }
    fetch(){
        reqwest({
            url:`${teem.get('accessToke')}cash/cash_detail`,
            method:'post',
            data:{
                cashId:this.props.params.cashId,
            }
        }).then(data=>{
            console.log('查找详情结果',data.data);
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
                })
            }else{
                alert(data.msg);
            }

        })
    }
    componentDidMount(){
        this.fetch();
    }



    handleBack(){
        location.href = `./#/review1`
    }

    render(){

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;" onClick={this.handleBack.bind(this)}><img src={back}/></a>提现申请中</header>
                <div className="cash_detail">
                    <a href="javascript:;">提现单号：<span>{this.state.id}</span></a>
                    <h3>¥ {this.state.apply_amount}<small className="active">提现申请中...</small></h3>
                    <div className="cash_detail_apply_time">
                        <header>提现账号<span>{teem.get('userName')}</span></header>
                        <a href="javascript:;">提现申请时间<span>{this.state.apply_date === undefined ? "" : teem.formatDateTime(this.state.apply_date)}</span></a>
                        {/*<a href="javascript:;">提现发放时间<span>{this.state.send_date === undefined ? "" : teem.formatDateTime(this.state.send_date)}</span></a>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default cashDetail;