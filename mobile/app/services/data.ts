import {App, IonicApp, Platform, Alert, MenuController, Loading} from 'ionic-angular';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {HomePage} from '../pages/home/home';

@Injectable()
export class DataService {
	private firebaseUrl = "https://my-savings.firebaseio.com/";
	public mediaServer = "http://localhost/git/savings/";
	public db: any;
	public appData: any;
	public loading: any;
	public refresher: any;
	
	public _adminRef = 'admin';
	public _userRef = 'users';
	public _configRef = 'config';
	
	public observable$: Observable<Object>;
	private _observer: any;	
	
	constructor(private app: IonicApp, private platform: Platform) {
		this.db = new Firebase(this.firebaseUrl);
		this.observable$ = new Observable(observer => this._observer = observer).share();
		this.appData = {};
	}
	
	redirect(page, type) {
		if(page) {
			let nav = this.app.getComponent('nav');
			type == 'push' ? nav.push(page) : nav.setRoot(page);
		}
	}
	
	doAlert(info) {
		let nav = this.app.getComponent('nav');
		let alert = Alert.create({title: info.title, message: info.message, buttons: ['Ok']});
		nav.present(alert);
	}
	
	closeAlert() {
		this.appData.alert = null;
		this._observer.next(this.appData);
	}
	
	showLoading() {
		if(!this.loading) {
			let nav = this.app.getComponent('nav');
			if (this.platform.is('android')) {
				this.loading = Loading.create({
					spinner: 'hide',
					content: '<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/></svg></div>'
				});
			} else {
				this.loading = Loading.create();
			}
			nav.present(this.loading);
		}
	}
	
	hideLoading() {
		setTimeout(() => {
			if(this.loading) {
				this.loading.dismiss();
				this.loading = false;
			}
		}, 1000);
	}
	
	getCurrentTime() {
		var date = new Date();
		var fullDate = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + " " + 
						("0" + date.getHours().toString()).substr(-2)  + ":" + ("0" + date.getMinutes().toString()).substr(-2)  + ":"  + ("0" + date.getSeconds().toString()).substr(-2);
		return fullDate;
	}
	
	removeUndefined(object) {
		return JSON.parse(JSON.stringify(object))
	}
	
	guid() {
		return Math.random().toString(16).slice(-4) + '-' +  Math.random().toString(16).slice(-4) + '-' +  Math.random().toString(16).slice(-4) + '-' +  Math.random().toString(16).slice(-4);
	}
	
