import {Page, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {SuccessPage} from '../success/success';
import {DataService} from '../../services/data';
import {ValidationService} from '../../services/validation';
import {ControlMessages} from '../../directives/common';

@Page({
	templateUrl: 'build/pages/payment/payment.html',
	directives: [ControlMessages]
})
export class PaymentPage {
	public appData: any;
	public savingID: any;
	public _moduleRef = 'transaction';
	public paymentForm: any;
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService, public fb:FormBuilder) {
		this.savingID = this.navParams.get('savingID');
		this.appData = this.dataService.appData;
		this.paymentForm = fb.group({
			card_type: ["", Validators.compose([Validators.required])],
			name: ["", Validators.compose([Validators.required])],
			number: ["", Validators.compose([Validators.required])],
			cvv: ["", Validators.compose([Validators.required])],
			expiry_year: ["", Validators.compose([Validators.required])],
			expiry_month: ["", Validators.compose([Validators.required])],
		});
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	payNow() {
		if(this.paymentForm.valid) {
			var data = this.paymentForm.value;
			data.saving_id = this.savingID;
			data.uid = this.appData.auth.uid;
			data.datetime = this.dataService.getCurrentTime();
			data.amount = '500';
			data.status = '1';
			this.dataService.saveItem(this._moduleRef, data).then((res) => {
				this.nav.setRoot(SuccessPage, {'TransactionID': res.key()});
			});
		}
	}
}
