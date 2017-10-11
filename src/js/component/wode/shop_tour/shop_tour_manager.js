/**
 * Created by jiminze on 2017/10/9.
 */

//巡店管理

import React from 'react';
import Picker from 'react-mobile-picker';
import '../../../../style/header.scss';
import '../../../../style/position_success.scss';
import back from '../../../../images/back.png';
import position from '../../../../images/positioning.png';
import dropMenu from '../../../../images/drop_menu.png';

const optionGroups={
    prov:["北京"],
    city:["北京"],
    county:["海淀"]
};

export default class ShopTourManager extends React.Component{

    constructor(){
        super();
        this.state = {

            valueGroups:{"prov":"北京","city":"北京","county":"海淀"},

        }
    }

    // Update the value in response to user picking event
    handleChangedd(name, value,e){
        console.log('尝试',name,value,e);
        this.setState(
            ({valueGroups}) => ({
                valueGroups: {
                    ...valueGroups,
                    [name]: value
                }
            }));
        this.setState({
            shopType:value
        })
    };

    render(){


        return (
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
                        {/*{storeList}*/}
                    </ul>
                </div>

                <div className="big-screem">
                    <div className="content">
                        <header>选择省市区<a href="javascript:;" onClick={this.checkOk.bind(this)}>完成</a></header>
                        <Picker
                            itemHeight = '30'
                            height="280"
                            optionGroups={optionGroups}
                            valueGroups={this.state.valueGroups}
                            onChange={this.handleChangedd.bind(this)} />
                    </div>
                </div>



            </div>
        )

    }

}