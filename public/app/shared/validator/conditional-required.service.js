System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConditionalValidator;
    function revalidateOnChanges(control) {
        if (control && control._parent && !control._revalidateOnChanges) {
            control._revalidateOnChanges = true;
            control._parent
                .valueChanges
                .distinctUntilChanged(function (a, b) {
                // These will always be plain objects coming from the form, do a simple comparison
                if (a && !b || !a && b) {
                    return false;
                }
                else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
                    return false;
                }
                else if (a && b) {
                    for (var i in a) {
                        if (a[i] !== b[i]) {
                            return false;
                        }
                    }
                }
                return true;
            })
                .subscribe(function () {
                control.updateValueAndValidity();
            });
            control.updateValueAndValidity();
        }
        return;
    }
    return {
        setters:[],
        execute: function() {
            ConditionalValidator = (function () {
                function ConditionalValidator() {
                }
                ConditionalValidator.conditional = function (conditional, validator) {
                    return function (control) {
                        revalidateOnChanges(control);
                        if (control && control._parent) {
                            if (conditional(control._parent)) {
                                return validator(control);
                            }
                        }
                    };
                };
                return ConditionalValidator;
            }());
            exports_1("ConditionalValidator", ConditionalValidator);
        }
    }
});

//# sourceMappingURL=conditional-required.service.js.map
