import {Page, NavController, NavParams} from 'ionic-angular';
import {TransactionPage} from '../transaction/transaction';
import {DataService} from '../../services/data';
import {MapToIterable} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/transactions/transactions.html',
	pipes: [MapToIterable]
})
export class TransactionsPage {
	public appData: any;
	public _moduleRef = 'transaction';
	
	constructor(private nav: NavController, navParams: NavParams, public dataService: DataService) {}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getMyTransactions(this._moduleRef);
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	seeDetail(transactionID) {
		this.nav.push(TransactionPage, {'transactionID': transactionID});
	}
}
