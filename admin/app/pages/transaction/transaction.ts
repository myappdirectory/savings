import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data/data';
import {ValidationService} from '../../services/validation/validation';
import {MdInput, MdCheckbox} from '../../directives/material/material';
import {ControlMessages, ConfirmDelete} from '../../directives/common/common';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom.pipes';

@Component({
    templateUrl: 'app/pages/transaction/transaction.html',
	directives: [MdInput, MdCheckbox, ControlMessages, ConfirmDelete],
	pipes: [MapToIterable, LocationLabel, StatusLabel]
})


export class TransactionPage {
	public app: any;
	public _moduleRef = 'transaction';
	public mode = 'list';
	public selectedItem: any;
	
	public form: any;
	public list: any;
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.form = fb.group({
			_ref: [""],
			uid: ["", Validators.required],
			saving_id: ["", Validators.required],
			paid_due: ["", Validators.required],
			due_amount: ["", Validators.required],	
			status: ["", Validators.required]
		});
		this.list = {
			title: 'Manage Transaction',
			fields : [
				{code: 'uid', title: 'Customer', type: 'text', 'formatter': ''},
				{code: 'saving_id', title: 'Saving', type: 'text', 'formatter': ''},
				{code: 'paid_due', title: 'Paid Due', type: 'text', 'formatter': ''},
				{code: 'due_amount', title: 'Due Amount', type: 'text', 'formatter': ''},
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