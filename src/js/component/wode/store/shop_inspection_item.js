/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';
import Reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import './store_style.scss';
import back from '../../../../images/back.png';
import Teem from '../../lib/page';
const teem = new Teem();

export default class ShopInspectionItem extends React.Component{

    constructor(){
        super();
        this.state = {
            //是否是店铺管理中的  类型  ？ 属性  ？ 代理商  ？ 客户
            store:teem.get('storeManag'),
            syncLoad:false,
            contentss:'Loading ...',
            display:false,
            choiceArea:'选择省市区',
            dropName:'全部店铺',
            _data:[
                {
                    "shopName":"大望路国贸店",
                    "proDes":"北京市",
                    "cityDes":"北京市",
                    "countyDes":"朝阳区",
                    "address":"惠新西街东口 新寺小区 23号楼 3号底商对面万达广场三层鑫友家电",
                    "time":1505388640781,
                    "newCreate":1,
                }
            ],
        }
    }

    fetch(url){
        Reqwest({
            url:url,
            method:`get`,

        }).then(data=>{
            this.setState({
                // role:data.data.role,
            })
        })
    }

    componentWillMount(){
        this.fetch('');
    }

    loadFunc = (e)=>{
        console.log(e);
    }
    touchmove(){
        this.setState({
            syncLoad:true,
        })

    }
    handleSearch(){
        this.setState({
            syncLoad:false,
        })
    }


    //dropMenu
    handleDisplay(){
        this.setState({
            display:!this.state.display,
        })
    }
    handleCheck(e,key){
        console.log(e,e.target,e.target.key);
        this.setState({
            dropName:e.target.innerHTML
        })
        if(e.target.innerHTML == '全部店铺'){

        }else{

        }
    }

    componentWillReceiveProps(nextProps){

    }
    componentDidUpdate(state){
        console.log('updata',state);
    }

    handleDetailFor(e,key){
        console.log(e,key);
        this.props.handleDetailFor(e);
        // this.state._data.map(obj=>{
        //     if(obj.shopName == e ){
        //         teem.get("","");
        //         teem.get("","");
        //         teem.get("","");
        //         teem.get("","");
        //         teem.get("","");
        //     }
        // })
    }


    render(){
        const _load = {
            background:'#fff',
            width:'100%',
            textAlign:'center',
            display:'block',
            fontSize:'14px',
            lineHeight:'40px'
        }
        const {_data} = this.state;
        let item1 = {};
        let item2 = [];
        _data.map(obj=>{
            obj.month = teem.compareMonth(obj.sellTime);
            item1[obj.month] = item1[obj.month] === undefined ? [] : item1[obj.month];
            item1[obj.month].push(obj);
        });

        for (let keys in item1){
            let cashTotal= item1[keys][0].newCreate;
            item1[keys].map(item=> cashTotal = item.newCreate);

            item2.push(
                <div>
                    <header>{keys}<strong>{cashTotal !==0||cashTotal !==undefined?`${cashTotal} 家新增`:''}</strong></header>
                    <ul>
                        {
                            item1[keys].map(item=>
                                // cashTotal +=item.amount;
                                <li onClick={this.handleDetailFor.bind(this,item.shopName)}>
                                    <div className="date-time">{item.shopName}<time>{teem.formatDateTime(item.time)}</time></div>
                                    <p>{`${item.proDes} ${item.cityDes} ${item.countyDes} ${item.address}`}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )
        }


        return (
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;"><img src={back}/></a>店铺</header>
                <div onTouchMove={this.touchmove.bind(this)} >
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadFunc}
                        hasMore={this.state.syncLoad}
                        loader={<div className="loader" style={_load}><input placeholder="店名搜索"  onClick={this.handleSearch.bind(this)}/><span className="icon"></span></div>}
                        useWindow={false}
                    >

                    </InfiniteScroll>
                    <nav>
                        <ul>
                            <li>
                                {
                                    this.state.choiceArea == '选择省市区'
                                        ?
                                        this.state.choiceArea
                                        :
                                        (
                                            <span>
                                                <a>省</a>
                                                <a>市</a>
                                                <a>区</a>
                                            </span>
                                        )
                                }

                            </li>
                            <li>
                                <div>
                                    <a onClick={this.handleDisplay.bind(this)}>{this.state.dropName}<span></span></a>
                                    <div onClick={this.handleCheck.bind(this)} style={{display:this.state.display?'block':'none'}}>
                                        <span>全部店铺</span>
                                        <span>静默店铺</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <ul>
                            {item2}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}