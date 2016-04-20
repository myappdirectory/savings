System.register(['angular2/core', 'angular2/common', '../../services/data/data', '../../services/validation/validation', '../../directives/common/common', '../../directives/material/material'], function(exports_1, context_1) {
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
    var core_1, common_1, data_1, validation_1, common_2, material_1;
    var LoginPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            },
            function (validation_1_1) {
                validation_1 = validation_1_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            }],
        execute: function() {
            LoginPage = (function () {
                function LoginPage(dataService, fb) {
                    this.dataService = dataService;
                    this.fb = fb;
                    this.mode = 'login';
                    this.loginForm = fb.group({
                        email: ["", common_1.Validators.compose([common_1.Validators.required, validation_1.ValidationService.emailValidator])],
                        password: ["", common_1.Validators.required],
                        remember: [""]
                    });
                    this.passwordForm = fb.group({
                        email: ["", common_1.Validators.compose([common_1.Validators.required, validation_1.ValidationService.emailValidator])]
                    });
                }
                LoginPage.prototype.register = function () {
                    var data = { email: "mail.sureshknithi@gmail.com", password: "june9th.", role: "admin", firstname: "Suresh", lastname: "K", location: "Chennai", status: 1 };
                    this.dataService.saveAdmin(data);
                };
                LoginPage.prototype.login = function () {
                    if (this.loginForm.valid) {
                        var data = this.loginForm.value;
                        this.dataService.loginAdmin(data);
                    }
                };
                LoginPage.prototype.getPassword = function () {
                    if (this.passwordForm.valid) {
                        var data = this.passwordForm.value;
                        this.dataService.getPassword(data);
                    }
                };
                LoginPage = __decorate([
                    core_1.Component({
                        selector: 'app-login',
                        templateUrl: 'app/pages/login/login.html',
                        directives: [material_1.MdInput, material_1.MdCheckbox, common_2.ControlMessages]
                    }), 
                    __metadata('design:paramtypes', [data_1.DataService, common_1.FormBuilder])
                ], LoginPage);
                return LoginPage;
            }());
            exports_1("LoginPage", LoginPage);
        }
    }
});
//# sourceMappingURL=login.js.map