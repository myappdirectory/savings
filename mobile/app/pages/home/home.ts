import {Page, NavController, NavParams} from 'ionic-angular';
import {PlansPage} from '../plans/plans';
import {SavingPage} from '../saving/saving';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/home/home.html',
	pipes: [MapToIterable, StatusLabel]
})
export class HomePage {
	public appData: any;
	public _moduleRef = 'saving';
	
	constructor(private nav: NavController, private navParams: NavParams, public dataService: DataService) {}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;			
		});
		this.dataService.getMySavings(this._moduleRef);
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	viewPlans() {
		this.nav.push(PlansPage);
	}
	
	savingDetail(savingID) {
		this.nav.push(SavingPage, {'savingID': savingID});
	}
	
}
