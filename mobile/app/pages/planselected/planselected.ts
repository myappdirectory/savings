import {Page, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataService} from '../../services/data';
import {StatusLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/planselected/planselected.html',
	pipes: [StatusLabel]
})
export class PlanSelectedPage {
	public appData: any;
	public savingID: any;
	public _moduleRef = 'saving';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.savingID = this.navParams.get('savingID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.savingID, 'currentSaving');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoHome() {
		this.nav.setRoot(HomePage);
	}
}
