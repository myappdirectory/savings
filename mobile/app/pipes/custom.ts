import {Pipe, PipeTransform} from 'angular2/core';
import {DataService} from '../services/data';

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
	public appData: any;
	
	constructor(public dataService: DataService) {
		this.appData = this.dataService.appData;
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
	}
	
	transform(value: any, args: any[] = null): any {
		if(this.appData && this.appData.config && this.appData.config.status && this.appData.config.status[value]) {
			return this.appData.config.status[value]['label'];
		}
	}
	
}

@Pipe({
  name: 'LocationLabel'
})
export class LocationLabel implements PipeTransform {
	public appData: any;
	
	constructor(public dataService: DataService) {
		this.appData = this.dataService.appData;
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
	}
	
	transform(value: any, args: any[] = null): any {
		if(this.appData && this.appData.config && this.appData.config.location && this.appData.config.location[value]) {
			return this.appData.config.location[value]['label'];
		}
	}
	
}