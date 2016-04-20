import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data/data';
import {ValidationService} from '../../services/validation/validation';
import {ControlMessages} from '../../directives/common/common';
import {MdInput, MdCheckbox} from '../../directives/material/material';

@Component({
    selector: 'app-login',
    templateUrl: 'app/pages/login/login.html',
	directives: [MdInput, MdCheckbox, ControlMessages]
})


export class LoginPage {
	public loginForm: any;
	public passwordForm: any;
	public mode = 'login';
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.loginForm = fb.group({
			email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
			password: ["", Validators.required],
			remember: [""]
		});
		this.passwordForm = fb.group({
			email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])]
		});
	}
	
	register() {
		var data = {email: "mail.sureshknithi@gmail.com", password: "june9th.", role: "admin", firstname: "Suresh", lastname: "K", location: "Chennai", status: 1};
		this.dataService.saveAdmin(data);
	}
	
	login() {
		if(this.loginForm.valid) {
			var data = this.loginForm.value;
			this.dataService.loginAdmin(data);
		}
	}
	
	getPassword() {
		if(this.passwordForm.valid) {
			var data = this.passwordForm.value;
			this.dataService.getPassword(data);
		}
	}
}