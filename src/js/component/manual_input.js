import React from 'react';
import '../../style/header.scss';
import '../../style/saoma.scss';
import Teem from './lib/page';
const teem = new Teem();
import reqwest from 'reqwest';
class ManualInput extends React.Component{

    constructor(){
        super();
        this.state = {
            sncode:'',
        };

    }

    refreshSaoma(){
        // alert('click');
        reqwest({
            url:`${teem.get('accessToke')}sell/comp_sn`,
            method: 'post',
            type: 'json',
            data:{
                sn:this.state.sncode.toString(),
            }
        }).then((data) => {
            // alert(1);
            if(data.code === 200 || data.code === 0){
                teem.set('sn',this.state.sncode);
                teem.set('sn_time',teem.formatDateTime(Date.parse(new Date())));
                location.href = './#/saomasellrp?code='+teem.get('code');
            }else {
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

    handlesncode(obj){
        console.log(obj.target.value);
        this.setState({
            sncode:obj.target.value
        })
    }

    render(){
        return(
            <div className="container">
                <header className="myHeader"></header>
                <div className="manual_input">
                    <span>SN</span>
                    <div className="contant_input">
                        <input type="text"
                               placeholder="请输入SN码"
                               value={this.state.sncode}
                               onChange={this.handlesncode.bind(this)}/>
                    </div>
                </div>
                <div className="btn-group-add">
                    <a href="javascript:;" className="btn_back btn_default" onClick={this.refreshSaoma.bind(this)}>下一步</a>
                </div>

            </div>
        )
    }
}

export default ManualInput;
