import React from 'react';
import '../../style/header.scss';
import '../../style/reward.scss';
import back from '../../images/back.png';
import addMarket from '../../images/add_market.png';
import add from '../../images/add-icon.png'
import priceIcon from '../../images/price-icon.png';

class awardDetial extends React.Component{


    awardDetail(){
        location.href = './#/rewardselldetail';
    }

    render(){
        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;"><img src={back}/></a>奖励销售明细</header>
                <ul className="award_detail">
                    <li onClick={this.awardDetail.bind(this)}><h3>SN 3612796102<time>2017-06-07 23:00:00</time></h3><span>已领取</span></li>
                </ul>

            </div>
        )
    }
}

export default awardDetial;