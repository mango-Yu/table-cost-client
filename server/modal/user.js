var userApi=require('../dao/userDAO')
var formats = require('../public/javascripts/format').format
//
exports.getUser=function(req,res){
    console.log("asdssdadas113123123")
    console.log(req.session.name)
    console.log("asdssdadas55555")
    if(req.session.name){
        res.end( JSON.stringify(formats.success(req.session.name)))
    }else{
        res.end( JSON.stringify(formats.error('没有session')))
    }
}
//登陆
exports.login=function (req,res) {
    var naame=req.body.name
    var paw=req.body.password
    userApi.getById(naame,function (data) {
        if(data.code==0){
            res.end(JSON.stringify(data))
            return
        }
        console.log(data)
        data=data.data;
        console.log(data)
        if(data.length<1){
            var data={}
            data.code=0
            data.msg="账号不存在"
        }else{
            var pawme=data[0].password
            var data={}
            if(pawme!=paw){
                data.code=0
                data.msg="密码错误"
            }else if(pawme==paw){
                data.code=1
                data.msg="正确"
                req.session.name=naame;
            }else{
                data.code=0
                data.msg="未知异常"
            }
        }


        res.end(JSON.stringify(data));
    })
}
//注册
exports.register=function (req,res) {
    var name=req.body.name
    var paw=req.body.password

    console.log(name,paw)
    userApi.getById(name,function (data) {
        if(data.code==0){
            res.end(JSON.stringify(data))
            return
        }
         data=data.data
        if(data.length>0){
            var obj={}
            obj.code=0
            obj.msg="账号已存在"
            res.end(JSON.stringify(obj));
        }else{
            userApi.installuse({username:name,password:paw},function (data) {
                console.log("dasdasddsas")
                console.log(data)
                if(data.code==1){
                    req.session.name=name;
                }
                res.end(JSON.stringify(data));
            })
        }



    })

}
//提交消费信息
exports.subSpending=function (req,res) {
    var data=req.body
    console.log(req.body)
    var dataVal = [];
    var datakey = ''
    var date=data.date
    var dataSet=''
    for (let i in data) {
        datakey += i + ','
        dataVal.push(data[
            i])
        dataSet+= i+'=?,'
    }
    console.log(datakey)
    console.log(dataVal)
    datakey=datakey.substr(0,datakey.length-1)
    dataSet=dataSet.substr(0,dataSet.length-1)
    userApi.selectSyy([date,req.session.name],function (data) {
        console.log("dasdasddsas")
        console.log(data)
        if(data.code==0){
            res.end(JSON.stringify(data));
        }else {
            if(data.data.length>0){
                dataVal.push(date)
                dataVal.push(req.session.name)
                userApi.updateSyy(dataSet,dataVal,function (data) {
                        res.end(JSON.stringify(data));
                })
            }else{
                userApi.inistallSyy(datakey,dataVal,function (data) {
                    res.end(JSON.stringify(data));
                })
            }
        }
    })
}
//获取消费信息
exports.getSpending=function (req,res) {
    console.log(req.body)
    userApi.selectSyy([req.body.date,req.session.name],function (data) {
        console.log("dasdasddsas")
        console.log(data)
        res.end(JSON.stringify(data));
    })
}
//获取所有消费信息
exports.getAllSpending=function (req,res) {
    console.log(req.body)
    userApi.selectOrder([req.session.name],function (data) {
        console.log("getAllSpending")
        console.log(data)
        res.end(JSON.stringify(data));
    })
}
//获取消费信息总计按月
exports.getSumByDate=function (req,res) {
    console.log(req.body)
    userApi.getSumByDate([req.body.month,req.body.nextmonth,req.session.name],function (data) {
        console.log("dasdasddsas2")
        console.log(data)
        res.end(JSON.stringify(data));
    })
}
//修改密码
exports.changePassword=function (req,res) {
    console.log(req.body)
    let name=req.session.name
    let password=req.body.password;
    let newPas=req.body.newPas;
    userApi.getById(name,function (data) {

        if(data.code==1){
            var pawme=data.data[0].password
            console.log(pawme)
            console.log(password)
            var obj={}
            if(pawme!=password){
                obj.code=0
                obj.msg="原来的密码错误"
                res.end(JSON.stringify(obj));
            }else{
                userApi.changePassword([newPas,name],function (data) {
                    res.end(JSON.stringify(data));
                })
            }
        }else{
            res.end(JSON.stringify(data));
        }
    })

}
