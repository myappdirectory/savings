import {Pipe, PipeTransform} from 'angular2/core';
import {DataService} from '../services/data/data';

@Pipe({
	name: 'MapToIterable'
})

export class MapToIterable implements PipeTransform {
	transform(value: any, args: any[] = null): any {		
		var arr = [];
		for(var i in value) {
			value[i]['_ref'] = i;
			arr.push(value[i]);
		}
		return arr;
	}
}

@Pipe({
  name: 'StatusLabel'
})
export class StatusLabel implements PipeTransform {
	public app: any;
	
	constructor(public dataService: DataService) {
		this.app = this.dataService.app;
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
	}
	
	transform(value: any, args: any[] = null): any {
		if(this.app && this.app.config && this.app.config.status && this.app.config.status[value]) {
			return this.app.config.status[value]['label'];
		} else {
			this.dataService.getConfig();
		}
	}
	
}

@Pipe({
  name: 'LocationLabel'
})
export class LocationLabel implements PipeTransform {
	public app: any;
	
	constructor(public dataService: DataService) {
		this.app = this.dataService.app;
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
	}
	
	transform(value: any, args: any[] = null): any {
		if(this.app && this.app.config && this.app.config.location && this.app.config.location[value]) {
			return this.app.config.location[value]['label'];
		} else {
			this.dataService.getConfig();
		}
	}
	
}