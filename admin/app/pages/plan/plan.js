System.register(['angular2/core', 'angular2/common', '../../services/data/data', '../../directives/material/material', '../../directives/common/common', '../../pipes/custom.pipes'], function(exports_1, context_1) {
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
    var core_1, common_1, data_1, material_1, common_2, custom_pipes_1;
    var PlanPage;
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
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (custom_pipes_1_1) {
                custom_pipes_1 = custom_pipes_1_1;
            }],
        execute: function() {
            PlanPage = (function () {
                function PlanPage(dataService, fb) {
                    this.dataService = dataService;
                    this.fb = fb;
                    this._moduleRef = 'plan';
                    this.mode = 'list';
                    this.form = fb.group({
                        _ref: [""],
                        name: ["", common_1.Validators.required],
                        code: ["", common_1.Validators.required],
                        due_type: ["", common_1.Validators.required],
                        due_amount: ["", common_1.Validators.required],
                        total_due: ["", common_1.Validators.required],
                        final_amount: ["", common_1.Validators.required],
                        start_date: ["", common_1.Validators.required],
                        end_date: ["", common_1.Validators.required],
                        color: ["", common_1.Validators.required],
                        description: ["", common_1.Validators.required],
                        status: ["", common_1.Validators.required]
                    });
                    this.list = {
                        title: 'Manage Plan',
                        fields: [
                            { code: 'name', title: 'Name', type: 'text', 'formatter': '' },
                            { code: 'code', title: 'code', type: 'text', 'formatter': '' },
                            { code: 'due_type', title: 'Due Type', type: 'text', 'formatter': '' },
                            { code: 'due_amount', title: 'Due Amount', type: 'text', 'formatter': '' },
                            { code: 'final_amount', title: 'Final Amount', type: 'text', 'formatter': '' },
                            { code: 'color', title: 'Color', type: 'text', 'formatter': '' },
                            { code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel' }
                        ]
                    };
                }
                PlanPage.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                    this.dataService.getItems(this._moduleRef, 'listItems');
                };
                PlanPage.prototype.addNew = function () {
                    this.selectedItem = {};
                    this.mode = 'edit';
                };
                PlanPage.prototype.editItem = function (id) {
                    if (this.app.listItems[id]) {
                        this.selectedItem = this.app.listItems[id];
                        this.selectedItem._ref = id;
                        this.mode = 'edit';
                    }
                };
                PlanPage.prototype.cancelEdit = function () {
                    this.selectedItem = null;
                    this.mode = 'list';
                };
                PlanPage.prototype.saveItem = function () {
                    if (this.form.valid) {
                        var data = this.form.value;
                        this.dataService.saveItem(this._moduleRef, data);
                        this.selectedItem = null;
                        this.mode = 'list';
                    }
                };
                PlanPage.prototype.deleteItem = function (id) {
                    var result = confirm("Do you want to delete this item?");
                    if (result) {
                        this.dataService.deleteItem(this._moduleRef, id);
                    }
                };
                PlanPage.prototype.saveImage = function (event, model, identifier) {
                    var _this = this;
                    var file = event.target.files[0];
                    if (file && file.type.match('image.*')) {
                        this.dataService.uploadImage(file, identifier).then(function (imageUrl) {
                            if (imageUrl) {
                                _this.selectedItem[model] = imageUrl;
                            }
                        });
                    }
                };
                PlanPage = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/plan/plan.html',
                        directives: [material_1.MdInput, material_1.MdCheckbox, common_2.ControlMessages, common_2.ConfirmDelete],
                        pipes: [custom_pipes_1.MapToIterable, custom_pipes_1.LocationLabel, custom_pipes_1.StatusLabel]
                    }), 
                    __metadata('design:paramtypes', [data_1.DataService, common_1.FormBuilder])
                ], PlanPage);
                return PlanPage;
            }());
            exports_1("PlanPage", PlanPage);
        }
    }
});
//# sourceMappingURL=plan.js.map