import React from 'react';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import back from '../../../../images/back.png';
import marketPic from '../../../../images/market-pic.png';

class MyTimoMarketUser extends React.Component{


    render(){
        return(
            <div className="big-scroll"><div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;"><img src={back}/></a>店铺详情<a className="refresh_position" href="javascript:;">变更</a></header>
                <div className="timo_market">
                    <div className="timo_sell_user"><h3 className="user_market">小蛮牛的店铺<small>主营：<a>T1,T2系列</a></small></h3><div className="mark"><span>已认证</span></div></div>
                    <div className="now_address">
                        <div><address>河北省，承德市，西城区</address></div>
                        <div>惠新西街东口 新思小区23号楼3号底商</div>
                    </div>
                </div>
                <div className="timo_market_picture">
                    <ul><li><img src={marketPic}/></li><li><img src={marketPic}/></li></ul>
                </div>
                <div className="btn-group-management"><a className="btn btn-small btn-bg-default" href="javascript:;">更新店铺</a></div>
            </div></div>
        )
    }
}

export default MyTimoMarketUser;