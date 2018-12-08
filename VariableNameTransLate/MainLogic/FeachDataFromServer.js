'use strict';
const alfy = require('alfy');
const ErrResult = [{
    title: '无返回结果',
    subtitle: `找不到相关结果,原因可能是Key失效/服务抽风/你输入了奇怪的内容`,
    arg: 'error',
}];
module.exports = {
     //有道翻译处理后的翻译数据(用于变量命名)
    getJoinedResult: function (Api, Params, Name) {
        alfy.fetch(Api, Params).then(Result => {
            if (Result.errorCode === 0) {
                let ResultValueArr, ResultTranslationArr;
                //默认初始值:
                //ValueArr用于获取
                ResultValueArr = [];
                ResultTranslationArr = Result.translation;
                ResultTranslationArr.map((item) => {
                    ResultValueArr.push({
                        title: Name(item),
                        subtitle: `标准翻译结果: ${item}`,
                        arg: Name(item),
                    });
                });
                // 网络翻译结果
                if (Result.web) {
                    let WebResult = Result.web;
                    WebResult.map((item) => {
                        ResultValueArr.push({
                            title: Name(item.value[0]),
                            subtitle: `其他翻译结果:${Name(item.value[0])}`,
                            arg: Name(item.value[0]),
                        });
                    })
                }
                alfy.output(ResultValueArr);
            } else {
                alfy.output(ErrResult);
            }
        });
    },
};
