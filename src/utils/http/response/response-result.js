"use strict";
var util_1 = require('ionic-angular/util/util');
var ResponseResult = (function () {
    function ResponseResult(httpResponse, genericType) {
        this.genericType = genericType;
        this.status = httpResponse.status;
        this.msg = httpResponse.msg;
        this.data = httpResponse.data;
        if (this.isPagination(this.data)) {
            this.data = new genericType(this.data);
        }
    }
    ResponseResult.prototype.isPagination = function (obj) {
        return obj && !util_1.isUndefined(obj['currentPageNo']);
    };
    return ResponseResult;
}());
exports.ResponseResult = ResponseResult;
var Pagination = (function () {
    function Pagination(data) {
        this.items = [];
        this.currentPageNo = data.currentPageNo;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
        this.pageCount = data.pageCount;
        this.hasNextPage = data.hasNextPage;
        this.items = this.items.concat(data.items);
    }
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=response-result.js.map