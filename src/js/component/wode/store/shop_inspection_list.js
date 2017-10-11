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
import marketPic from '../../../../images/market-pic.png';

export default class ShopInspectionList extends React.Component{

    constructor(){
        super();
        this.state = {
            //修改区域为省份
            area:'区域',
            syncLoad:false,
            contentss:'Loading ...',
        }
    }

    fetch(data){
        Reqwest({
            url:``,
            method:`post`,
            data:{
                ...data,
            }

        }).then(data=>{
            this.setState({
                // role:data.data.role,
            })
        })
    }

    handleAClick(){
        if(this.state.area == '省份'){
            this.props.handleAClick(this);
        }else{
            this.fetch({});//通过KEY定位到区
            this.setState({
                area:'省份',
            })
        }

    }

    componentWillMount(){
        Reqwest({
            url:``,
            method:`get`,

        }).then(data=>{
            this.setState({
                // role:data.data.role,
            })
        })


    }

    loadFunc = (e)=>{
        console.log(e);
    }
    touchmove(){
        this.setState({
            syncLoad:true,
            contentss:'正在加载，请稍等 ...',
        })

    }
    touchend(){
        setTimeout(()=>{
            this.setState({
                syncLoad:false,
            })
        },1000)

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
        return (
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;"><img src={back}/></a>店铺</header>
                <div className="_xdList">
                    <header>
                        <ul>
                            <li>{this.state.area}</li>
                            <li>店铺数</li>
                            <li>静默店铺</li>
                            <li>30天净增长</li>
                        </ul>
                    </header>

                    <div className="_xdList_content" onTouchMove={this.touchmove.bind(this)} onTouchEnd={this.touchend.bind(this)}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadFunc}
                            hasMore={this.state.syncLoad}
                            loader={<div className="loader" style={_load}>{this.state.contentss}</div>}
                            useWindow={false}
                        >

                        </InfiniteScroll>
                        <ul onClick={this.handleAClick.bind(this)}>
                            <li>中华区</li>
                            <li>232</li>
                            <li>21</li>
                            <li>21</li>
                            <a className="icon" href="javascript:;"></a>
                        </ul>

                    </div>

                </div>
            </div>
        )
    }

}