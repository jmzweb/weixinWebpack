import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';
import priceIcon from '../../images/price-icon.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class sellRewardDetail extends React.Component{

    constructor(){
        super();
        this.state = {

            checkAll:false,
            id:'',
            time:'',
            amount:'',
            status:'',
            cash_list:{},

        };

    }


    handleDetailFor(key,status,obj){
        console.log(status,key);
        status != '提现申请中'
            ?
            location.href = './#/withdrawal/'+key
            :
            location.href = './#/rewardcashdetail/'+key
    }

    fetch(prt){
        reqwest({
            url:`${teem.get('accessToke')}cash/cash_list`,
            method:'post',
            data:{
                ...prt,
                page:1,
                limit:500,
            }
        }).then(data=>{
            console.log('cash/cash_list',data.data);
            if(data.code === 0){
                const cashList = data.data.cash_list;

                /**
                 *
                 * arr = [{'month':'','list':[]}]
                 *
                 * */
                let item1 = {};
                cashList.map(obj=>{
                    obj.month = teem.compareMonth(obj.time);
                    item1[obj.month] = item1[obj.month] === undefined ? [] : item1[obj.month];
                    item1[obj.month].push(obj);
                });
                this.setState({
                    cash_list:item1,
                })
            }
        })
    }

    componentDidMount(){
        this.fetch({type:'all'});
    }
    handlecheckPart(){
        this.fetch({type:'send'});
        this.setState({checkAll:true});
    }
    handlecheckAll(){
        this.fetch({type:'all'});
        this.setState({checkAll:false});
    }

    render(){

        const {cash_list} = this.state;
        let item2 = [];

        for (let keys in cash_list){
            item2.push(
                <div>
                    <header>{keys}</header>
                    <ul>
                        {
                            cash_list[keys].map(item=>
                                (
                                    <li onClick={this.handleDetailFor.bind(this,item.id,item.status)}>
                                        <div className="date-time">{teem.compareWeek(item.time)}<time>{teem.compareMonthDay(item.time)}</time></div>
                                        <div className="time_reward_ltem"><img src={priceIcon}/><div><h3>{item.status == '审核通过'||item.status == '已发放'?`+ ${item.final_amount/100}`:item.status == '提现申请中'?`+ ${item.amount/100}`:0}</h3><p>提现单号：{item.id}</p></div><a className="mark" href="javascript:;">{item.status}</a></div>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            )
        }

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>提现申请</header>
                <div className="rewward_detail_change">
                    <ul className="user_item">
                        <li onClick={this.handlecheckPart.bind(this)} className={this.state.checkAll ? 'active' : ''}>已发放</li>
                        <li onClick={this.handlecheckAll.bind(this)} className={this.state.checkAll ? '' : 'active'}>全部</li>
                    </ul>
                </div>
                <div className="rewward_detail_content">
                    {item2}
                </div>
            </div>
        )
    }
}

export default sellRewardDetail;