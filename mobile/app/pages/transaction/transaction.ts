import {Page, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../services/data';

@Page({
	templateUrl: 'build/pages/transaction/transaction.html'
})
export class TransactionPage {
	public appData: any;
	public transactionID: any;
	public _moduleRef = 'transaction';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.transactionID = this.navParams.get('transactionID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.transactionID, 'currentTransaction');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
}
