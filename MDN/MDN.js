const alfy = require('alfy');

class MDNActions {
    constructor() {
        this.URL = `https://developer.mozilla.org/zh-CN/`; //可修改为en-US查询英文文档
    }
    //请求MDN接口主逻辑
    feachMDNResult(input) {
        let encodedInput = encodeURI(input);
        alfy.fetch(`${this.URL}search.json?q=${encodedInput}`).then(MDNResponse => {
            this.processResponse(MDNResponse)
        });
    }

    //处理返回的响应,只取Documents部分,不做分页
    processResponse(response) {
        let documents, ProcessedResponse,optimizedResponse, HTMLTagReg;
        //匹配全局HTML标签
        HTMLTagReg = /<\/?.+?\/?>/g;
        documents = response.documents;
        ProcessedResponse = [];
        documents.map((data) => {
            ProcessedResponse.push({
                title: data.title,
                //正则替换的原因是excerpt的返回结果里带了HTML标签,影响阅读.
                subtitle: data.excerpt.replace(HTMLTagReg, ''),
                arg: data.url,//此处将url置为arg是为了后面引用URL打开网页
            })
        });
        optimizedResponse = this.optimizeSearchResults(ProcessedResponse);
        this.outputResults(optimizedResponse)
    }
    optimizeSearchResults(ProcessedResponse) {
        //TODO:OptimizeSearchResults函数用于优化搜索结果.文档的搜索结果有部分英文结果排在前面,我们需要把这部分结果挪到后面去,根据对象内的键值对数组重新排序
        return ProcessedResponse
    }

    outputResults(result) {
        if (!result) {
            alfy.output([{
                title: '未找到数据',
                subtitle: '请输入正确的关键字',
                arg: 'Error!'
            }])
        } else {
            alfy.output(result);
        }
    }
}

let FeachMDN = new MDNActions;
(function () {
    FeachMDN.feachMDNResult(alfy.input);
})();
