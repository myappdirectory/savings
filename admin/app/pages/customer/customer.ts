import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data/data';
import {ValidationService} from '../../services/validation/validation';
import {MdInput, MdCheckbox} from '../../directives/material/material';
import {ControlMessages, ConfirmDelete} from '../../directives/common/common';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom.pipes';

@Component({
    templateUrl: 'app/pages/customer/customer.html',
	directives: [MdInput, MdCheckbox, ControlMessages, ConfirmDelete],
	pipes: [MapToIterable, LocationLabel, StatusLabel]
})


export class CustomerPage {
	public app: any;
	public _moduleRef = 'users';
	public mode = 'list';
	public selectedItem: any;
	
	public form: any;
	public list: any;
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.form = fb.group({
			_ref: [""],
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
			password: ["", Validators.compose([Validators.required, ValidationService.passwordValidator])],
			image: [""],
			location: ["", Validators.required],
			status: ["", Validators.required]
		});
		this.list = {
			title: 'Manage Customer',
			fields : [
				{code: 'image', title: 'Image', type: 'image', 'formatter': ''},
				{code: 'firstname', title: 'First name', type: 'text', 'formatter': ''},
				{code: 'lastname', title: 'Last ame', type: 'text', 'formatter': ''},
				{code: 'email', title: 'Email', type: 'text', 'formatter': ''},
				{code: 'location', title: 'Location', type: 'text', 'formatter': 'LocationLabel'},
				{code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel'}
			]
		};
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
		this.dataService.getItems(this._moduleRef, 'listItems');
	}
	
	addNew() {
		this.selectedItem = {};
		this.mode = 'edit';
	}
	
	editItem(id) {
		if(this.app.listItems[id]) {
			this.selectedItem = this.app.listItems[id];
			this.selectedItem._ref = id;
			this.selectedItem.password = atob(this.selectedItem.password);
			this.mode = 'edit';
		}
	}
	
	cancelEdit() {
		this.selectedItem = null;
		this.mode = 'list';
	}
	
	saveItem() {
		if(this.form.valid) {
			var data = this.form.value;
			this.dataService.saveUser(data);
			this.selectedItem = null;
			this.mode = 'list';
		}
	}
	
	deleteItem(id) { 
		var result = confirm("Do you want to delete this item?");
		if(result) {
			this.dataService.deleteUser(id);
		}
	}
	
	saveImage(event, model, identifier) {
		var file = event.target.files[0];
		if(file && file.type.match('image.*')) {
			this.dataService.uploadImage(file, identifier).then((imageUrl) => {
				if(imageUrl) {
					this.selectedItem[model] = imageUrl;
				}
			});
		}
	}
}