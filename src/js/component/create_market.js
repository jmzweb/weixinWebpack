import React from 'react';
import {Checkbox,CheckboxGroup} from 'react-checkbox-group';
import Picker from 'react-mobile-picker';
import '../../style/header.scss';
import '../../style/create_market.scss';
import back from '../../images/back.png';
import marketName from '../../images/market-name-icon.png';

import DropMenu from '../../images/drop_menu.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
import {hex_sha1} from './lib/sha1';
const teem = new Teem();

// const typeArre = [
//     {
//         id:9,
//         name:'手表',
//         devices:[
//             {id: 1, name: "T1"},
//             {id: 2, name: "T2"},
//             {id: 3, name: "E1"},
//             {id: 4, name: "M1"},
//             {id: 5, name: "COLOR"},
//             {id: 6, name: "HERO"}
//         ]
//     },
//     {
//         id:8,
//         name:'糖猫之家',
//         devices:[
//             {id: 7, name: "Basic"},
//             {id: 8, name: "T3"},
//             {id: 9, name: "Basic2"},
//         ]
//     }
// ]


class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            _address:'',
            storeName:'',
            //
            shopTypeList:[],
            businessTypeList:[],
            //
            shopPhoto:'',
            counterPhoto:'',
            //
            shopType:'',
            //
            province:'',
            provId:'',
            city:'',
            cityId:'',
            county:'',
            countyId:'',
            districts:[],
        //    jing du
            nowlo:'',
            //wei du
            nowla:'',
        //
            left:'',
        //    图片
            serverId1:'',
            serverId2:'',
            //
            flagTip:false,
            //msg
            msg:'',
            //
            types:'',
            //测试
            displays:'none',
            //
            fruits:'',
            fruitsBig:'',
            fruitsObj:{},
            //尝试radio
            valueGroups:{},
            optionGroups:{},
            //只能提交一次
            tTflag:true,
        };

    }
    //
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

    //
    submitStore(){

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
                    "shopType":_allow,
                    // "longitude":116.407526,
                    longitude:this.state.nowlo,
                    // "latitude":39.90403,
                    latitude:this.state.nowla,
                    "provId":this.state.provId,
                    "cityId":this.state.cityId,
                    "countyId":this.state.countyId,
                    "mainBusiness":JSON.stringify(this.state.fruitsObj),
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
    //获取店铺类型
    shopType(){
        const _this = this;
        reqwest({
            url:`${teem.get('accessToke')}user/shoptype_list`,
            method: 'get',
            type: 'json',
        }).then((data) => {
            console.log('获取店铺类型',data);
            let $abc = data.data.items.map(obj=>obj.name);
            _this.setState({
                shopTypeList:data.data.items,
                optionGroups:{
                    'first':$abc
                }
            })

        });
    }
    //获取经营业务类型
    businessType(){
        const _this = this;
        reqwest({
            url:`${teem.get('accessToke')}user/device/list`,
            method: 'get',
            type: 'json',
        }).then((data) => {
            _this.setState({
                businessTypeList:data.data.device_info,
            })

        });
    }
    fetchs(){
        const _this = this;
        reqwest({
            url:`${teem.get('accessToke')}user/geo/address?longitude=`+teem.get('longitude')+'&latitude='+teem.get('latitude'),
            method: 'get',
            type: 'json',
        }).then((data) => {
            console.log(data);
            if(data.code === 0){
                _this.setState({
                    province:data.data.province,
                    provId:data.data.provinceId,
                    city:data.data.city,
                    cityId:data.data.cityId,
                    county:data.data.district,
                    countyId:data.data.districtId,
                    districts:data.data.districts,
                })
            }else if(data.code === 1){
                alert('未得到地址信息');
            }
        })
    }
    componentWillMount(){
        this.shopType();
    }
    componentDidMount(){
        //
        this.businessType();

        this.fetchs();
    }

    //
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

    //
    handleShopType(key,e){
        // alert(key);
        this.setState({
            shopType:key,
        })
    }
    handleStoreType(key,e){
        this.setState({
            soteType:key,
        })
    }
    //

    handleLi(key,e){
        console.log(key,' ',e.target.innerHTML);
        this.setState({
            flag:key,
            county:e.target.innerHTML
        });

    }

    handleType(){
        this.setState({types:'timo',displays:'block'});
    }
    handlestore(){
        this.setState({types:'shopType',displays:'block'})
    }

    handle(){
        this.setState({types:''})
    }

    //多选
    fruitsChanged(e,newFruits,s){
        console.log('new',newFruits,e,s.target.value);

        const obj = this.state.fruitsObj;

        const arr = [];
        if(s.target.checked){
            obj[e] = obj[e] !==undefined ? obj[e] : [];
            obj[e].push(s.target.value)
        }else{
            if(obj[`${e}`] != undefined){
                obj[`${e}`].map(item=>s.target.value !==item?arr.push(item):'');
                obj[`${e}`] = arr;
            }
        }

        this.setState({
            fruits: newFruits,
            fruitsObj:obj,
        });
    }
    //
    checkOk(){
        this.setState({displays:'none'})
    }
    // Update the value in response to user picking event
    handleChangedd(name, value){
        console.log('尝试',name,value);
        // alert(name);
        // alert(value);
        this.setState({
            valueGroups:{
                [name]:value
            },
            shopType:value
        });
    };

    render(){

        // console.log(JSON.stringify(this.state.fruitsObj));

        const {businessTypeList,optionGroups,valueGroups} = this.state;
        //店铺类型

        //经营业务类型
        const businessType = businessTypeList.map(obj=>
            (
                <CheckboxGroup
                    name={obj.id}
                    value={this.state.fruits}
                    onChange={this.fruitsChanged.bind(this,obj.id)}>
                    <h3>{obj.name}</h3>
                    <ul className="checkbox">
                        {
                            obj.devices.map(item=>(

                                <li><label htmlFor={item.id}><Checkbox id={item.id} value={item.id} hidden/><label htmlFor={item.id}>{item.name}</label></label></li>
                            ))
                        }
                    </ul>

                </CheckboxGroup>
            )
        );

        const businessValueArr = [];
        businessTypeList.map(obj=>{
            obj.devices.map(item=>{
                this.state.fruits.length>0 ?
                    this.state.fruits.map(fItem=>{
                        if(fItem === item.id){businessValueArr.push(item.name)}
                    })
                    :
                    '';
            })
        });




        //区域
        const arr =this.state.districts !==''?this.state.districts:[];
        let item  = [];
        let storeList = [];
        arr.length>0 ? JSON.parse(arr).map((obj)=>(
            // console.log(obj),
            item.push(
                <li className={this.state.flag == obj.id? 'active':''} key={obj.id} onClick={this.handleLi.bind(this,obj.id)}>{obj.fullName}</li>
            )))
            :
            '';

        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" id="javascript:;" onClick={()=>{location.href='./#/getlocation'}}><img src={back}/></a>新建店铺</header>

                <div>
                    <section className="create-market">
                        <header>位置<small onClick={()=>{this.setState({left:'0'})}}>{`${this.state.province},${this.state.city},${this.state.county}`}</small></header>
                        <address className="input-next"><input id="detailAddress" type="text" placeholder="请输入店铺地址" value={this.state._address} onChange={this.handleAddress.bind(this)}/></address>
                    </section>
                    <section className="create-market">
                        <img className="market-name" src={marketName}/><div><input id="marketName" placeholder="请输入店铺名称" type="text"value={this.state.storeName} onChange={this.handleStorename.bind(this)}/></div>
                    </section>
                    <section className="create-market">
                        <header className="market-type market-timo-type" onClick={this.handleType.bind(this)}>添加主营系列<img src={DropMenu}/><span style={{display:'inline-block',width:100,float:'right',fontSize:16,color:'#999',marginRight:20,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',textAlign:'right'}}>{businessValueArr.toString().replace(/\[.\]/,'')}</span></header>
                        <header className="market-type" onClick={this.handlestore.bind(this)}>选择店铺类型<img src={DropMenu}/><span style={{float:'right',fontSize:16,color:'#999',marginRight:20}}>{this.state.shopType}</span></header>
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
                    <div className="btn-group-management" style={{paddingBottom:40}}><a className="btn" href="javascript:;" onClick={this.submitStore.bind(this)}  disabled={this.state.tTflag} style={{background:this.state.tTflag?'#71aaf0':'#c1c3c5'}}>提交店铺</a></div>
                    <div className="chose_show_area"
                         style={{left:this.state.left}}
                         onClick={()=>{this.setState({left:''})}}>
                        <header>请选择区县</header>
                        <ul>{item}</ul></div>
                    {
                        this.state.flagTip?(<div id="tip" className="tip" style={{display:'block'}}>{this.state.msg}</div>) :(<div id="tip" className="tip" style={{display:'none'}}></div>)
                    }

                </div>

                <div className="big-screem" style={{display:this.state.displays}}>
                    {
                        this.state.types === 'timo' ?
                            (<div className="content">
                                <header>主营系列 <a href="javascript:;" onClick={this.checkOk.bind(this)}>完成</a></header>
                                <div className="main_check_content">
                                    {businessType}
                                </div>
                            </div>)
                                :
                            (
                                <div className="content">
                                    <header>店铺系列 <a href="javascript:;" onClick={this.checkOk.bind(this)}>完成</a></header>
                                    <Picker
                                        itemHeight = '30'
                                        height="280"
                                        optionGroups={optionGroups}
                                        valueGroups={valueGroups}
                                        onChange={this.handleChangedd.bind(this)} />
                                </div>
                            )
                    }

                </div>

            </div>
        )
    }
}

export default Login;
