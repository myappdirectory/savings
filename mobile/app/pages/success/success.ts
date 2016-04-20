import {Page, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataService} from '../../services/data';

@Page({
	templateUrl: 'build/pages/success/success.html'
})
export class SuccessPage {
	public appData: any;
	public TransactionID: any;
	public _moduleRef = 'transaction';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.TransactionID = this.navParams.get('TransactionID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.TransactionID, 'currentTransacion');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoHome() {
		this.nav.setRoot(HomePage);
	}
}
