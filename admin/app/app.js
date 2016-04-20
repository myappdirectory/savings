System.register(['angular2/core', 'angular2/router', './services/data/data', './pages/login/login', './pages/dashboard/dashboard', './pages/customer/customer', './pages/plan/plan', './pages/saving/saving', './pages/transaction/transaction', './pages/admin/admin'], function(exports_1, context_1) {
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
    var core_1, router_1, data_1, login_1, dashboard_1, customer_1, plan_1, saving_1, transaction_1, admin_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (dashboard_1_1) {
                dashboard_1 = dashboard_1_1;
            },
            function (customer_1_1) {
                customer_1 = customer_1_1;
            },
            function (plan_1_1) {
                plan_1 = plan_1_1;
            },
            function (saving_1_1) {
                saving_1 = saving_1_1;
            },
            function (transaction_1_1) {
                transaction_1 = transaction_1_1;
            },
            function (admin_1_1) {
                admin_1 = admin_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(dataService, router) {
                    this.dataService = dataService;
                    this.router = router;
                    this.menu = [
                        { 'title': 'Dashboard', 'component': 'Dashboard', 'path': '/', 'class': 'dashboard' },
                        { 'title': 'Customer', 'component': 'Customer', 'path': '/customer', 'class': 'people' },
                        { 'title': 'Plan', 'component': 'Plan', 'path': '/plan', 'class': 'card_membership' },
                        { 'title': 'Saving', 'component': 'Saving', 'path': '/saving', 'class': 'card_membership' },
                        { 'title': 'Transaction', 'component': 'Transaction', 'path': '/transaction', 'class': 'card_membership' },
                        { 'title': 'Admin', 'component': 'Admin', 'path': '/admin', 'class': 'people' }
                    ];
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                    this.dataService.initialize();
                };
                AppComponent.prototype.isMenuActive = function (instruction) {
                    return this.router.isRouteActive(this.router.generate(instruction));
                };
                AppComponent.prototype.closeAlert = function () {
                    this.dataService.closeAlert();
                };
                AppComponent.prototype.logout = function () {
                    this.dataService.logout();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        providers: [router_1.ROUTER_DIRECTIVES, data_1.DataService],
                        directives: [router_1.ROUTER_DIRECTIVES, login_1.LoginPage]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Dashboard', component: dashboard_1.DashboardPage },
                        { path: '/customer', name: 'Customer', component: customer_1.CustomerPage },
                        { path: '/plan', name: 'Plan', component: plan_1.PlanPage },
                        { path: '/saving', name: 'Saving', component: saving_1.SavingPage },
                        { path: '/transaction', name: 'Transaction', component: transaction_1.TransactionPage },
                        { path: '/admin', name: 'Admin', component: admin_1.AdminPage }
                    ]), 
                    __metadata('design:paramtypes', [data_1.DataService, router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map