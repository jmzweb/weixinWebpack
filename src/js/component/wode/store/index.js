/**
 * Created by jiminze on 2017/9/1.
 */

//店铺

import React from 'react';
import reqwest from 'reqwest';
import {Router,Route,hashHistory,browserHistory} from "react-router";
import MyStore from './my_store';
import ShopInspectionList from './shop_inspection_list';
import ShopInspectionItem from './shop_inspection_item';
import Teemo from '../../lib/page';

const teem = new Teemo();

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

    }

    componentDidMount(){
        reqwest({
            url:`./json/jurisdiction.json`,
            method:`get`,

        }).then(data=>{

            if(data.code ===0 || data.code === 200){

                this.setState({
                    role:data.data.userJurisdiction,
                })

            }

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
            this.state.role === 0
                ?
                (
                    <MyStore lttile={this.state.lttile}/>
                )
                :
                this.state.role === 1
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