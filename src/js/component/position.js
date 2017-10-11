import React from 'react';
import '../../style/header.scss';
import '../../style/position_success.scss';
import back from '../../images/back.png';
import position from '../../images/positioning.png';
import dropMenu from '../../images/drop_menu.png';

import reqwest from 'reqwest';
import Teem from './lib/page';
const teem = new Teem();

class PositionSuccess extends React.Component{

    constructor(){
        super();
        this.state = {

            left:'',
            flag:'',
            //
            province:'',
            city:'',
            county:'澳门特别行政区',
            districts:[],
            //
            storeList:[],

        };

    }
    fetch(){
        teem.setCookie('wx_od','abcd','2');
        reqwest({
            url:`${teem.get('accessToke')}user/geo/address?longitude=`+this.props.params.j+'&latitude='+this.props.params.w,
            method: 'get',
            type: 'json',
            header:{
                "wx_od":teem.setCookie('wx_od','abcd','2')
            }
        }).then((data) => {
            console.log('address',data);
            if(data.code === 0){
                this.setState({
                    province:data.data.province,
                    city:data.data.city,
                    county:data.data.district,
                    flag:data.data.districtId,
                    districts:data.data.districts,
                });
                this.getNearStore(data.data.districtId);
            }else if(data.code === 1){
                alert('未得到地址信息');
            }
        })
    }
    getNearStore(num){
        console.log('this.state.flag',this.state.flag);
        reqwest({
            url:`${teem.get('accessToke')}user/shop_list?countyId=`+num,
            method: 'get',
            type: 'json',
        }).then((data) => {
            console.log('countyId',data);
            if(data.code === 0){
                this.setState({
                    storeList:data.data.items,
                })
            }else{
                console.log(data.msg);
            }

        })
    }
    componentWillMount(){
        this.fetch();
    }
    // componentDidMount(){
    //     this.getNearStore();
    // }
    handleLi(key,e){
        console.log(key,' ',e.target.innerHTML);
        this.setState({
            flag:key,
            county:e.target.innerHTML
        });
        this.getNearStore(key);

    }
    handleCreate(){
        location.href = './#/createmarket';
    }
    addStore(key,e){
        location.href = './#/mytimemarket/'+key;
        // reqwest({
        //     url:'http://a0.www.teemo.cnuser/add_shop?shopId='+key,
        //     method: 'get',
        //     type: 'json',
        // }).then((data) => {
        //     location.href = './#/mytimemarket/'+key;
        // })
    }
    render(){

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
        this.state.storeList.length > 0 ?
            this.state.storeList.map(obj=>(
                storeList.push(<li key={obj.id}><span>{obj.name}</span><a onClick={this.addStore.bind(this,obj.id)}>加盟</a></li>)
            ))
            :
            '';
        // console.log('districts',item);
        return(
            <div className="container">
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>添加店铺<a className="refresh_position" href="javascript:;" onClick={()=>location.href=`./#/getlocation`}>重定位</a></header>
                <div className="position_succs">
                    <div className="now_position"><img src={position}/>当前定位</div>
                    <div className="now_address" onClick={()=>{this.setState({left:'0'})}}>
                        {this.state.province ===''?
                            (<ul><li>{this.state.province}</li><li>{this.state.city}</li></ul>)
                            :
                            (<ul><li>{this.state.province}</li><li>&nbsp;,&nbsp;{this.state.city}</li></ul>)
                        }
                        <ul><li>区域</li><li><a id="choseArea" href="javascript:;">&nbsp;:&nbsp;{this.state.county}</a></li></ul>
                        <label for="choseArea"><img src={dropMenu}/></label>
                    </div>
                </div>
                <div className="position_succs_info">
                    <h3 className="position_succs_header">附近店铺<a onClick={this.handleCreate.bind(this)}>+新建</a></h3>
                    <ul>
                        {storeList}
                    </ul>
                </div>
                <div className="chose_show_area"
                     style={{left:this.state.left}}
                     onClick={()=>{this.setState({left:''})}}>
                    <header>请选择区县</header>
                    <ul>{item}</ul></div>
            </div>
        )
    }
}

export default PositionSuccess;