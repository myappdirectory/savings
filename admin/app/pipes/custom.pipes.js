System.register(['angular2/core', '../services/data/data'], function(exports_1, context_1) {
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
    var core_1, data_1;
    var MapToIterable, StatusLabel, LocationLabel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            }],
        execute: function() {
            MapToIterable = (function () {
                function MapToIterable() {
                }
                MapToIterable.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    var arr = [];
                    for (var i in value) {
                        value[i]['_ref'] = i;
                        arr.push(value[i]);
                    }
                    return arr;
                };
                MapToIterable = __decorate([
                    core_1.Pipe({
                        name: 'MapToIterable'
                    }), 
                    __metadata('design:paramtypes', [])
                ], MapToIterable);
                return MapToIterable;
            }());
            exports_1("MapToIterable", MapToIterable);
            StatusLabel = (function () {
                function StatusLabel(dataService) {
                    this.dataService = dataService;
                    this.app = this.dataService.app;
                }
                StatusLabel.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                };
                StatusLabel.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    if (this.app && this.app.config && this.app.config.status && this.app.config.status[value]) {
                        return this.app.config.status[value]['label'];
                    }
                    else {
                        this.dataService.getConfig();
                    }
                };
                StatusLabel = __decorate([
                    core_1.Pipe({
                        name: 'StatusLabel'
                    }), 
                    __metadata('design:paramtypes', [data_1.DataService])
                ], StatusLabel);
                return StatusLabel;
            }());
            exports_1("StatusLabel", StatusLabel);
            LocationLabel = (function () {
                function LocationLabel(dataService) {
                    this.dataService = dataService;
                    this.app = this.dataService.app;
                }
                LocationLabel.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                };
                LocationLabel.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    if (this.app && this.app.config && this.app.config.location && this.app.config.location[value]) {
                        return this.app.config.location[value]['label'];
                    }
                    else {
                        this.dataService.getConfig();
                    }
                };
                LocationLabel = __decorate([
                    core_1.Pipe({
                        name: 'LocationLabel'
                    }), 
                    __metadata('design:paramtypes', [data_1.DataService])
                ], LocationLabel);
                return LocationLabel;
            }());
            exports_1("LocationLabel", LocationLabel);
        }
    }
});
//# sourceMappingURL=custom.pipes.js.map