import React from 'react';
import '../../style/header.scss';
import '../../style/my_timo_market.scss';
import back from '../../images/back.png';
import marketPic from '../../images/market-pic.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
const teem = new Teem();

class MyTimoMarket extends React.Component{

    constructor(){
        super();
        this.state = {

            province:'',
            city:'',
            county:'澳门特别行政区',
            shopAddress:'澳门特别行政区',
            shopImage:'',
            shopName:'',
            counterImage:'',
            mainBusiness:[],

        };

    }

    fetch(){
        reqwest({
            url:`${teem.get('accessToke')}user/query_shop?shopId=`+this.props.params.shopId,
            method: 'get',
            type: 'json',
        }).then((data) => {
            console.log('shopId',data);
            if(data.code === 0){
                let mainBus = data.data.main_business === undefined ? [] : data.data.main_business;
                this.setState({
                    province:data.data.provDesc,
                    // provId:data.data.provinceId,
                    city:data.data.cityDesc,
                    // cityId:data.data.cityId,
                    county:data.data.countyDesc,
                    // countyId:data.data.districtId,
                    shopAddress:data.data.shopAddress,
                    shopImage:data.data.shopImage,
                    shopName:data.data.shopName,
                    counterImage:data.data.counterImage,
                    mainBusiness:mainBus,
                })
            }else if(data.code === 1){
                alert('未得到地址信息');
            }
        })
    }

    componentWillMount(){
        this.fetch();
    }

    handleExamine(){
        reqwest({
            url:`${teem.get('accessToke')}user/add_shop?shopId=`+this.props.params.shopId,
            method: 'post',
            type: 'json',
        }).then((data) => {
            console.log('id',data);
            if(data.code === 0){

                location.href = `./#/review/success`;
            }else if(data.code === 1){
                alert('未得到地址信息');
            }
        })
    }

    render(){

        const {mainBusiness} = this.state;

        const bussinessType = mainBusiness.length > 0 ?
            mainBusiness.map(obj=>{
                obj.devices.map(item=>item.id+' ')
            })
            :
            'T1,T2';

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;" onClick={()=>{location.href='./#/getlocation'}}><img src={back}/></a>店铺详情</header>
                <div className="timo_market">
                    <div className="timo_sell_user"><h3 className="user_market">{this.state.shopName}<small>已认证</small></h3></div>
                    <div className="now_address">
                        <div><address>{this.state.province}，{this.state.city}，{this.state.county}</address></div>
                        <div>{this.state.shopAddress}</div>
                    </div>
                    <div className="now_buss">
                        主营：<a>{bussinessType}系列</a>
                    </div>
                </div>
                <div className="timo_market_picture">
                    <ul><li><img src={this.state.shopImage}/></li><li><img src={this.state.counterImage}/></li></ul>
                </div>
                <div className="btn-group"><a className="btn" href="javascript:;" onClick={this.handleExamine.bind(this)}>加盟店铺</a></div>
            </div>
        )
    }
}

export default MyTimoMarket;