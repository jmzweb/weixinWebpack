import React from 'react';
import '../../style/header.scss';
import '../../style/position.scss';
import back from '../../images/back.png';
import position from '../../images/positioning.png';
import loading from '../../images/loading.gif';
import refresh from '../../images/refresh.png';

import reqwest from 'reqwest';
import {hex_sha1} from './lib/sha1';
import Teem from './lib/page';
const teem = new Teem();

class Login extends React.Component{

    constructor(){
        super();
        this.state = {

            flag:true,

        };

    }
    wx_getLocation(){
        const _this = this;
        let timestamp = Date.parse(new Date())/1000;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        const _href = location.href.split('#')[0];
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + _href ];
        vars = vars.sort();
        console.log(ticked);
        let string1 = vars.join('&');
        let signature = hex_sha1(string1);

        console.log(signature);
        console.log(string1);
        wx.config({
            debug: false,
            appId:teem.get('appId'),
            timestamp:timestamp,
            nonceStr:'teemo',
            signature:signature,
            jsApiList:[
                'getLocation',
                'hideOptionMenu',
            ]
        });
        wx.ready(()=>{
            wx.hideOptionMenu();
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    let speed = res.speed; // 速度，以米/每秒计
                    let accuracy = res.accuracy; // 位置精度

                    teem.set('latitude',latitude);
                    teem.set('longitude',longitude);
                    window.location.href = `./#/position/${teem.get('longitude')}/${teem.get('latitude')}`;
                },
                error:function () {
                    _this.setState({flag: false,});
                }
            });
        });
    }

    componentDidMount(){
        this.wx_getLocation();
    }
    handleAdd(){
        console.log(this.state.flag);
        this.setState({
            flag:true,
        })
    }


    render(){

        const children = this.state.flag
            ?
            (<dl><dt><img src={position}/></dt><dd><img src={loading}/>定位当前位置中</dd></dl>)
            :
            (<dl><dt><img src={position}/></dt><dd><img src={refresh}/>定位失败，点此<a id="refreshBtn" href="javascript:;" onClick={this.handleAdd.bind(this)}>重新定位</a></dd></dl>)
        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;"><img src={back}/></a>提交成功</header>
                <div className="positioning">
                    {children}
                </div>
            </div>
        )
    }
}

export default Login;