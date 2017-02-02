System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CustomValidator;
    return {
        setters:[],
        execute: function() {
            CustomValidator = (function () {
                function CustomValidator() {
                }
                CustomValidator.mailFormat = function (control) {
                    var EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                        return { "incorrectMailFormat": true };
                    }
                    return null;
                };
                return CustomValidator;
            }());
            exports_1("CustomValidator", CustomValidator);
        }
    }
});

//# sourceMappingURL=custom-validator.service.js.map
