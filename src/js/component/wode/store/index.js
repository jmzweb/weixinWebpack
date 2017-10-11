/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';
import Reqwest from 'reqwest';
import {Router,Route,hashHistory,browserHistory} from "react-router";
import MyStore from './my_store';
import ShopInspectionList from './shop_inspection_list';
import ShopInspectionItem from './shop_inspection_item';

export default class Store extends React.Component{

    constructor(){
        super();
        this.state = {
            //角色
            role:'123',
            //我的店铺的名字
            lttile:'我的店铺'
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
        console.log(e)
        this.setState({
            lttile:e,
            role:'users'

        })
    }

    render(){

        const children =
            this.state.role === 'users'
                ?
                (
                    <MyStore lttile={this.state.lttile}/>
                )
                :
                this.state.role === 'temple'
                    ?
                    (
                        <ShopInspectionItem handleDetailFor={this.handleDetailFor.bind(this)}/>
                    )
                    :
                    (
                        <ShopInspectionList handleAClick={this.handleAClick.bind(this)} area/>
                    );

        return (
            <div>
                {
                    children
                }
            </div>
        )
    }

}