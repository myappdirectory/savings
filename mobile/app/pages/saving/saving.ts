import {Page, NavController, NavParams} from 'ionic-angular';
import {PaymentPage} from '../payment/payment';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/saving/saving.html',
	pipes: [MapToIterable, StatusLabel]
})
export class SavingPage {
	public appData: any;
	public savingID: any;
	public _moduleRef = 'saving';
	public _transRef = 'transaction';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.savingID = this.navParams.get('savingID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.savingID, 'currentSaving');
		this.dataService.getItemsByFilter(this._transRef, 'transactions', {key: 'saving_id', value: this.savingID});
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	payDue(savingID) {
		this.nav.push(PaymentPage, {'savingID': savingID});
	}
}
