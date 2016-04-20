import {Page, NavController, NavParams} from 'ionic-angular';
import {StartPage} from '../start/start';
import {HomePage} from '../home/home';
import {DataService} from '../../services/data';

@Page({
	templateUrl: 'build/pages/landing/landing.html'
})
export class LandingPage {
	public appData: any;
	
	constructor(private nav: NavController, private navParams: NavParams, public dataService: DataService) {
		this.appData = this.dataService.appData;
	}
	
	ngOnInit() {
		this.appData.auth = this.dataService.db.getAuth();
		if(this.appData && this.appData.auth) {
			this.dataService.getConfig();
			this.nav.setRoot(HomePage);
		} else if(this.appData && this.appData.auth === null) {
			this.nav.setRoot(StartPage);
		} else {}
	}
}
