const alfy = require('alfy');
const algoliaSearch = require('algoliasearch');
//Vue.js文档的algoliasearchID与Key
let client = algoliaSearch('BH4D9OD16A', '5638280abff9d207417bb03be05f0b25');
let index = client.initIndex('vuejs_cn2');
const _ = require('lodash')
//获取Vue文档数据
class VueDocumentActions {
    constructor(index) {
        this.index=index;
    }
    getVueDocumentSearch(Params) {
        this.index.search(
            {
                query: Params,
                hitsPerPage: 50,
            },
            function searchDone(err, content) {
                if (err) throw err;
                let ResultArr;
                ResultArr=[];
                content.hits.map((hit)=>{
                    let subtitle;
                    subtitle = 'Vue';
                    _.forEach(hit.hierarchy,function (value) {
                        if(value!==null)
                        {subtitle +=  '=>'+value }
                    });
                    ResultArr.push({
                        title:`${hit.anchor==='ad'?`进入文档`:hit.anchor}`,
                        subtitle:subtitle,
                        arg:hit.url,
                    })
                });
                alfy.output(ResultArr)
            }
        );
}
}

let FeachVue = new VueDocumentActions(index);
(function () {
    FeachVue.getVueDocumentSearch(alfy.input);
})();
