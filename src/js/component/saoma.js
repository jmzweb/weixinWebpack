import React from 'react';

import {hex_sha1} from './lib/sha1';

import '../../style/header.scss';
import '../../style/saoma.scss';

import saoma from '../../images/saoma-icon.png';
import reqwest from 'reqwest';
import Teem from './lib/page';
const teem = new Teem();


class SaomaView extends React.Component{

    handleSaoma(){
        this.wxConfig();
        // alert(1);
        wx.ready(()=>{
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var _result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    const result = isNaN(parseFloat(_result)) ? _result.split(',')[1] : _result;
                    if(result === ''){
                        location.href = './#/saoerr';
                    }else{
                        reqwest({
                            url:`${teem.get('accessToke')}sell/comp_sn`,
                            method: 'post',
                            type: 'json',
                            data:{
                                sn:result,
                            }
                        }).then((data) => {
                            if(data.code === 0){
                                teem.set('sn',result);
                                teem.set('sn_time',teem.formatDateTime(Date.parse(new Date())));
                                location.href = './#/saomasellrp?code='+teem.get('code');
                            }else if(data.code !== 0){
                                switch (data.code){
                                    case 403:
                                        teem.set('snMsg','设备SN码验证有误');
                                        break;
                                    case 801:
                                        teem.set('snMsg','SN码不属于出厂记录');
                                        break;
                                    case 805:
                                        teem.set('snMsg','SN码已被销售');
                                        break;
                                    case 806:
                                        teem.set('snMsg','SN码已经激活');
                                        break;
                                    case 808:
                                        teem.set('snMsg','SN码录入数量超过上限，感觉您对糖猫的支持');
                                        break;
                                    case 818:
                                        teem.set('snMsg','售后SN码不在奖励范围，请上传其他SN码');
                                        break;
                                    default:
                                        teem.set('snMsg','设备SN码验证有误');
                                        break;
                                }
                                location.href = './#/saoerr?code='+teem.get('code');
                            }
                        })
                    }
                }
            });
        })



    }

    wxConfig(){
        let timestamp = Date.parse(new Date())/1000;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + teem.get('href') ];
        vars = vars.sort();
        console.log(ticked);
        let string1 = vars.join('&');
        let signature = hex_sha1(string1);
        wx.config({
            debug: false,
            appId:teem.get('appId'),
            timestamp:timestamp,
            nonceStr:'teemo',
            signature:signature,
            jsApiList:[
                'scanQRCode',
                'hideOptionMenu',
                'closeWindow',
            ]
        });
    }

    render(){
        return(
            <div className="container">
                <header className="myHeader">扫一扫</header>
                <div className="infoToAdd">
                    <dl><dt><a onClick={this.handleSaoma.bind(this)}><img src={saoma}/></a></dt><dd>点击扫码</dd><dd>请扫描盒子上的SN条码或二维码</dd></dl>
                </div>
            </div>
        )
    }
}

export default SaomaView;