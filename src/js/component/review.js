import React from 'react';
import '../../style/header.scss';
import '../../style/send_success.scss';
import back from '../../images/back.png';
import addMarket from '../../images/add_market.png';
import add from '../../images/add-icon.png'

import reqwest from 'reqwest';
import {hex_sha1} from './lib/sha1';
import Teem from './lib/page';
const teem = new Teem();

class Review extends React.Component{

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
            //是否是手机物理键
            keyObj:true,
        };

    }

    handleAdd(){
        location.href = './#/review';
    }

    componentWillMount(){

        switch (this.props.params.part){
            case 'load':
                this.setState({
                    title:'提交成功',
                    val:0,
                    imgVisitily:'none',
                });
                break;
            case 'error':
                this.setState({
                    title:'审核失败',
                    val:1,
                    imgVisitily:'none',
                });
                break;
            case 'add':
                this.setState({
                    title:'提交成功',
                    val:2,
                    imgVisitily:'block',
                });
                break;
            case 'success':
                this.setState({
                    title:'审核成功',
                    val:3,
                    imgVisitily:'none',
                });
                break;
        }

    }


    wxConfig(){
        let timestamp = Date.parse(new Date())/1000;
        const url1 = location.href;
        const url = `${url1}`;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + url ];
        vars = vars.sort();
        console.log(url);
        let string1 = vars.join('&');
        let signature = hex_sha1(string1);
        wx.config({
            debug: false,
            appId:teem.get('appId'),
            timestamp:timestamp,
            nonceStr:'teemo',
            signature:signature,
            jsApiList:[
                'checkJsApi',
                'getLocation',
                'hideOptionMenu',
                'scanQRCode',
                'closeWindow'
            ]
        })

    }
    componentDidMount(){
        // setTimeout(()=>{
        //     this.setState({keyObj:true});
        // },1500)

    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextState.keyObj);
        console.log('window',  window.history.length);
        this.wxConfig();
        wx.ready(()=>{
            wx.hideOptionMenu();
            window.addEventListener("popstate", function(e) {
                if(nextState.keyObj){
                    console.log('close');
                    wx.closeWindow();
                }else {
                    console.log('关闭浏览器',2);
                }
            }, false);
        })

        // return true;
    }

    handleClose(){

        this.wxConfig();
        wx.ready(()=>{
            wx.hideOptionMenu();
            wx.closeWindow();
        });

    }

    addStore(){
        this.state.keyObj = false;
        this.setState({keyObj:false});
        location.href = './#/getlocation?code='+teem.get('code');

    }

    render(){

        const margin = {
            paddingLeft:20,
            paddingRight:20
        };

        const child  = this.state.val === 0 ?
            (<div className="infoToAdd">
                <dl><dt><img src={addMarket}/></dt><dd style={margin} >您提交的店铺信息已经收到，我们将在一个工作日内完成审核，感谢您对糖猫的支持。</dd></dl>
            </div>)
            :
            this.state.val === 2 ?
            (<div>
                <div className="infoToAdd">
                    <dl><dt><img src={addMarket}/></dt><dd style={margin}>提交成功，请加入店铺，如果店铺不存在请创建新店铺。</dd></dl>
                </div>
                <div className="btn-group-add">
                    <a id="addStore"
                       href="javascript:;"
                       className="add_market"
                       onClick={this.addStore.bind(this)}><img src={add}/>添加店铺</a>
                    <a href="javascript:;"
                       className="btn_back"
                       onClick={this.handleClose.bind(this)}>返回</a>
                </div>
            </div>)
            :
                this.state.val === 1 ?
                    (<div>
                        <div className="infoToAdd">
                            <dl><dt><img src={addMarket}/></dt><dd>提交失败</dd></dl>
                        </div>
                        <div className="btn-group-add">

                            <a href="javascript:;" className="btn_back" onClick={this.addStore.bind(this)}>返回</a>
                        </div>
                    </div>)
                    :
                    this.state.val === 3 ?
                        (<div>
                            <div className="infoToAdd">
                                <dl><dt><img src={addMarket}/></dt><dd style={margin} >信息创建成功，请开始售卖糖猫获取丰厚奖励吧</dd></dl>
                            </div>
                            <div className="btn-group-add">
                                <a href="javascript:;" className="btn_back" onClick={this.handleClose.bind(this)}>确定</a>
                            </div>
                        </div>)
                        :
                        '';



        return(
            <div className="container">
                {/**/}
                <div className="container">
                    <header className="myHeader">
                        <a className="btn-back" style={{top:12}} id="javascript:;" onClick={this.handleClose.bind(this)}>
                        <img style={{display:this.state.imgVisitily}}
                             src={back}/></a>{this.state.title}</header>
                    {child}
                </div>
            </div>
        )
    }
}

export default Review;