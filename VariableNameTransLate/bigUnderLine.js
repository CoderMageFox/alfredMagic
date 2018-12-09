//bigUnderLine主逻辑入口

const Config = require('../Config/CustomerConfig.js');
const GetResult = require('./MainLogic/FeachDataFromServer.js');
const {Processer} = require('./MainLogic/ProcessingResults.js');

(function () {
    GetResult.getJoinedResult(Config.youDaoApi,Config.getParams(),Processer.bigUnderLine);
})();
