System.register(['angular2/core', 'angular2/common', '../../services/validation/validation'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, core_2, validation_1;
    var ToggleActive, ConfirmDelete, ControlMessages;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (validation_1_1) {
                validation_1 = validation_1_1;
            }],
        execute: function() {
            ToggleActive = (function () {
                function ToggleActive() {
                }
                ToggleActive.prototype.onClick = function ($event) {
                    $event.currentTarget.classList.toggle('active');
                };
                ToggleActive = __decorate([
                    core_2.Directive({
                        selector: '.toggleactive',
                        host: {
                            '(click)': 'onClick($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], ToggleActive);
                return ToggleActive;
            }());
            exports_1("ToggleActive", ToggleActive);
            ConfirmDelete = (function () {
                function ConfirmDelete() {
                }
                ConfirmDelete.prototype.onClick = function ($event) {
                    return confirm("Do you want to delete this item?");
                };
                ConfirmDelete = __decorate([
                    core_2.Directive({
                        selector: '.confirmDeletes',
                        host: {
                            '(click)': 'onClick($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], ConfirmDelete);
                return ConfirmDelete;
            }());
            exports_1("ConfirmDelete", ConfirmDelete);
            ControlMessages = (function () {
                function ControlMessages(_formDir) {
                    this._formDir = _formDir;
                }
                Object.defineProperty(ControlMessages.prototype, "errorMessage", {
                    get: function () {
                        // Find the control in the Host (Parent) form
                        var c = this._formDir.form.find(this.controlName);
                        for (var propertyName in c.errors) {
                            // If control has a error
                            if (c.errors.hasOwnProperty(propertyName) && c.touched) {
                                // Return the appropriate error message from the Validation Service
                                return validation_1.ValidationService.getValidatorErrorMessage(propertyName);
                            }
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                ControlMessages = __decorate([
                    core_1.Component({
                        selector: 'control-messages',
                        inputs: ['controlName: control'],
                        template: '<div *ngIf="errorMessage !== null">{{errorMessage}}</div>'
                    }),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [common_1.NgFormModel])
                ], ControlMessages);
                return ControlMessages;
            }());
            exports_1("ControlMessages", ControlMessages);
        }
    }
});
//# sourceMappingURL=common.js.map