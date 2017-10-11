import {hex_sha1} from './sha1';
import {EncodeUtf8,unicodeFromUtf8} from './encodeurf8';

export default class Teemo{

    get(key){
        const flag = !!window.localStorage;
        return flag? localStorage.getItem(key): null;
    }
    set(key, value){
        const flag = !!window.localStorage;
        flag && localStorage.setItem(key, value);
    }
    remove(key){
        const flag = !!window.localStorage;
        flag && localStorage.removeItem(key);
    }
    //cookie start
    setCookie(objName,objValue,objHours){
        let str = `${objName}=${EncodeUtf8(objValue)}`;
        if(objHours>0){
            let date = new Date();
            let ms = objHours * 3600 *1000;
            date.setTime(date.getTime()+ms);
            str +=`;expires=${date.toGMTString()}`;
        }
        document.cookie = str;
    }
    getCookie(objName){
        let arrStr = document.cookie.split("; ");
        for(let i=0;i<arrStr.length;i++){
            let temp = arrStr[i].split('=');
            if(temp[0] == objName){return unicodeFromUtf8(temp[1])};
        }
    }
    delCookie(name){
        let date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = `${name}=a;expires=${date.toSMTSring()}`
    }
    allCookie(){
        let str = document.cookie;
        if(str == ''){
            str = '没有保存任何cookie';
        }
    }
    //cookiet end

    //
    sStatus(item){
        if(item !== undefined)
        {
            switch (item){
                case 3 || 6 :
                    return '已发放'
                    break;
                case 5 || 8 :
                    return '已领取'
                    break;
                case 7 :
                    return '已退回账户'
                    break;
            }
        }
        else
        {
            return ''
        }


    }
    //

    pageName(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }

    transform(url){
        location.href = url;
        //back
        // backRightUrl(url){
        //     $(function(){
        //         pushHistory();
        //         window.addEventListener("popstate", function(e) {
        //             //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        //             location.href=url;
        //         }, false);
        //         function pushHistory() {
        //             let state = {
        //                 title: "title",
        //                 url: "#"
        //             };
        //             window.history.pushState(state, "title", "#");
        //         }
        //     });
        // }
    }

    // //微信配置
    // wxConfig(tick){
    //     let timestamp = Date.parse(new Date())/1000;
    //     const noncestr = 'teemo';
    //     const ticked = tick;
    //     let vars = ['jsapi_ticket='+ ticked, 'noncestr='+noncestr, 'timestamp=' + timestamp,'url=' + this.get('href') ];
    //     vars = vars.sort();
    //     console.log(ticked);
    //     let string1 = vars.join('&');
    //     let signature = hex_sha1(string1);
    //     console.log(signature);
    //     console.log(string1);
    //     console.log(this.get('href'));
    //     wx.config({
    //         debug: true,
    //         appId:'wxf008db15f0cf1b7f',
    //         timestamp:timestamp,
    //         nonceStr:'teemo',
    //         signature:signature,
    //         jsApiList:[
    //             'onMenuShareTimeline',
    //             'onMenuShareAppMessage',
    //             'onMenuShareQQ',
    //             'onMenuShareWeibo',
    //             'onMenuShareQZone',
    //             'startRecord',
    //             'stopRecord',
    //             'onVoiceRecordEnd',
    //             'playVoice',
    //             'pauseVoice',
    //             'stopVoice',
    //             'onVoicePlayEnd',
    //             'uploadVoice',
    //             'downloadVoice',
    //             'chooseImage',
    //             'previewImage',
    //             'uploadImage',
    //             'downloadImage',
    //             'translateVoice',
    //             'getNetworkType',
    //             'openLocation',
    //             'getLocation',
    //             'hideOptionMenu',
    //             'showOptionMenu',
    //             'hideMenuItems',
    //             'showMenuItems',
    //             'hideAllNonBaseMenuItem',
    //             'showAllNonBaseMenuItem',
    //             'closeWindow',
    //             'scanQRCode',
    //             'chooseWXPay',
    //             'openProductSpecificView',
    //             'addCard',
    //             'chooseCard',
    //             'openCard',
    //         ]
    //     });
    // }

    //post cors ajax请求
    ajax(opt){
        opt = opt || {} ;
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};

