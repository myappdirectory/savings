import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {PlanSelectedPage} from '../planselected/planselected';
import {DataService} from '../../services/data';

@Page({
	templateUrl: 'build/pages/plan/plan.html'
})
export class PlanPage {
	public appData: any;
	public planID: any;
	public _moduleRef = 'plan';
	public _savingRef = 'saving';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.planID = this.navParams.get('planID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.planID, 'currentPlan');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	selectPlan(planID) {
		let alert = Alert.create({title: 'Saving', message: 'Enter the name for this saving',
			inputs: [
				{name: 'name', placeholder: 'Name'}
			],
			buttons: [
				{text: 'Cancel', role: 'cancel'},
				{text: 'Save', handler: data => {
						if(data.name) {
							this.applyNow(data.name);
						} else {
							let alert = Alert.create({title: 'Error', subTitle: 'Please enter a valid name', buttons: ['Ok']});
							this.nav.present(alert);
						}
					}
				}
			]
		});
		this.nav.present(alert);
	}
	
	applyNow(name) {
		var data = {
			name: name,
			code: this.dataService.guid(),
			uid: this.appData.auth.uid,
			plan_id: this.planID,
			plan_name: this.appData.currentPlan.name,
			due_type: this.appData.currentPlan.due_type,
			due_amount: this.appData.currentPlan.due_amount,
			total_due: this.appData.currentPlan.total_due,
			final_amount: this.appData.currentPlan.final_amount,
			color: this.appData.currentPlan.color,
			paid_amount: 0,
			paid_due: 0,
			join_date: this.dataService.getCurrentTime(),
			status: 2
		};
		this.dataService.saveItem(this._savingRef, data).then((res) => {
			this.nav.setRoot(PlanSelectedPage, {savingID: res.key()});
		});
	}
}
