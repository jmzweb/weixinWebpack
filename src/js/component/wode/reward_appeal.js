import React from 'react';
import '../../../style/header.scss';
import '../../../style/reward.scss';
import back from '../../../images/back.png';
import reqwest from 'reqwest';
import Teem from '../lib/page';
import {hex_sha1} from '../lib/sha1';
const teem = new Teem();

class RewardAppeal extends React.Component{
    constructor(){
        super();
        this.state = {

            imgUrl:'',
            textare:'',
            serverId3:'',
            flagTip:false,
            msg:'',
        };

    }

    handleApplyNow(){
        const serverId = this.state.serverId2 === undefined || this.state.serverId2 === '' ? '请拍照':'';

        if(serverId !== ''){
            reqwest({
                url:`${teem.get('accessToke')}/wx/cash/sn_appeal`,
                method:'post',
                data:{
                    SN:this.props.params.sn,
                    pic:this.state.serverId3,
                    remark:this.state.textare,
                }
            }).then(data=>{
                if(data.code === 0 ){
                    console.log('success');
                    // location.href = './#/rewardcash';
                    window.history.go(-1);
                }else{
                    alert(data.msg);
                }
            })
        }else{
            this.setState({
                flagTip:true,
                msg:serverId,
            })
        }

    }

    handleChangePic(){

        this.wxConfig();
        const _this = this;
        var localIds;
        wx.ready(()=>{
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
                success: function (res) {
                    localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    _this.setState({
                        imgUrl:localIds
                    });
                    wx.uploadImage({
                        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            _this.setState({
                                serverId3:serverId,
                            });
                        }
                    })
                }
            });


        });

    }

    //config
    wxConfig(){
        let timestamp = Date.parse(new Date())/1000;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + location.href ];
        vars = vars.sort();
        console.log(ticked);
        console.log(teem.get('href'));
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
            ]
        });
    }

    handleText(e){
        this.setState({
            textare:e.target.value,
        })
    }

    render(){
        return(
            <div className="container">
                <header className="myHeader">
                    <a className="btn-back" href="javascript:;" onClick={()=>window.history.go(-1)}><img src={back}/></a>
                    申诉
                </header>
                <div className="take_photo">
                    <h4 className="take-appeal-info">上传销售凭证</h4>
                    <div onClick={this.handleChangePic.bind(this)}>
                        {
                            this.state.imgUrl === '' ?
                                (<a>请上传机打销售凭证<br/>或手写发票加盖公章的照片</a>)
                                :
                                (<img src={this.state.imgUrl}/>)

                        }
                    </div>
                </div>
                <div className="take_photo take-margin">
                    <h4 className="take-appeal-info">申诉备注</h4>
                    <div className="complaint-note-div"><textarea className="complaint-note" placeholder="请填写..." value={this.state.textare} onChange={this.handleText.bind(this)}> </textarea></div>
                </div>
                <div className="btn_for_cash reward_btn">
                    <a href="javascript:;" className="btn_back btn_default" onClick={this.handleApplyNow.bind(this)}>立即申诉</a>
                </div>
                {
                    this.state.flagTip?(<div id="tip" className="tip" style={{display:'block'}}>{this.state.msg}</div>) :(<div id="tip" className="tip" style={{display:'none'}}></div>)
                }
            </div>
        )
    }
}

export default RewardAppeal;