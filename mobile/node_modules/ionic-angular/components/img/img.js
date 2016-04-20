"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var util_1 = require('../../util/util');
var platform_1 = require('../../platform/platform');
var Img = (function () {
    function Img(_elementRef, _platform) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._src = '';
        this._srcA = '';
        this._srcB = '';
        this._useA = true;
        this._enabled = true;
        this._loaded = false;
    }
    Object.defineProperty(Img.prototype, "src", {
        set: function (val) {
            val = (util_1.isPresent(val) ? val : '');
            if (this._src !== val) {
                this._src = val;
                this._loaded = false;
                this._srcA = this._srcB = '';
                this._useA = !this._useA;
                this._update();
            }
        },
        enumerable: true,
        configurable: true
    });
    Img.prototype._update = function () {
        if (this._enabled && this.isVisible()) {
            if (this._useA) {
                this._srcA = this._src;
            }
            else {
                this._srcB = this._src;
            }
        }
    };
    Img.prototype.enable = function (shouldEnable) {
        this._enabled = shouldEnable;
        this._update();
    };
    Img.prototype.isVisible = function () {
        var bounds = this._elementRef.nativeElement.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < this._platform.height();
    };
    Img.prototype._onLoad = function () {
        this._loaded = this.isLoaded();
    };
    Img.prototype.isLoaded = function () {
        var imgEle;
        if (this._useA && this._imgA) {
            imgEle = this._imgA.nativeElement;
        }
        else if (this._imgB) {
            imgEle = this._imgB.nativeElement;
        }
        return (imgEle && imgEle.src !== '' && imgEle.complete);
    };
    Object.defineProperty(Img.prototype, "width", {
        set: function (val) {
            this._w = (typeof val === 'number') ? val + 'px' : val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Img.prototype, "height", {
        set: function (val) {
            this._h = (typeof val === 'number') ? val + 'px' : val;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('imgA'), 
        __metadata('design:type', core_1.ElementRef)
    ], Img.prototype, "_imgA", void 0);
    __decorate([
        core_1.ViewChild('imgB'), 
        __metadata('design:type', core_1.ElementRef)
    ], Img.prototype, "_imgB", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Img.prototype, "src", null);
    __decorate([
        core_1.HostBinding('class.img-loaded'), 
        __metadata('design:type', Boolean)
    ], Img.prototype, "_loaded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Img.prototype, "width", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Img.prototype, "height", null);
    Img = __decorate([
        core_1.Component({
            selector: 'ion-img',
            template: '<div *ngIf="_useA" class="img-placeholder" [style.height]="_h" [style.width]="_w"></div>' +
                '<img #imgA *ngIf="_useA" (load)="_onLoad()" [src]="_srcA" [style.height]="_h" [style.width]="_w">' +
                '<div *ngIf="!_useA" class="img-placeholder" [style.height]="_h" [style.width]="_w"></div>' +
                '<img #imgB *ngIf="!_useA" (load)="_onLoad()" [src]="_srcB" [style.height]="_h" [style.width]="_w">'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, platform_1.Platform])
    ], Img);
    return Img;
}());
exports.Img = Img;
