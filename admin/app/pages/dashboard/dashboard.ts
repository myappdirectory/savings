import {Component} from 'angular2/core';
import {DataService} from '../../services/data/data';

@Component({
    templateUrl: 'app/pages/dashboard/dashboard.html'
})


export class DashboardPage {
	constructor(public dataService: DataService) {}
}