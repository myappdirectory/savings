import {Page, NavController, NavParams} from 'ionic-angular';
import {PlanPage} from '../plan/plan';
import {DataService} from '../../services/data';
import {MapToIterable} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/plans/plans.html',
	pipes: [MapToIterable]
})
export class PlansPage {
	public appData: any;
	public _moduleRef = 'plan';
	
	constructor(private nav: NavController, navParams: NavParams, public dataService: DataService) {}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItems(this._moduleRef, 'plans');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	planDetail(planID) {
		this.nav.push(PlanPage, {'planID': planID});
	}
}
