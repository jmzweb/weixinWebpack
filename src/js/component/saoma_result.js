import React from 'react';
import {hex_sha1} from './lib/sha1';
import '../../style/header.scss';
import '../../style/saoma.scss';
import back from '../../images/back.png';
import saoma from '../../images/saoma-icon.png';
import saomaErr from '../../images/saoma-err-icon.png';
import saomaBtn from '../../images/saoma-btn-icon.png';
import btnPic from '../../images/load-picture-icon.png';
import success from '../../images/success.png';
import reqwest from 'reqwest';
import Teem from './lib/page';
const teem = new Teem();
class sellRp extends React.Component{

    constructor(){
        super();
        this.state = {
            userPhone:'',
            userTicket:'',
            username:'',
            userCard:'',
            aTex:'获取验证码',
            flag:false,
            msg:'',
            val:0,
            title:'',
            imgVisitily:'block',
        };

    }

    componentWillMount(){

        switch (this.props.params.statu){
            case 'load':
                this.setState({
                    title:'提交成功',
                    val:0,
                });
                break;
            case 'error':
                this.setState({
                    title:'提交失败',
                    val:1,
                });
                break;
        }

        (function () {
            window.onpopstate = function(event) {
                // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
                history.pushState({page: 1}, "title 1", document.location);
            };
            history.pushState({page: 1}, "title 1", document.location);
            // history.pushState({page: 2}, "title 2", document.location);
            // history.replaceState({page: 3}, "title 3", document.location);
            // history.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
            // history.back(); // alerts "location: http://example.com/example.html, state: null
            // history.go(2);  // alerts "location: http://example.com/example.html?page=3, state: {"page":3}
        })()
    }

    refreshSaomaend(){
        const _this = this;
        this.wxConfig();
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

                            if(data.code === 0 || data.code === 200){
                                teem.set('sn',result);
                                teem.set('sn_time',teem.formatDateTime(Date.parse(new Date())));
                                location.href = './#/saomasellrp?code='+teem.get('code');
                            }else{
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
                                window.location.href = './#/saoerr?code='+teem.get('code');
                            }
                        })
                    }
                }
            });
        })
    }

    handleClose(){
        this.wxConfig();
        wx.ready(()=>{
            wx.closeWindow();
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

        const child  = this.state.val === 0 ?
            (
                <div>
                    <div className="infoToAdd">
                        <dl><dt><img src={success}/></dt><dd>提交成功,系统审核中...</dd></dl>
                    </div>
                    <div className="btn-group-add">
                        <a href="javascript:;" className="btn_back btn_default" onClick={this.refreshSaomaend.bind(this)}><img src={saomaBtn}/>继续扫码</a>
                        <a href="javascript:;" className="btn_back" onClick={this.handleClose.bind(this)}>返回</a>
                    </div>
                </div>
            )
            :
            this.state.val === 1 ?
                (<div>
                    <div className="infoToAdd">
                        <dl><dt><img src={saomaErr}/></dt><dd>提交失败</dd></dl>
                    </div>
                    <div className="btn-group-add">
                        <a href="javascript:;" className="btn_back" onClick={this.refreshSaomaend.bind(this)}>重新扫码</a>
                    </div>
                </div>)
                :
                '';

        return(
            <div className="container">
                <header className="myHeader">
                    <a className="btn-back" href="javascript:;" onClick={this.handleClose.bind(this)}><img src={back}/></a>
                    {this.state.title}
                </header>
                {child}
            </div>
        )
    }
}

export default sellRp;