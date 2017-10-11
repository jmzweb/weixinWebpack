/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';
import Reqwest from 'reqwest';
import '../../../../style/header.scss';
import '../../../../style/my_timo_market.scss';
import './store_style.scss';
import back from '../../../../images/back.png';

export default class Inventory extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'库存',
            _data:[
                {
                    id:0,
                    name:'T1系列',
                    count:12,
                    maxCount:12,
                },
                {
                    id:1,
                    name:'T2系列',
                    count:12,
                    maxCount:12,
                }
            ]
        }
    }

    componentWillMount(){
        Reqwest({
            url:``,
            method:`get`,

        }).then(data=>{
            this.setState({
                // role:data.data.role,
            })
        })
    }

    handleAClick(e){
        console.log(e);
        this.setState({
            role:'temple'
        })

    }

    handleDetailFor(e){
        console.log(e);
        this.setState({
            lttile:e,
            role:'users'

        })
    }

    handleMinus = (count,key,obj)=>{
        // console.log(count,key)
        // console.log(JSON.stringify(this.state._data))
        const {_data} = this.state;
        _data.map(obj=>{if(obj.id === key && obj.count>0){obj.count--}});
        this.setState({_data})
    }
    handleAdd = (count,key,obj)=>{
        const {_data} = this.state;
        _data.map(obj=>{if(obj.id === key && obj.count<obj.maxCount){obj.count++}});
        this.setState({_data})
    }
    changeNumber = (count,key,obj)=>{
        // console.log(count,key,obj.target.value);
        const reg = new RegExp("^[0-9]*$");
        const {_data} = this.state;
        _data.map(item=>{
            if(
                item.id === key &&
                obj.target.value>-1 &&
                obj.target.value<item.maxCount+1 &&
                reg.test(obj.target.value)
            ){
                item.count = obj.target.value
            }
        });

        this.setState({_data})
    }

    render(){

        const _data = this.state._data;

        const _children = _data.map(obj =>
            <div className="inventory-item">
                <span className="inventory-item-text">{obj.name}</span>
                <div className="inventory-item-count">
                    <span className="inventory-btn" onClick={this.handleMinus.bind(this,obj.count,obj.id)}>-</span>
                    <span><input type="number" value={obj.count} onChange={this.changeNumber.bind(this,obj.count,obj.id)}/></span>
                    <span className="inventory-btn active" onClick={this.handleAdd.bind(this,obj.count,obj.id)}>+</span>
                </div>
            </div>
        )

        return (
            <div className="big-scroll">
                <div className="container">
                    <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>{this.state.lttile}</header>
                    <div className="inventory-list">
                        {_children}
                    </div>
                    <div className="inventory-btn-group">
                        <a className="inventory-btn">确定</a>
                    </div>
                </div>
            </div>
        )
    }

}