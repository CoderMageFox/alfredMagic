const alfy = require('alfy');
const Config = require('../Config/CustomerConfig');
//有道翻译获取原始翻译数据(用于SO搜索)
class SoActions {
    constructor() {}
    getOriginResult(Api, Params) {
        let ResultValueArr, ResultTranslationArr;
        alfy.fetch(Api, Params).then(Result => {
            if (Result.errorCode === 0) {
                ResultValueArr = [];
                ResultTranslationArr = Result.translation;
                ResultTranslationArr.map((item) => {
                    ResultValueArr.push({
                        title: item,
                        subtitle: `标准翻译结果: ${item}`,
                        arg: item,
                    })
                });
                this.getResultFromSo(ResultValueArr)
            }
        });
    }
//从stackexchangeAPI拉取SO数据(注意,有调用限制)
    getResultFromSo(ResultValueArr) {
        let transResult, outputResult;
        transResult = ResultValueArr[0].arg;
        outputResult = [];
        //此处是为了在第一项中显示翻译结果,添加了第一项的结果查询
        outputResult.push(ResultValueArr[0]);
        let encodedtransResult = encodeURI(transResult);
        alfy.fetch(`https://api.stackexchange.com/2.2/search?order=desc&sort=votes&intitle=${encodedtransResult}&site=stackoverflow`, transResult).then((Result) => {
            if (Result.items.length === 0) {
                outputResult.push({
                    title: '无可用回答,请尝试重新输入',
                    subtitle: '提示:请不要输入过多的关键字以免影响翻译',
                    arg: null
                })
            } else {
                Result.items.map((question) => {
                    outputResult.push({
                        title: question.title,
                        subtitle: `已有回答${question.answer_count || 0}个,浏览数${question.view_count || 0}个`,
                        arg: question.link
                    });
                })
            }
            alfy.output(outputResult);
        })
    }
}
let FeachSo = new SoActions;
(function () {
    FeachSo.getOriginResult(Config.youDaoApi, Config.getParams())
})();
