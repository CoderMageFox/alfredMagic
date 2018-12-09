//此类用于储存各种格式化字符串方法
class FormatterActions {
    constructor(){}
    //formatterBasic用于将返回结果全部转为标准小写格式数组
    static formatterBasic(string){
        let stringArray = string.toLowerCase();
        return stringArray.split(' ');
    }
    //littleHump方法用于将返回转为小驼峰格式并拼接,一般用于普通函数命名
    littleHump(string){
        let basicStrArr = FormatterActions.formatterBasic(string);
        // 小驼峰命名
        return basicStrArr.reduce(function (prev, cur) {
            return prev + cur.charAt(0).toUpperCase()+ cur.substring(1);
        });
    }
    //bigHump方法用于将返回全部转为大驼峰并拼接,一般用于构造函数.
    bigtHump(string){
        let basicStrArr = FormatterActions.formatterBasic(string);
        let bigHumpArray = basicStrArr.map((item)=>{
            return item.charAt(0).toUpperCase()+ item.substring(1);
        });
        return bigHumpArray.join('')
    }
    //littleUnderLine方法用于将返回转为全部是小写的_拼接,常用于CSS命名等.
    littleUnderLine(string){
        let basicStrArr = FormatterActions.formatterBasic(string);
        return basicStrArr.reduce(function (prev, cur) {
            return prev + '_' +cur
        });
    }
    //bigUnderLine方法用于将返回转为全部是大写的_拼接,常用于命令式风格/静态语言命名
    bigUnderLine(string){
        let basicStrArr = FormatterActions.formatterBasic(string);
        let bigCaseArray = basicStrArr.map((item)=>{
            return item.toUpperCase();
        });
        return bigCaseArray.join('_')
    }
}
let Processer = new FormatterActions;
module.exports = {
    Processer,
};
