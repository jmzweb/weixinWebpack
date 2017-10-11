import React from 'react';
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
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class sellRp extends React.Component{

    constructor(){
        super();
        this.state = {
            picUrl:'',
            serverId2:'',
            flagTip:false,
            msg:'',
            mmsg:'',

        };

    }

    sumbitSaomad(e){

        const serverId = this.state.serverId2 === undefined || this.state.serverId2 === '' ? '请拍照':'';

        if(this.state.mmsg === ''){
            this.setState({mmsg : '请勿多次提交'});
            setTimeout(()=>{
                if(serverId === ''){
                    reqwest({
                        url:`${teem.get('accessToke')}sell/create_sale`,
                        method: 'post',
                        type: 'json',
                        data:{
                            sn:teem.get('sn'),
                            sellPhoto:this.state.serverId2,
                            buyerName:this.state.userCard,
                            buyerPhone:this.state.userTicket,
                        }
                    }).then((data) => {
                        if(data.code === 0){
                            this.setState({flag:false});
                            teem.set('id',data.data.id);
                            location.href = './#/saoresult/load?code='+teem.get('code');
                        }else if(data.code !==0){

                            // alert(data.message);
                            location.href = './#/saoresult/error?code='+teem.get('code');
                        }
                    })
                }else {
                    this.setState({
                        flagTip:true,
                        msg:serverId,
                        mmsg:'',
                    })
                }
            })

        }else{
            alert(this.state.mmsg);
        }





    }

    handleCamera(){
        const _this = this;
        this.wxConfig();
        wx.ready(()=>{
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    _this.setState({
                        picUrl:localIds,
                    });
                    wx.uploadImage({
                        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            _this.setState({
                                serverId2:serverId,
                            });
                        }
                    })
                }
            });
        })
    }

    wxConfig(){
        let timestamp = Date.parse(new Date())/1000;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + location.href];
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
                'chooseImage',
                'uploadImage',
                'hideOptionMenu',
                'closeWindow',
            ]
        });
    }

    handleClose(){
        this.wxConfig();
        wx.ready(()=>{
            wx.closeWindow();
        })
    }

    render(){

        const $picture = this.state.picUrl === '' ?
            (<dl><dt><img src={btnPic}/></dt><dd>请在SN照片中上传糖猫底部的照片并保证SN码清晰可见.</dd></dl>)
            :
            (<img className="sn-pic" src={this.state.picUrl}/>);

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={this.handleClose.bind(this)}><img src={back}/></a>销售上报</header>
                <div className="saoma-sn">
                    <h3>SN {teem.get('sn')}<small>{teem.get('sn_time')}</small></h3>
                    <p>已核验完成</p>
                </div>
                <div className="saoma-camera-pic" onClick={this.handleCamera.bind(this)}>
                    {$picture}
                </div>
                <div className="btn-group-add btn-group-add-1">
                    <a href="javascript:;" className="btn_back btn_default" onClick={this.sumbitSaomad.bind(this)}>提交</a>
                </div>

                {
                    this.state.flagTip?(<div id="tip" className="tip" style={{display:'block'}}>{this.state.msg}</div>) :(<div id="tip" className="tip" style={{display:'none'}}></div>)
                }

            </div>
        )
    }
}

export default sellRp;