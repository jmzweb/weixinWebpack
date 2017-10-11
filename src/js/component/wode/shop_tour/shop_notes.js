/**
 * Created by jiminze on 2017/10/9.
 */


//巡店日志

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

export default class ShopNotes extends React.Component{

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
                <header className="myHeader"><a className="btn-back" href="javascript:;"><img src={back}/></a>巡店日志<a className="refresh_position" href="javascript:;" onClick={()=>location.href=`./#/getlocation`}>重定位</a></header>
                <div>
                    <div className="position_succs">望京西大街加贺店</div>
                    <div className="position_succs">
                        <img/>巡店签到<small>已签到</small>
                    </div>

                    <div className="position_succs_info">
                        <h3>添加巡店照片</h3>
                        <div>
                            <img/>
                        </div>
                    </div>

                    <div className="position_succs_info">
                        <h3>添加商品照片</h3>
                        <div>
                            <img/>
                        </div>
                    </div>

                    <div className="position_succs_info">
                        <h3>巡店日志</h3>
                        <div>
                            <textarea placeholder="巡店日志，写点什么吧..."></textarea>
                        </div>
                    </div>

                    <div className="position_succs_info">
                        <div>正常营业</div>
                        <div><span></span></div>
                    </div>

                    {/*<div className="position_succs_info">*/}
                    {/*<div>关店</div>*/}
                    {/*<div><span></span></div>*/}
                    {/*</div>*/}

                    <div className="btn-group"><a id="btnSubmit" onClick={this.handleSubmit.bind(this)} className="btn" href="javascript:;">提交</a></div>

                </div>

                <div style={{display:'none'}}>
                    <div className="position_succs">望京西大街加贺店<time>2017-12-06</time></div>
                    <div className="position_succs">
                        <img/>巡店签到<small>已签到</small>
                    </div>

                    <div className="position_succs_info">
                        <div>
                            <img/>
                        </div>
                    </div>

                    <div className="position_succs_info">
                        <div>
                            <img/>
                        </div>
                    </div>

                    <div className="position_succs_info">
                        <div>

                        </div>
                    </div>

                </div>

            </div>
        )

    }

}