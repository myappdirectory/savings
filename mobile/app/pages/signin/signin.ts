import {Page, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data';
import {ValidationService} from '../../services/validation';
import {ControlMessages} from '../../directives/common';
import {HomePage} from '../home/home';

@Page({
	templateUrl: 'build/pages/signin/signin.html',
	directives: [ControlMessages]
})
export class SigninPage {
	public mode = 'singin';
	public signinForm: any;
	public passwordForm: any;
	
	constructor(private nav: NavController, navParams: NavParams, public dataService: DataService, public fb:FormBuilder) {
		this.signinForm = fb.group({
			email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
			password: ["", Validators.compose([Validators.required, ValidationService.passwordValidator])]
		});
		this.passwordForm = fb.group({
			email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])]
		});
	}
	
	forgotPassword() {
		this.mode = 'password';
		return false;
	}
	
	backToSignin() {
		this.mode = 'singin';
		return false;
	}
	
	signIn() {
		if(this.signinForm.valid) {
			var data = this.signinForm.value;
			this.dataService.loginUser(data).then((res:any) => {
				if(res && res.uid) {
					this.nav.setRoot(HomePage);
				}
			});
		}
	}
	
	resetPassword() {
		if(this.passwordForm.valid) {
			var data = this.passwordForm.value;
			this.dataService.resetPassword(data);
		}
	}
}
