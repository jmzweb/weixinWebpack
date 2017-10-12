import React from 'react';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import back from '../../../../images/back.png';
import marketPic from '../../../../images/market-pic.png';
import marketName from '../../../../images/market-name-icon.png';

class MyTimoMarketUser extends React.Component{


    constructor(){
        super();
        this.state={
            _address:'',
            storeName:'',
            //只能提交一次
            tTflag:true,

            provId:0,
            cityId:0,
            countyId:0,
            serverId1:0,
            serverId2:0,
            nowlo:0,
            nowla:0,
            shopPhoto:'',
            counterPhoto:'',
        }
    }

    handleAddress(e) {
        console.log(e.target.value);
        this.setState({
            _address: e.target.value

        })
    }
    handleStorename(e){
        console.log(e.target.value);
        this.setState({
            storeName: e.target.value

        })
    }

    handleRevise(){

        if(this.state.tTflag){
            this.setState({tTflag:false});
            const storeName = this.state.storeName === '' ? '店名不可为空':'';
            const _address = this.state._address === '' ? '详细地址不可为空':'';
            const shopType = this.state.shopType === '' ? '请选择店铺类型':'';
            const fruits = this.state.fruits === '' ? '请选择主营系列':'';
            const shopPhoto = this.state.shopPhoto === '' ? '请拍照店铺照片':'';
            const counterPhoto = this.state.counterPhoto === '' ? '请拍照柜台照片':'';
            let total = '';
            let totalList = [storeName,_address,shopType,shopPhoto,counterPhoto,fruits];
            totalList.length > 0 ? totalList.map((obj,index)=>{
                if(totalList.length>index+1&&obj!==''){total+=obj+'/'}else{total+=obj}
            }):'';
            if(storeName==='' && _address==='' && shopType==='' && shopPhoto==='' && counterPhoto==='' && fruits === ''){ // && shopPhoto==='' && counterPhoto===''
                this.setState({flagTip:false,});
                let _allow = 0;
                this.state.shopTypeList.map(obj=>{
                    if(obj.name === this.state.shopType){_allow =  obj.id}
                });
                // alert(_allow);
                let _data = {
                    "shopName":this.state.storeName,
                    "address":this.state._address,
                    shopPhoto:this.state.serverId1,//
                    // "shopPhoto":123,//
                    counterPhoto:this.state.serverId2,//
                    // "counterPhoto":123,//

                    // "longitude":116.407526,
                    longitude:this.state.nowlo,
                    // "latitude":39.90403,
                    latitude:this.state.nowla,
                    "provId":this.state.provId,
                    "cityId":this.state.cityId,
                    "countyId":this.state.countyId,
                };
                console.log(_data.shopType);
                reqwest({
                    url:`${teem.get('accessToke')}user/create_shop`,
                    method: 'post',
                    type: 'json',
                    data:_data,
                    contentType:'application/x-www-form-urlencoded;charset=utf-8',
                }).then(data=>{
                    if(data.code === 0 || data.code === 200 ){
                        location.href = './#/review/load';

                    } else {
                        alert(data.msg);
                        this.setState({
                            tTflag:true,
                        })
                    }

                })

            } else {
                this.setState({
                    flagTip:true,
                    msg:total,
                    tTflag:true,
                })

            }
        }


    }

    handleShop(){
        this.wxConfig();
        const _this = this;
        wx.ready(()=>{
            var localIds;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    _this.setState({
                        shopPhoto:localIds
                    });
                    wx.uploadImage({
                        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            _this.setState({
                                serverId1:serverId,
                            });
                        }
                    })
                }
            });
        })
    }
    //
    handleCounty(){
        this.wxConfig();
        const _this = this;
        var localIds;
        wx.ready(()=>{
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    _this.setState({
                        nowlo:longitude,
                        nowla:latitude,
                    })
                }
            });
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
                success: function (res) {
                    localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    _this.setState({
                        counterPhoto:localIds
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


        });

    }
    //config
    wxConfig(){
        let timestamp = Date.parse(new Date())/1000;
        const noncestr = 'teemo';
        const ticked = teem.get('ticks');
        const _href = location.href.split('#')[0];
        let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + _href ];
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
                'getLocation',
            ]
        });
    }

    render(){

        let item  = [];
        // let storeList = [];
        // arr.length>0 ? JSON.parse(arr).map((obj)=>(
        //     // console.log(obj),
        //     item.push(
        //         <li className={this.state.flag == obj.id? 'active':''} key={obj.id} onClick={this.handleLi.bind(this,obj.id)}>{obj.fullName}</li>
        //     )))
        //     :
        //     '';

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;" onClick={()=>{window.history.go(-1)}}><img src={back}/></a>新建店铺</header>

                <div>
                    <section className="create-market">
                        <header>位置<small onClick={()=>{this.setState({left:'0'})}}>{`${this.state.province},${this.state.city},${this.state.county}`}</small></header>
                        <address className="input-next"><input id="detailAddress" type="text" placeholder="请输入店铺地址" value={this.state._address} onChange={this.handleAddress.bind(this)}/></address>
                    </section>
                    <section className="create-market">
                        <img className="market-name" src={marketName}/><div><input id="marketName" placeholder="请输入店铺名称" type="text"value={this.state.storeName} onChange={this.handleStorename.bind(this)}/></div>
                    </section>
                    <section className="create-market">
                        <header className="market-picture">照片</header>
                        <ul className="market_file_pic">
                            <li onClick={this.handleShop.bind(this)}>
                                {
                                    this.state.shopPhoto === ''?
                                        (<a className="txt">请上传店铺照片</a>) :
                                        (<a><img src={this.state.shopPhoto}/></a>)
                                }

                            </li>
                            <li onClick={this.handleCounty.bind(this)}>
                                {
                                    this.state.counterPhoto === ''?
                                        (<a className="txt">请上传柜台照片</a>) :
                                        (<a><img src={this.state.counterPhoto}/></a>)
                                }
                            </li>
                        </ul>
                    </section>
                    <div className="btn-group-management" style={{paddingBottom:40}}><a className="btn" href="javascript:;" onClick={this.handleRevise.bind(this)}  disabled={this.state.tTflag} style={{background:this.state.tTflag?'#71aaf0':'#c1c3c5'}}>提交店铺</a></div>
                    <div className="chose_show_area"
                         style={{left:this.state.left}}
                         onClick={()=>{this.setState({left:''})}}>
                        <header>请选择区县</header>
                        <ul>{item}</ul></div>
                    {
                        this.state.flagTip?(<div id="tip" className="tip" style={{display:'block'}}>{this.state.msg}</div>) :(<div id="tip" className="tip" style={{display:'none'}}></div>)
                    }

                </div>
            </div>
        )
    }
}

export default MyTimoMarketUser;