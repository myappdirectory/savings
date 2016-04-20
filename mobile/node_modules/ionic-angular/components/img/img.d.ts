import { ElementRef } from 'angular2/core';
import { Platform } from '../../platform/platform';
export declare class Img {
    private _elementRef;
    private _platform;
    private _src;
    private _srcA;
    private _srcB;
    private _useA;
    private _w;
    private _h;
    private _enabled;
    constructor(_elementRef: ElementRef, _platform: Platform);
    private _imgA;
    private _imgB;
    src: string;
    private _update();
    enable(shouldEnable: boolean): void;
    isVisible(): boolean;
    private _loaded;
    private _onLoad();
    isLoaded(): boolean;
    width: string | number;
    height: string | number;
}
