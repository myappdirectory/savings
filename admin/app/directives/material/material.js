System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var MdInput, MdCheckbox;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MdInput = (function () {
                function MdInput() {
                }
                MdInput.prototype.onFocus = function ($event) {
                    $event.currentTarget.parentElement.classList.add('focused');
                };
                MdInput.prototype.onBlur = function ($event) {
                    $event.currentTarget.parentElement.classList.remove('focused');
                };
                MdInput.prototype.onKeyup = function ($event) {
                    if ($event.currentTarget.value) {
                        $event.currentTarget.parentElement.classList.add('filled');
                    }
                    else {
                        $event.currentTarget.parentElement.classList.remove('filled');
                    }
                };
                MdInput = __decorate([
                    core_1.Directive({
                        selector: '.textbox',
                        host: {
                            '(focus)': 'onFocus($event)',
                            '(blur)': 'onBlur($event)',
                            '(keyup)': 'onKeyup($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], MdInput);
                return MdInput;
            }());
            exports_1("MdInput", MdInput);
            MdCheckbox = (function () {
                function MdCheckbox() {
                }
                MdCheckbox.prototype.onClick = function ($event) {
                    if ($event.currentTarget.checked) {
                        $event.currentTarget.parentElement.classList.add('checked');
                    }
                    else {
                        $event.currentTarget.parentElement.classList.remove('checked');
                    }
                };
                MdCheckbox = __decorate([
                    core_1.Directive({
                        selector: '.checkbox',
                        host: {
                            '(click)': 'onClick($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], MdCheckbox);
                return MdCheckbox;
            }());
            exports_1("MdCheckbox", MdCheckbox);
        }
    }
});
//# sourceMappingURL=material.js.map