	uploadImage(file, pathname) {
		return new Promise((resolve, reject) => {
			if(file.type.match('image.*')) {
				var formData = new FormData();
				formData.append('images['+pathname+']', file);
				formData.append('action', 'saveImage');
				var xhr = new XMLHttpRequest();
				xhr.open('POST', this.mediaServer+'ajax.php', true);
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
		this.appData.auth = this.db.getAuth();
		this.db.child('.info/connected').on('value', (res) => {
			if(res.val()) {
				this.appData.connectionError = false;
				this.appData.auth = this.db.getAuth();
				if(this.appData.auth && this.appData.auth.uid) {
					this.getItem(this._userRef, this.appData.auth.uid, 'profile');
					this._observer.next(this.appData);
				} else {
					this._observer.next(this.appData);
				}				
			} else {
				//this.appData.connectionError = {'type': 'connection-error', 'message': 'Waiting for network connection...'};
				this._observer.next(this.appData);
			}
		});
	}
	
	getConfig() {
		this.showLoading();
		this.db.child(this._configRef).on('value', (res) => {
			this.appData.config = res.val();
			this._observer.next(this.appData);
			this.hideLoading();
		});
	}
	
	//User Functions
	saveUser(data) {
		return new Promise((resolve, reject) => {
			this.showLoading();
			if(!data._ref){
				var params = {email : data.email, password: data.password};
				this.db.createUser(params, (error, authData) => {
					if (error) {
						this.hideLoading();
						this.doAlert({title: 'Error', message: error.message});
					} else {
						data.password = btoa(data.password);
						data.provider = 'password';
						data.status = '1';
						data._ref = authData.uid;
						this.saveItem(this._userRef, data);
						resolve(this.loginUser(params));
					}
				});
			} else {
				data.password = btoa(data.password);
				this.saveItem(this._userRef, data);
			}
		});
	}
	
	loginUser(data) {
		return new Promise((resolve, reject) => {
			if(data) {
				var customer = null;
				this.showLoading();
				this.db.child(this._userRef).orderByChild('email').equalTo(data.email).on('value', (res) => {
					res.forEach((child) => {customer = child.val();});					
					if(customer) {
						this.db.authWithPassword(data, (error, authData) => {
							this.hideLoading();
							if (error) {						
								this.doAlert({title: 'Error', message: error.message});
							} else {
								this.appData.auth = authData;
								this.appData.profile = customer;
								this.initialize();
								resolve(authData);
							}
						});
					} else {
						this.hideLoading();
						this.doAlert({title: 'Error', message: 'Invalid Email Address'});
					}
				});	
			}
		});
	}
	
	loginFacebook() {
		return new Promise((resolve, reject) => {
			this.showLoading();
			this.db.authWithOAuthPopup("facebook", (error, authData) => {
				if (error) {
					this.hideLoading();
					this.doAlert({title: 'Error', message: error.message});
				} else {
					var data = {
						_ref: authData.uid,
						firstname: authData.facebook.cachedUserProfile.first_name,
						lastname: authData.facebook.cachedUserProfile.last_name,
						email: authData.facebook.email,
						image: authData.facebook.profileImageURL,
						status: "1",
						provider: 'facebook'
					};
					this.saveItem(this._userRef, data);
					this.appData.auth = authData;
					this.appData.profile = data;
					this._observer.next(this.appData);
					this.hideLoading();
					resolve(authData);
				}
			});
		});
	}
	
	loginGoogle() {
		return new Promise((resolve, reject) => {
			this.showLoading();
			this.db.authWithOAuthPopup("google", (error, authData) => {
				if (error) {
					this.hideLoading();
					this.doAlert({title: 'Error', message: error.message});
				} else {
					var data = {
						_ref: authData.uid,
						firstname: authData.google.cachedUserProfile.given_name,
						lastname: authData.google.cachedUserProfile.family_name,
						email: authData.google.email,
						image: authData.google.profileImageURL,
						status: "1",
						provider: 'google'
					};
					this.saveItem(this._userRef, data);
					this.appData.auth = authData;
					this.appData.profile = data;
					this._observer.next(this.appData);
					this.hideLoading();
					resolve(authData);
				}
			});
		});
	}
	
	resetPassword(data) {
		if(this.appData.auth) {
			this.showLoading();
			this.db.changePassword(data, (error) => {
				if (error) {
					this.hideLoading();
					switch (error.code) {
						case "INVALID_PASSWORD":
							this.doAlert({title: 'Error', message: 'The specified user account password is incorrect.'});
							break;
						case "INVALID_USER":
							this.doAlert({title: 'Error', message: 'The specified user account does not exist.'});
							break;
						default:
							this.doAlert({title: 'Error', message: error.message});
					}
				} else {
					data.newpassword = btoa(data.newpassword);
					this.db.child(this._userRef).child(this.appData.auth.uid).update({'password': data.newpassword});
					this.hideLoading();
				}
			});
		}
	}
	
	logout() {
		this.db.unauth();
		this.appData.auth = null;
		this._observer.next(this.appData);
	}
	
	deleteUser(id) {
		this.showLoading();
		this.db.child(this._userRef).child(id).on('value', (data) => {
			var customer = data.val();
			if(customer) {
				this.db.removeUser({email : customer.email, password : atob(customer.password)}, (error) => {
					if (error) {
						this.hideLoading();
						this.doAlert({title: 'Error', message: error.message});
					} else {
						this.db.child(this._userRef).child(id).remove();
						this.hideLoading();
					}
				});
			}
		});
	}
	
	//Common Functions
	getItems(moduleRef, name) {
		this.showLoading();
		this.db.child(moduleRef).orderByChild('status').equalTo('1').on('value', (res) => {
			if(name) {
				this.appData[name] = res.val();
			} else {
				this.appData[moduleRef] = res.val();
			}
			this.hideLoading();
			this._observer.next(this.appData);
		})
	}
	
	getItemsByFilter(moduleRef, name, filter) {
		this.showLoading();
		this.db.child(moduleRef).orderByChild(filter.key).equalTo(filter.value).on('value', (res) => {
			if(name) {
				this.appData[name] = res.val();
			} else {
				this.appData[moduleRef] = res.val();
			}			
			this.hideLoading();
			this._observer.next(this.appData);
		})
	}
	
	getItem(moduleRef, itemRef, name) {
		this.showLoading();
		this.db.child(moduleRef).child(itemRef).on('value', (res) => {
			this.appData[name] = res.val();
			if(this.appData[name]) { this.appData[name]['_ref'] = itemRef; }
			this._observer.next(this.appData);
			this.hideLoading();
		})
	}
	
	saveItem(moduleRef, data) {
		if(data) {
			this.showLoading();
			data = this.removeUndefined(data);
			if(data._ref) {
				data.created = this.getCurrentTime();
				data.updated = this.getCurrentTime();
				var res = this.db.child(moduleRef).child(data._ref).update(data);
				this.hideLoading();
			} else {
				data.updated = this.getCurrentTime();
				var res = this.db.child(moduleRef).push(data);
				this.hideLoading();
			}
			return res;
		}
	}
	
	deleteItem(moduleRef, itemRef) {
		this.db.child(moduleRef).child(itemRef).remove();
	}
	
	//Specific Funtions
	getMySavings(_moduleRef) {
		this.getItemsByFilter(_moduleRef, 'savings', {key: 'uid', value: this.appData.auth.uid});
	}
	
	getMyTransactions(_moduleRef) {
		this.getItemsByFilter(_moduleRef, 'transactions', {key: 'uid', value: this.appData.auth.uid});
	}
}