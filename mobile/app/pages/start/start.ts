import {Page, NavController, NavParams} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {SignupPage} from '../signup/signup';
import {HomePage} from '../home/home';
import {DataService} from '../../services/data';

@Page({
	templateUrl: 'build/pages/start/start.html'
})
export class StartPage {
	
	constructor(private nav: NavController, private navParams: NavParams, public dataService: DataService) {	
	}
	
	gotoSignin() {
		this.nav.push(SigninPage);
	}
	
	gotoSignup() {
		this.nav.push(SignupPage);
	}
	
	gotoHome() {
		this.nav.setRoot(HomePage);
	}
	
	loginFacebook() {
		this.dataService.loginFacebook().then((res:any) => {
			if(res && res.uid) {
				this.nav.setRoot(HomePage);
			}
		});
	}
	
	loginGoogle() {
		this.dataService.loginGoogle().then((res:any) => {
			if(res && res.uid) {
				this.nav.setRoot(HomePage);
			}
		});
	}
}
