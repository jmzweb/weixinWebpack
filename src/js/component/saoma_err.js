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
const teem = new Teem();
class SaomaView extends React.Component{

    constructor(){
        super();
        this.state = {
            snMsg:teem.get('snMsg')
        }
    }

    refreshSaomad(){
        const _this = this;
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
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                    case 801:
                                        teem.set('snMsg','SN码不属于出厂记录');
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                    case 805:
                                        teem.set('snMsg','SN码已被销售');
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                    case 806:
                                        teem.set('snMsg','SN码已经激活');
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                    case 808:
                                        teem.set('snMsg','SN码录入数量超过上限，感觉您对糖猫的支持');
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                    case 818:
                                        teem.set('snMsg','售后SN码不在奖励范围，请上传其他SN码');
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                    default:
                                        teem.set('snMsg','设备SN码验证有误');
                                        _this.setState({
                                            snMsg:teem.get('snMsg')
                                        });
                                        break;
                                }

                            }
                        })
                    }
                }
            });
        })
    }
    manualInput(){
        location.href = './#/manual';
    }
    handleClose(){
        wx.ready(()=>{
            wx.closeWindow();
        })
    }

    render(){

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;" onClick={this.handleClose.bind(this)}><img src={back}/></a>失败</header>
                <div className="infoToAdd">
                    <dl><dt><img src={saomaErr}/></dt><dd>{this.state.snMsg}<br/>请重新扫码</dd></dl>
                </div>
                <div className="btn-group-add">
                    <a href="javascript:;" className="btn_back btn_default" onClick={this.refreshSaomad.bind(this)}><img src={saomaBtn}/>重新扫码</a>
                    <div className="type_to_change">
                        <a href="javascript:;" className="" onClick={this.manualInput.bind(this)}>手动输入SN码</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default SaomaView;