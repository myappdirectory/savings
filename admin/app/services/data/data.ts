import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class DataService {
	private firebaseUrl = "https://my-savings.firebaseio.com/";
	public backendServer = "http://localhost/git/savings/";
	public db: any;
	public app: any;
	
	public _adminRef = 'admin';
	public _userRef = 'users';
	public _configRef = 'config';
	
	public observable$: Observable<Object>;
	private _observer: any;	
	
	constructor() {
		this.db = new Firebase(this.firebaseUrl);
		this.observable$ = new Observable(observer => this._observer = observer).share();
		this.app = {};
	}
	
	doAlert(info) {
		this.app.alert = info;
		this._observer.next(this.app);
	}
	
	closeAlert() {
		this.app.alert = null;
		this._observer.next(this.app);
	}
	
	showLoading() {
		this.app.loading = true;
		this._observer.next(this.app);
	}
	
	hideLoading() {
		this.app.loading = false;
		this._observer.next(this.app);
	}
	
	removeUndefined = function(object){
		return JSON.parse(JSON.stringify(object))
	}
	
	uploadImage(file, pathname) {
		return new Promise((resolve, reject) => {
			if(file.type.match('image.*')) {
				var formData = new FormData();
				formData.append('images['+pathname+']', file);
				formData.append('action', 'saveImage');
				var xhr = new XMLHttpRequest();
				xhr.open('POST', this.backendServer+'ajax.php', true);
				xhr.onload = function () {
					if (xhr.status === 200) {
						var res = JSON.parse(xhr.responseText);
						if(res.status == 'success') {
							resolve(res.imageUrl);
						} else {
							this.doAlert({title: 'Error', message: res.message});
						}
					}
				};
				xhr.send(formData);
			}
		});
	}
	
	initialize() {
		this.db.child('.info/connected').on('value', (res) => {
			if(res.val()) {
				this.showLoading();
				this.app.connectionError = false;
				this.app.auth = this.db.getAuth();
				this.db.child(this._configRef).on('value', (res) => {					
					this.app.config = res.val();
					this._observer.next(this.app);
					this.hideLoading();
				});
			} else {
				this.app.connectionError = {'type': 'connection-error', 'message': 'Waiting for network connection...'};
				this._observer.next(this.app);
			}
		});
	}
	
	getConfig() {
		this.db.child(this._configRef).on('value', (res) => {
			this.app.config = res.val();
			this._observer.next(this.app);
		});
	}
	
	//Admin Functions
	loginAdmin(data) {
		if(data) {
			this.showLoading();
			this.db.child(this._adminRef).orderByChild('email').equalTo(data.email).on('value', (res) => {
				var admin = res.val();
				if(admin) {
					this.db.authWithPassword(data, (error, authData) => {
						this.hideLoading();
						if (error) {						
							this.doAlert({title: 'Error', message: error.message});
						} else {
							this.app.auth = authData;
							this.app.globalMessage = {'type': 'success', 'message': 'Welcome back user'};
							this._observer.next(this.app);
						}
					});
				} else {
					this.hideLoading();
					this.doAlert({title: 'Error', message: 'Invalid Email Address'});
				}
			});	
		}
	}
	
	logout() {
		this.db.unauth();
		this.app.auth = null;
		this._observer.next(this.app);
	}
	
	getPassword(data) {
		this.showLoading();
		this.db.resetPassword(data, (error) => {
			this.hideLoading();
			if (error) {				
				this.doAlert({title: 'Error', message: error.message});
			} else {			
				this.doAlert({title: 'Success', message: 'The password reset link has been sent to your email.'});
			}
		});	
	}
	
	saveAdmin(data) {
		this.showLoading();
		if(!data._ref){
			this.db.createUser({email : data.email, password: data.password}, (error, authData) => {
				if (error) {
					this.hideLoading();
					this.doAlert({title: 'Error', message: error.message});
				} else {
					data.password = btoa(data.password);
					this.saveItem(this._adminRef, data);
				}
			});
		} else {
			data.password = btoa(data.password);
			this.saveItem(this._adminRef, data);
		}
	}
	
	deleteAdmin(id) {
		this.showLoading();
		this.db.child(this._adminRef).child(id).on('value', (data) => {
			var admin = data.val();
			if(admin) {
				this.db.removeUser({email : admin.email, password : atob(admin.password)}, (error) => {
					if (error) {
						this.hideLoading();
						this.doAlert({title: 'Error', message: error.message});
					} else {
						this.db.child(this._adminRef).child(id).remove();
						this.hideLoading();
					}
				});
			}
		});
	}
	
	//User Functions
	saveUser(data) {
		this.showLoading();
		if(!data._ref){
			this.db.createUser({email : data.email, password: data.password}, (error, authData) => {
				if (error) {
					this.hideLoading();
					this.doAlert({title: 'Error', message: error.message});
				} else {
					data.password = btoa(data.password);
					this.saveItem(this._userRef, data);
				}
			});
		} else {
			data.password = btoa(data.password);console.log(data.password);
			this.saveItem(this._userRef, data);
		}
	}
	
	deleteUser(id) {
		this.showLoading();
		this.db.child(this._userRef).child(id).on('value', (data) => {
			var customer = data.val();
			if(customer) {
				if(customer.provider == 'password') {
					this.db.removeUser({email : customer.email, password : atob(customer.password)}, (error) => {
						if (error) {
							this.hideLoading();
							this.doAlert({title: 'Error', message: error.message});
						} else {
							this.db.child(this._userRef).child(id).remove();
							this.hideLoading();
						}
					});
				} else {
					this.db.child(this._userRef).child(id).remove();
					this.hideLoading();
				}
			}
		});
	}
	
	//Common Functions
	getItems(moduleRef, name) {
		this.showLoading();
		this.db.child(moduleRef).on('value', (res) => {
			if(name) {
				this.app[name] = res.val();
			} else {
				this.app[moduleRef] = res.val();
			}
			this.hideLoading();
			this._observer.next(this.app);
		})
	}
	
	getActiveItems(moduleRef, name) {
		this.showLoading();
		this.db.child(moduleRef).orderByChild('status').equalTo('1').on('value', (res) => {
			if(name) {
				this.app[name] = res.val();
			} else {
				this.app[moduleRef] = res.val();
			}
			this.hideLoading();
			this._observer.next(this.app);
		})
	}
	
	getItem(moduleRef, itemRef, name) {
		this.showLoading();
		this.db.child(moduleRef).child(itemRef).on('value', (res) => {
			this.app[name] = res.val();
			this._observer.next(this.app);
			this.hideLoading();
		})
	}
	
	saveItem(moduleRef, data) {
		if(data) {
			this.showLoading();
			data = this.removeUndefined(data);
			if(data._ref) {
				this.db.child(moduleRef).child(data._ref).update(data);
				this.hideLoading();
			} else {
				this.db.child(moduleRef).push(data);
				this.hideLoading();
			}
		}
	}
	
	deleteItem(moduleRef, itemRef) {
		this.db.child(moduleRef).child(itemRef).remove();
	}
}