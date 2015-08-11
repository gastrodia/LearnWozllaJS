var testTool = (function () {
    return {

        RES_BASE: 'base/',

        getValues: function (values) {
            var len = 0,
                i = 0,
                result = [];

            len = values.length;

            for (i = 0; i < len; i++) {
                if (values[i] === -0) {
                    result[i] = 0;
                    continue;
                }
                result[i] = YYC.Tool.math.toFixed(values[i], 7);
            }
            return result;
        },
        toFixed: function(num){
            return YYC.Tool.math.toFixed(num, 7);
        },
        isFloat32Array: function(val){
            return Object.prototype.toString.call(val) === "[object Float32Array]";
        }
    }
}());