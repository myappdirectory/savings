System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ValidationService;
    return {
        setters:[],
        execute: function() {
            ValidationService = (function () {
                function ValidationService() {
                }
                ValidationService.getValidatorErrorMessage = function (code) {
                    var config = {
                        'required': 'Required',
                        'invalidCreditCard': 'Is invalid credit card number',
                        'invalidEmailAddress': 'Invalid email address',
                        'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
                    };
                    return config[code];
                };
                ValidationService.emailValidator = function (control) {
                    // RFC 2822 compliant regex
                    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                        return null;
                    }
                    else {
                        return { 'invalidEmailAddress': true };
                    }
                };
                ValidationService.passwordValidator = function (control) {
                    // {6,100}           - Assert password is >= 6 characters
                    if (control.value && control.value.length >= 6) {
                        return null;
                    }
                    else {
                        return { 'invalidPassword': true };
                    }
                };
                ValidationService.creditCardValidator = function (control) {
                    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
                    if (control.value && control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                        return null;
                    }
                    else {
                        return { 'invalidCreditCard': true };
                    }
                };
                return ValidationService;
            }());
            exports_1("ValidationService", ValidationService);
        }
    }
});
//# sourceMappingURL=validation.js.map