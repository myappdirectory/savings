import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {DataService} from './services/data/data';
import {LoginPage} from './pages/login/login';
import {DashboardPage} from './pages/dashboard/dashboard';
import {CustomerPage} from './pages/customer/customer';
import {PlanPage} from './pages/plan/plan';
import {SavingPage} from './pages/saving/saving';
import {TransactionPage} from './pages/transaction/transaction';
import {AdminPage} from './pages/admin/admin';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
	providers: [ROUTER_DIRECTIVES, DataService],
	directives: [ROUTER_DIRECTIVES, LoginPage]
})

@RouteConfig([
	{path:'/', name: 'Dashboard', component: DashboardPage},
	{path:'/customer', name: 'Customer', component: CustomerPage},
	{path:'/plan', name: 'Plan', component: PlanPage},
	{path:'/saving', name: 'Saving', component: SavingPage},
	{path:'/transaction', name: 'Transaction', component: TransactionPage},
	{path:'/admin', name: 'Admin', component: AdminPage}
])

export class AppComponent {
	public app: any;
	public menu: any;
	
	constructor(public dataService: DataService, public router: Router) {
		this.menu = [
			{'title' : 'Dashboard', 'component' : 'Dashboard', 'path' : '/', 'class': 'dashboard'},
			{'title' : 'Customer', 'component' : 'Customer', 'path' : '/customer', 'class': 'people'},
			{'title' : 'Plan', 'component' : 'Plan', 'path' : '/plan', 'class': 'card_membership'},
			{'title' : 'Saving', 'component' : 'Saving', 'path' : '/saving', 'class': 'card_membership'},
			{'title' : 'Transaction', 'component' : 'Transaction', 'path' : '/transaction', 'class': 'card_membership'},
			{'title' : 'Admin', 'component' : 'Admin', 'path' : '/admin', 'class': 'people'}
		];
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
		this.dataService.initialize();
	}
	
	isMenuActive(instruction: any[]): boolean {
		return this.router.isRouteActive(this.router.generate(instruction));
	}
	
	closeAlert() {
		this.dataService.closeAlert();
	}
	
	logout() {
		this.dataService.logout();
	}
}