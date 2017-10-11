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
import Teem from '../../lib/page';
const teem = new Teem();

export default class StoreManageTemple extends React.Component{

    constructor(){
        super();
        this.state = {
            //是否是店铺管理中的  类型  ？ 属性  ？ 代理商  ？ 客户
            store:teem.get('storeManag'),
            _data:[
                {
                    id:0,
                    name:'在职中',
                    checkArr:false,
                },
                {
                    id:1,
                    name:'调离',
                    checkArr:false,
                },
                {
                    id:2,
                    name:'离职',
                    checkArr:false,
                }
            ]
        }
    }

    fetch(url){
        Reqwest({
            url:url,
            method:`get`,

        }).then(data=>{
            this.setState({
                // role:data.data.role,
            })
        })
    }

    componentWillMount(){

        switch (this.state.store){
            case 'type':
                this.fetch('');
                break;
            case 'attribute':
                this.fetch('');
                break;
            case 'agent':
                this.fetch('');
                break;
            case 'customer':
                this.fetch('');
                break;
        }



    }

    render(){
        const {_data} = this.state;

        const child = _data.length > 0 ?
            _data.map(obj=>
                <li className="modal-content-radio-item">
                    <label htmlFor={obj.id}>
                        <span>{obj.name}</span>
                        <input id={obj.id} type="radio" name="sy" value={obj.id} checked={obj['checkArr']}/>
                        <span className="icon"></span>
                    </label>
                </li>
            )
            :
            "";

        return (
            <div>
                <header className="myHeader"><a className="btn-back" id="javascript:;"><img src={back}/></a>店铺</header>
                <div>
                    {child}
                </div>
            </div>
        )
    }

}