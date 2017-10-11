var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var OAuth = require('wechat-oauth');
var request = require('request');
var sha1 = require('sha1');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
var port = 18080;
var appid = 'wx75340481908402a8';
var appsecret = '2b6ee0cbeec0114eb539e68ba356329b';

//首先拼接url
var  url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx75340481908402a8&redirect_uri=http%3a%2f%2fwechatapp1.duapp.com%2fcallback&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
app.get('/test',function(req,res){
    res.redirect(url);
});
//四步请求打法;
//第一步:获得code;
app.get('/callback',function(req,res){
    var code  = req.query.code;
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + appsecret + '&code=' + code + '&grant_type=authorization_code';
    //第二步:获得token
    request.get(url,function(err,response,body) {
        var json = JSON.parse(body);
        var refreshUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appid + '&grant_type=refresh_token&refresh_token=' + json.refresh_token;
        //第三步:获得refreshtoken和openId;
        request.get(refreshUrl,function (err,response,refresh) {
            var json = JSON.parse(refresh);
            var infoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + json.access_token + '&openid=' + json.openid + '&lang=zh_CN';
            //第四步:通过上一步刷新得来的refresh和openId请求用户信息;
            request.get(infoUrl,function(err,response,info) {
                var info = JSON.parse(info);
                res.send(info);
            });
        });
    });
});
//1、设置api接口,使前端通过ajax可以获取jsapi-sdk;
app.get('/wechat/ticket',function (req, res) {
    var page = req.query.page;
    var t = {};
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+appsecret;
    //2、获取access_token;
    request.get(url,function(err, response, body) {
        var token = JSON.parse(body);
        var ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token.access_token + '&type=jsapi';
        //3、获取ticket并且生成随机字符串,时间戳,签名
        request.get(ticketUrl, function(err, response, ticket) {
            var data = JSON.parse(ticket);
            var timestamp = parseInt(new Date().getTime() / 1000);
            t.ticket = data.ticket;
            t.noncestr = sha1(new Date());
            t.timestamp = timestamp;
            var string = 'jsapi_ticket=' + t.ticket + '&noncestr=' + t.noncestr + '&timestamp=' + timestamp + '&url=' + page;
            t.signature = sha1(string);
            res.json(t);
        });
    });
});



app.listen(port);
