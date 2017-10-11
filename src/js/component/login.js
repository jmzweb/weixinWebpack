import React from 'react';
import '../../style/header.scss';
import '../../style/login.scss';
import back from '../../images/back.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            userPhone:'',
            userTicket:'',
            username:'',
            userCard:'',
            aTex:'获取验证码',
            flag:false,
            msg:''
        };

    }

    //点击提交
    handleSubmit(){
        const userMsg = !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.state.userPhone)) ? '手机号错误' : '';
        const ticket = this.state.userTicket === '' ? '验证码不为空' : '';
        const username = this.state.username === '' ? '姓名不为空' : '';
        const userCard = this.state.userCard === '' ? '身份证错误' : '';
        let arr = '';
        let arrList = [userMsg,ticket,username,userCard];
        arrList.length > 0 ? arrList.map((obj,index)=>{
            if(arrList.length>index+1){arr+=obj+'/'}else{arr+=obj}
        }):'';
        if(userMsg === '' && ticket === '' && username === '' && userCard === ''){
            reqwest({
                url:`${teem.get('accessToke')}user/create_user`,
                method: 'post',
                type: 'json',
                data:{
                    userName:this.state.username,
                    phoneNumber:this.state.userPhone,
                    idCard:this.state.userCard,
                    code:this.state.userTicket,
                }
            }).then((data) => {
                if(data.code === 0){
                    this.setState({flag:false});
                    teem.set('id',data.data.id);
                    location.href = './#/review/add?code='+teem.get('code');
                }else if(data.code ===1){
                    this.setState({flag:true,msg:data.msg});
                }
            })
        }
        else
        {
            this.setState({flag:true,msg:arr})
        }
    }
    //
    handlePhone(obj){
        console.log(obj.target.value);
        this.setState({
            userPhone:obj.target.value
        })
    }
    handleTicket(obj){
        console.log(obj.target.value);
        this.setState({
            userTicket:obj.target.value
        })
    }
    handlename(obj){
        console.log(obj.target.value);
        this.setState({
            username:obj.target.value
        })
    }
    handleCard(obj){
        console.log(obj.target.value);
        this.setState({
            userCard:obj.target.value
        })
    }
    //
    handleMsg(e){

        console.log('clickMsg',e);

        let tt = 56;

        if(this.state.userPhone !== ''||this.state.userPhone !== undefined){
            console.log(this.state.userPhone);
            reqwest({
                url:`${teem.get('accessToke')}user/send_code`,
                method: 'post',
                type: 'json',
                data:{
                    phoneNumber:this.state.userPhone,
                }
            }).then((data) => {
                if(data.code === 0){
                    const abc = setInterval(()=>{
                        --tt;
                        if(tt>0)
                        {
                            this.setState({aTex:tt,})
                        }
                        else{
                            clearInterval(abc);
                            this.setState({aTex:'获取验证码',})
                        }
                    },1000);
                    console.log('已发送');
                }else if(data.code ===803){
                    console.log('发送验证码太频繁了');
                }
            })
        }

    }

    //返回键  === 监听




    render(){
        return(
            <div className="container">
                <header className="myHeader">新晋加盟</header>
                <form>
                    <div className="login">
                        <ul>
                            <li><label className="info info1" for="#userPhone"></label>
                                <input id="userPhone"
                                       type="text"
                                       placeholder="请输入手机号码"
                                       value={this.state.userPhone}
                                       onChange={this.handlePhone.bind(this)}/>
                                <a href="javascript:;" className="getMsg" onClick={this.handleMsg.bind(this)}>
                                    {this.state.aTex}</a></li>
                            <li><label className="info info2" for="#userTicket"></label>
                                <input id="userTicket"
                                       type="text"
                                       placeholder="短信验证码"
                                       value={this.state.userTicket}
                                       onChange={this.handleTicket.bind(this)}/></li>
                        </ul>
                        <ul>
                            {/*<!--<li><label className="info info3" for="#username"></label><input id="username" type="text" placeholder="请输入验证密码" /></li>-->*/}
                            <li><label className="info info4" for="#username"></label>
                                <input id="username"
                                       type="text"
                                       placeholder="输入完整姓名"
                                       value={this.state.username}
                                       onChange={this.handlename.bind(this)}/></li>
                            <li><label className="info info5" for="#userCard"></label>
                                <input id="userCard"
                                       type="text"
                                       placeholder="请输入身份证号"
                                       value={this.state.userCard}
                                       onChange={this.handleCard.bind(this)}/></li>
                        </ul>
                    </div>
                    {
                        this.state.flag?(<div id="tip" className="tip" style={{display:'block'}}>{this.state.msg}</div>) :(<div id="tip" className="tip" style={{display:'none'}}></div>)
                    }

                    <div className="btn-group"><a id="btnSubmit" onClick={this.handleSubmit.bind(this)} className="btn" href="javascript:;">提交申请</a></div>
                </form>
            </div>
        )
    }
}

export default Login;