        let xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // 针对Chrome/Safari/Firefox.
            xhr = new XMLHttpRequest();
        } else if (typeof XDomainRequest != "undefined") {
            // 针对IE
            xhr = new XDomainRequest();
        } else {
            // 不支持CORS
            xhr = null;
        }
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        const params = [];
        for (let key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        let postData = params.join('&');

        if (opt.method.toUpperCase() === 'POST') {
            xhr.open(opt.method, opt.url, opt.async);
            xhr.setRequestHeader('Content-Type', '*;charset=utf-8');
            //这里需要设置头信息，不然客户端无法接收到返回值

            xhr.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xhr.open(opt.method, opt.url + '?' + postData, opt.async);
            xhr.send(null);
        }

        // 回应处理
        xhr.onload = function() {
            let data = xhr.responseText;

            function IsJsonString(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }

            let _data =  IsJsonString(data) ? JSON.parse(data) : data;

            opt.success(_data);
        };
        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };
    }

    //时间戳转化为时间
    formatDateTime(inputTime){

        let _date = new Date(inputTime);
        let y = _date.getFullYear();
        let m = _date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = _date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = _date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = _date.getMinutes();
        let second = _date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;

    }
    formatDateTimey(inputTime){

        let _date = new Date(inputTime);
        let y = _date.getFullYear();
        let m = _date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = _date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = _date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = _date.getMinutes();
        let second = _date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' ';

    }

    //时间比较大小  （包含日期和时刻）
    compareMonth(str){
        if(str===null || str===''){
            return;
        }
        let _date = new Date().setDate(1);
        if(str < _date) { //上一月
            return new Date(str).getMonth()+1 + "月";
        }else {
            return '本月'
        }
        // let _date = new Date().getTime();
        // let _shenyu = _date - str;
        // if(_shenyu>0){
        //
        //     let year = Math.floor(_shenyu /(1000*3600*24*365));
        //     let month = Math.floor(_shenyu /(1000*3600*24*30));
        //     //判断月
        //     if(year === 0 && month === 0){
        //         return '本月';
        //     }else{
        //         return new Date(str).getMonth()+1 + "月";
        //     }
        //     //判断星期
        //     return week(str);
        // }
    }
    compareWeek(str){
        let a = new Array("日", "一", "二", "三", "四", "五", "六");
        let week = new Date(str).getDay();
        return '周'+a[week];
    }
    compareMonthDay(str){
        let _month = new Date(str).getMonth()+1 >10 ? new Date(str).getMonth()+1 : "0"+(new Date(str).getMonth()+1);
        let day = new Date(str).getDate() >10 ? new Date(str).getDate() : "0"+new Date(str).getDate();
        return _month+'-'+day;
    }

    //强制保留两位小数
    toDecimal2(x) {
        let f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        f = Math.round(x * 100) / 100;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
    pushHistory () {
        let state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }




    getElementPos(elementId){
        var ua = navigator.userAgent.toLowerCase();

        var isOpera = (ua.indexOf('opera') != -1);

        var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof

        var el = document.querySelector(elementId);

        if (el.parentNode === null || el.style.display == 'none') {

            return false;

        }

        var parent = null;

        var pos = [];

        var box;

        if (el.getBoundingClientRect){ //IE

            box = el.getBoundingClientRect();

            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);

            return {

                x: box.left + scrollLeft,
                y: box.top + scrollTop

            };

        }


        else


        if (document.getBoxObjectFor){ // gecko

            box = document.getBoxObjectFor(el);

            var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;

            var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;

            pos = [box.x - borderLeft, box.y - borderTop];

        } else {// safari & opera

            pos = [el.offsetLeft, el.offsetTop];

            parent = el.offsetParent;

            if (parent != el) {

                while (parent) {

                    pos[0] += parent.offsetLeft;

                    pos[1] += parent.offsetTop;

                    parent = parent.offsetParent;

                }

            }

            if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {

                pos[0] -= document.body.offsetLeft;

                pos[1] -= document.body.offsetTop;

            }

        }

        if (el.parentNode) {

            parent = el.parentNode;


        } else {

            parent = null;

        }

        while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled


            //ancestors


            pos[0] -= parent.scrollLeft;


            pos[1] -= parent.scrollTop;


            if (parent.parentNode) {


                parent = parent.parentNode;


            } else {

                parent = null;

            }

        }

        return {

            x: pos[0],

            y: pos[1]

        };

    }


};



