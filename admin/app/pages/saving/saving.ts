import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data/data';
import {ValidationService} from '../../services/validation/validation';
import {MdInput, MdCheckbox} from '../../directives/material/material';
import {ControlMessages, ConfirmDelete} from '../../directives/common/common';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom.pipes';

@Component({
    templateUrl: 'app/pages/saving/saving.html',
	directives: [MdInput, MdCheckbox, ControlMessages, ConfirmDelete],
	pipes: [MapToIterable, LocationLabel, StatusLabel]
})


export class SavingPage {
	public app: any;
	public _moduleRef = 'saving';
	public _userRef = 'users';
	public _planRef = 'plan';
	public mode = 'list';
	public selectedItem: any;
	
	public form: any;
	public list: any;
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.form = fb.group({
			_ref: [""],
			code: [""],
			name: ["", Validators.required],
			uid: ["", Validators.required],
			plan_id: ["", Validators.required],
			join_date: ["", Validators.required],
			paid_due: ["", Validators.required],
			paid_amount: ["", Validators.required],	
			status: ["", Validators.required]
		});
		this.list = {
			title: 'Manage Saving',
			fields : [
				{code: 'name', title: 'Name', type: 'text', 'formatter': ''},
				{code: 'code', title: 'Code', type: 'text', 'formatter': ''},
				{code: 'uid', title: 'Customer', type: 'user', 'formatter': ''},
				{code: 'plan_id', title: 'Plan', type: 'plan', 'formatter': ''},
				{code: 'paid_due', title: 'Paid Due', type: 'text', 'formatter': ''},
				{code: 'paid_amount', title: 'Paid Amount', type: 'text', 'formatter': ''},
				{code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel'}
			]
		};
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
		this.dataService.getItems(this._moduleRef, 'listItems');
		this.dataService.getItems(this._userRef, 'users');
		this.dataService.getItems(this._planRef, 'plans');
	}
	
	addNew() {
		this.selectedItem = {};
		this.mode = 'edit';
	}
	
	editItem(id) {
		if(this.app.listItems[id]) {
			this.selectedItem = this.app.listItems[id];
			this.selectedItem._ref = id;
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
			this.dataService.saveItem(this._moduleRef, data);
			this.selectedItem = null;
			this.mode = 'list';
		}
	}
	
	deleteItem(id) { 
		var result = confirm("Do you want to delete this item?");
		if(result) {
			this.dataService.deleteItem(this._moduleRef, id);
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