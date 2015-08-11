# Timespace V2

## getting start

### install node modules

```
npm install
```

### update git submodule

```
sh git/update_submodule.sh
```

### compile

使用watch可以监听src下面的代码修改

```
gulp watch
```

### develop & test

* 使用你的QQ登录：http://m.qzone.com/
* 进去时空召唤游戏
* 可以看到时空召唤的游戏连接为：http://tslb.gz.1251433698.clb.myqcloud.com/xxx....
* 将tslb.gz.1251433698.clb.myqcloud.com通过设置hosts指向你的本机ip
* 将项目路径link到你的80端口服务器的${webroot}/tswanba
* 再次访问游戏即运行你本地的代码

### build & release

```
// 构建到dist目录
gulp build
// 发布到release目录
gulp release
```

<br/>

## Docs

[文档](docs/index.md)
