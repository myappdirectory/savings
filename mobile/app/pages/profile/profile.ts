import {Page, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data';
import {ValidationService} from '../../services/validation';
import {ControlMessages} from '../../directives/common';

@Page({
	templateUrl: 'build/pages/profile/profile.html',
	directives: [ControlMessages]
})
export class ProfilePage {
	public profileForm: any;
	public appData: any;
	public _moduleRef = 'users';
	public formData = {};
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.appData = this.dataService.appData;
		this.profileForm = fb.group({
			_ref: [""],
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			phone: ["", Validators.required],
			location: ["", Validators.required]
		});
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
			this.formData = this.appData.profile ? this.appData.profile : {};
		});
		this.dataService.getItem(this._moduleRef, this.appData.auth.uid, 'profile');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	saveProfile() {
		if(this.profileForm.valid) {
			var data = this.profileForm.value;
			this.dataService.saveUser(data);
		}
	}
}
