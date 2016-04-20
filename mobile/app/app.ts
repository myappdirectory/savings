import 'es6-shim';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {DataService} from './services/data';
import {LandingPage} from './pages/landing/landing';
import {StartPage} from './pages/start/start';
import {HomePage} from './pages/home/home';
import {ProfilePage} from './pages/profile/profile';
import {PlansPage} from './pages/plans/plans';
import {TransactionsPage} from './pages/transactions/transactions';
import {enableProdMode} from "angular2/core";

enableProdMode();

@App({
	templateUrl: 'build/app.html',
	providers: [DataService],
	config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
	// make HelloIonicPage the root (or first) page
	rootPage: any = LandingPage;
	pages: Array<{title: string, component: any}>;
	public appData: any;

	constructor(private app: IonicApp, private platform: Platform, private menu: MenuController, public dataService: DataService) {
		this.initializeApp();
		// set our app's pages
		this.pages = [
			{ title: 'Home', component: HomePage },
			{ title: 'My Profile', component: ProfilePage },
			{ title: 'My Transactions', component: TransactionsPage },
			{ title: 'View all plans', component: PlansPage }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
		  // Okay, so the platform is ready and our plugins are available.
		  // Here you can do any higher level native things you might need.
		  StatusBar.styleDefault();
		});
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.initialize();
	}

	openPage(page) {
		let nav = this.app.getComponent('nav');
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		page.component == HomePage ? nav.setRoot(page.component) : nav.push(page.component);
	}
	
	logout() {
		let nav = this.app.getComponent('nav');
		this.dataService.logout();
		this.menu.close();
		nav.setRoot(StartPage)
	}
}
