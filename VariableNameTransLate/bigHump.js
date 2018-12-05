//bigtHump主逻辑入口

const Config = require('./Config/CustomerConfig.js');
const GetResult = require('./MainLogic/GetResultFromYOUDAO.js');
const {Processer} = require('./MainLogic/ProcessingResults.js');

(function () {
    GetResult.core(Config.youDaoApi,Config.getParams(),Processer.bigtHump);
})();
