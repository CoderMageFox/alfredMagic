const alfy = require('alfy');
const CanIUse = require('caniuse-api');
class FeachCanIuseAction {
    constructor(){}
    //主寻找逻辑
    findName(input){
        let alfyResultArr = [];
        let inputGuess = CanIUse.find(input);
        //此逻辑用于判断精准查询,代码层面可后续优化
        if (input === CanIUse.find(input)){
            alfyResultArr.push(this.preciseQuery(input))
        }else
        inputGuess.map((item)=>{
            alfyResultArr.push(this.preciseQuery(item))
        });
        alfy.output(alfyResultArr)
    }
    //格式化拿到的数据
    FormatResults(CompatibilityResult){
        let ChromeSupportVersion,FirefoxSupportVersion,IESupportVersion,SafariSupportVersion,ResultString;
        ChromeSupportVersion = `${CompatibilityResult['chrome']['y'] || `暂无数据`}`;
        FirefoxSupportVersion = `${CompatibilityResult['firefox']['y'] || `暂无数据`}` ;
        IESupportVersion = `${CompatibilityResult['ie']['y'] || `暂无数据`}` ;
        SafariSupportVersion = `${CompatibilityResult['safari']['y'] || `暂无数据`} `;
        ResultString = `最低兼容版本 Chrome:${ChromeSupportVersion} FireFox:${FirefoxSupportVersion} IE:${IESupportVersion} Safari:${SafariSupportVersion}`
        return ResultString
    };
    //精准查询
    preciseQuery(input){
        let response =  CanIUse.getSupport(input);
        let FormattedResult = this.FormatResults(response);
        return {
            title: input,
            subtitle: FormattedResult,
            arg: `https://caniuse.com/#search=${input}`
        }
    }

}
let actions = new FeachCanIuseAction;

(function () {
    actions.findName(alfy.input);
})();
