import React from 'react';
import '../../../style/wode_sell_data.scss';
import back from '../../../images/back.png';
import priceIcon from '../../../images/price-icon.png';

import reqwest from 'reqwest';
import Teem from '../lib/page';
import {hex_sha1} from '../lib/sha1';
const teem = new Teem();

class SellList extends React.Component{

    constructor(){
        super();
        this.state = {
            //是否是手机物理键
            keyObj:true,
            sell_list:[],
        };

    }

    handleDetailFor(key,obj){
        location.href = `./#/wode/rewardselldetail/`+key;
    }

    fetch(){
        reqwest({
            url:`${teem.get('accessToke')}sell/sale_list`,
            method:'post',
            data:{
                page:1,
                limit:500,
            },
            contentType:'application/x-www-form-urlencoded;charset=utf-8',
        }).then(data=>{
            if(data.code === 0){

                const saleList = data.data.items;
                let item1 = {};
                saleList.map(obj=>{
                    obj.month = teem.compareMonth(obj.sellTime);
                    item1[obj.month] = item1[obj.month] === undefined ? [] : item1[obj.month];
                    item1[obj.month].push(obj);
                });
                this.setState({
                    sell_list:item1,
                })
            }
        })
    }

    componentDidMount(){
        this.fetch();
    }


    render(){


        const {sell_list} = this.state;
        let item2 = [];

        for (let keys in sell_list){
            let cashTotal= 0;
            sell_list[keys].map(item=>item.status === '审核通过' || item.status === '申诉通过'  ? cashTotal += parseFloat(item.amount):'')
            item2.push(
                <div>
                    <header>{keys}<strong>{cashTotal!==''?`¥ ${cashTotal/100}`: ``}</strong></header>
                    <ul>
                        {
                            sell_list[keys].map(item=>
                                // cashTotal +=item.amount;
                                <li onClick={this.handleDetailFor.bind(this,item.sn)}>
                                    <div className="date-time">{item.sn === undefined ? '' : 'SN '+item.sn}<time>{teem.formatDateTime(item.sellTime)}</time></div>
                                    <div className="time_reward_ltem">{item.status === '审核通过' || item.status === '申诉通过'  ? `+ ${item.amount/100} `: (item.status==='异地激活'?'审核未通过':item.status)}</div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )
        }

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>销售明细</header>
                <div className="wode_detail_content">
                    {item2}
                </div>

            </div>
        )
    }
}

export default SellList;