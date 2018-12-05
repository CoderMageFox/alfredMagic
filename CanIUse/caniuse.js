const alfy = require('alfy');
const CanIUse = require('caniuse-api');
const _ = require('lodash')
class FeachCanIuseAction {
    constructor(){}
    findName(input){
        let alfyResultArr = [];
        let inputGuess = CanIUse.find(input);
        inputGuess.map((item)=>{
            alfyResultArr.push(this.preciseQuery(item))
        });
        alfy.output(alfyResultArr)
    }
    FormatResults(CompatibilityResult){
        let ChromeSupportVersion,FirefoxSupportVersion,IESupportVersion,SafariSupportVersion,ResultString;
        ChromeSupportVersion = `${CompatibilityResult['chrome']['y'] || `暂无数据`}`;
        FirefoxSupportVersion = `${CompatibilityResult['firefox']['y'] || `暂无数据`}` ;
        IESupportVersion = `${CompatibilityResult['ie']['y'] || `暂无数据`}` ;
        SafariSupportVersion = `${CompatibilityResult['safari']['y'] || `暂无数据`} `;
        ResultString = `最低兼容版本 Chrome:${ChromeSupportVersion} FireFox:${FirefoxSupportVersion} IE:${IESupportVersion} Safari:${SafariSupportVersion}`
        return ResultString
    };
    preciseQuery(input){
        let response =  CanIUse.getSupport(input);
        let FormattedResult = this.FormatResults(response);
        return {
            title: input,
            subtitle: FormattedResult,
            arg: input
        }
    }

}
let actions = new FeachCanIuseAction;

(function () {
    actions.findName(alfy.input);
})();
