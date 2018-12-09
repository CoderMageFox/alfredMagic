const alfy = require('alfy');
const _ = require('lodash')
//此处Key为GitHub上搜集而来,如有冒犯请谅解
const KeyArray = [
    {
        keyfrom: 'node-translator',
        key: '2058911035'
    },
    {
        keyfrom: 'kaiyao-robot',
        key: '2016811247'
    },
    {
        keyfrom: 'myWebsite',
        key: '423366321'
    },
    {
        keyfrom: 'github-wdict',
        key: '619541059'
    },
    {
        keyfrom: 'lanyuejin',
        key: '2033774719'
    },
];

module.exports = {
    youDaoApi: 'http://fanyi.youdao.com/openapi.do',
    getParams: function () {
        let selected = _.sample(KeyArray);
        return {
            query: {
                keyfrom: selected.keyfrom,
                key: selected.key,
                type: 'data',
                doctype: 'json',
                version: '1.1',
                q: alfy.input
            }
        }
    },
};
