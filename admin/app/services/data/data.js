System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/operator/share'], function(exports_1, context_1) {
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
    var core_1, Observable_1;
    var DataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            DataService = (function () {
                function DataService() {
                    var _this = this;
                    this.firebaseUrl = "https://my-savings.firebaseio.com/";
                    this.backendServer = "http://localhost/git/savings/";
                    this._adminRef = 'admin';
                    this._userRef = 'users';
                    this._configRef = 'config';
                    this.removeUndefined = function (object) {
                        return JSON.parse(JSON.stringify(object));
                    };
                    this.db = new Firebase(this.firebaseUrl);
                    this.observable$ = new Observable_1.Observable(function (observer) { return _this._observer = observer; }).share();
                    this.app = {};
                }
                DataService.prototype.doAlert = function (info) {
                    this.app.alert = info;
                    this._observer.next(this.app);
                };
                DataService.prototype.closeAlert = function () {
                    this.app.alert = null;
                    this._observer.next(this.app);
                };
                DataService.prototype.showLoading = function () {
                    this.app.loading = true;
                    this._observer.next(this.app);
                };
                DataService.prototype.hideLoading = function () {
                    this.app.loading = false;
                    this._observer.next(this.app);
                };
                DataService.prototype.uploadImage = function (file, pathname) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (file.type.match('image.*')) {
                            var formData = new FormData();
                            formData.append('images[' + pathname + ']', file);
                            formData.append('action', 'saveImage');
                            var xhr = new XMLHttpRequest();
                            xhr.open('POST', _this.backendServer + 'ajax.php', true);
                            xhr.onload = function () {
                                if (xhr.status === 200) {
                                    var res = JSON.parse(xhr.responseText);
                                    if (res.status == 'success') {
                                        resolve(res.imageUrl);
                                    }
                                    else {
                                        this.doAlert({ title: 'Error', message: res.message });
                                    }
                                }
                            };
                            xhr.send(formData);
                        }
                    });
                };
                DataService.prototype.initialize = function () {
                    var _this = this;
                    this.db.child('.info/connected').on('value', function (res) {
                        if (res.val()) {
                            _this.showLoading();
                            _this.app.connectionError = false;
                            _this.app.auth = _this.db.getAuth();
                            _this.db.child(_this._configRef).on('value', function (res) {
                                _this.app.config = res.val();
                                _this._observer.next(_this.app);
                                _this.hideLoading();
                            });
                        }
                        else {
                            _this.app.connectionError = { 'type': 'connection-error', 'message': 'Waiting for network connection...' };
                            _this._observer.next(_this.app);
                        }
                    });
                };
                DataService.prototype.getConfig = function () {
                    var _this = this;
                    this.db.child(this._configRef).on('value', function (res) {
                        _this.app.config = res.val();
                        _this._observer.next(_this.app);
                    });
                };
                //Admin Functions
                DataService.prototype.loginAdmin = function (data) {
                    var _this = this;
                    if (data) {
                        this.showLoading();
                        this.db.child(this._adminRef).orderByChild('email').equalTo(data.email).on('value', function (res) {
                            var admin = res.val();
                            if (admin) {
                                _this.db.authWithPassword(data, function (error, authData) {
                                    _this.hideLoading();
                                    if (error) {
                                        _this.doAlert({ title: 'Error', message: error.message });
                                    }
                                    else {
                                        _this.app.auth = authData;
                                        _this.app.globalMessage = { 'type': 'success', 'message': 'Welcome back user' };
                                        _this._observer.next(_this.app);
                                    }
                                });
                            }
                            else {
                                _this.hideLoading();
                                _this.doAlert({ title: 'Error', message: 'Invalid Email Address' });
                            }
                        });
                    }
                };
                DataService.prototype.logout = function () {
                    this.db.unauth();
                    this.app.auth = null;
                    this._observer.next(this.app);
                };
                DataService.prototype.getPassword = function (data) {
                    var _this = this;
                    this.showLoading();
                    this.db.resetPassword(data, function (error) {
                        _this.hideLoading();
                        if (error) {
                            _this.doAlert({ title: 'Error', message: error.message });
                        }
                        else {
                            _this.doAlert({ title: 'Success', message: 'The password reset link has been sent to your email.' });
                        }
                    });
                };
                DataService.prototype.saveAdmin = function (data) {
                    var _this = this;
                    this.showLoading();
                    if (!data._ref) {
                        this.db.createUser({ email: data.email, password: data.password }, function (error, authData) {
                            if (error) {
                                _this.hideLoading();
                                _this.doAlert({ title: 'Error', message: error.message });
                            }
                            else {
                                data.password = btoa(data.password);
                                _this.saveItem(_this._adminRef, data);
                            }
                        });
                    }
                    else {
                        data.password = btoa(data.password);
                        this.saveItem(this._adminRef, data);
                    }
                };
                DataService.prototype.deleteAdmin = function (id) {
                    var _this = this;
                    this.showLoading();
                    this.db.child(this._adminRef).child(id).on('value', function (data) {
                        var admin = data.val();
                        if (admin) {
                            _this.db.removeUser({ email: admin.email, password: atob(admin.password) }, function (error) {
                                if (error) {
                                    _this.hideLoading();
                                    _this.doAlert({ title: 'Error', message: error.message });
                                }
                                else {
                                    _this.db.child(_this._adminRef).child(id).remove();
                                    _this.hideLoading();
                                }
                            });
                        }
                    });
                };
                //User Functions
                DataService.prototype.saveUser = function (data) {
                    var _this = this;
                    this.showLoading();
                    if (!data._ref) {
                        this.db.createUser({ email: data.email, password: data.password }, function (error, authData) {
                            if (error) {
                                _this.hideLoading();
                                _this.doAlert({ title: 'Error', message: error.message });
                            }
                            else {
                                data.password = btoa(data.password);
                                _this.saveItem(_this._userRef, data);
                            }
                        });
                    }
                    else {
                        data.password = btoa(data.password);
                        console.log(data.password);
                        this.saveItem(this._userRef, data);
                    }
                };
                DataService.prototype.deleteUser = function (id) {
                    var _this = this;
                    this.showLoading();
                    this.db.child(this._userRef).child(id).on('value', function (data) {
                        var customer = data.val();
                        if (customer) {
                            if (customer.provider == 'password') {
                                _this.db.removeUser({ email: customer.email, password: atob(customer.password) }, function (error) {
                                    if (error) {
                                        _this.hideLoading();
                                        _this.doAlert({ title: 'Error', message: error.message });
                                    }
                                    else {
                                        _this.db.child(_this._userRef).child(id).remove();
                                        _this.hideLoading();
                                    }
                                });
                            }
                            else {
                                _this.db.child(_this._userRef).child(id).remove();
                                _this.hideLoading();
                            }
                        }
                    });
                };
                //Common Functions
                DataService.prototype.getItems = function (moduleRef, name) {
                    var _this = this;
                    this.showLoading();
                    this.db.child(moduleRef).on('value', function (res) {
                        if (name) {
                            _this.app[name] = res.val();
                        }
                        else {
                            _this.app[moduleRef] = res.val();
                        }
                        _this.hideLoading();
                        _this._observer.next(_this.app);
                    });
                };
                DataService.prototype.getActiveItems = function (moduleRef, name) {
                    var _this = this;
                    this.showLoading();
                    this.db.child(moduleRef).orderByChild('status').equalTo('1').on('value', function (res) {
                        if (name) {
                            _this.app[name] = res.val();
                        }
                        else {
                            _this.app[moduleRef] = res.val();
                        }
                        _this.hideLoading();
                        _this._observer.next(_this.app);
                    });
                };
                DataService.prototype.getItem = function (moduleRef, itemRef, name) {
                    var _this = this;
                    this.showLoading();
                    this.db.child(moduleRef).child(itemRef).on('value', function (res) {
                        _this.app[name] = res.val();
                        _this._observer.next(_this.app);
                        _this.hideLoading();
                    });
                };
                DataService.prototype.saveItem = function (moduleRef, data) {
                    if (data) {
                        this.showLoading();
                        data = this.removeUndefined(data);
                        if (data._ref) {
                            this.db.child(moduleRef).child(data._ref).update(data);
                            this.hideLoading();
                        }
                        else {
                            this.db.child(moduleRef).push(data);
                            this.hideLoading();
                        }
                    }
                };
                DataService.prototype.deleteItem = function (moduleRef, itemRef) {
                    this.db.child(moduleRef).child(itemRef).remove();
                };
                DataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DataService);
                return DataService;
            }());
            exports_1("DataService", DataService);
        }
    }
});
//# sourceMappingURL=data.js.map