import { OnInit, OnDestroy } from '@angular/core';
export declare enum NotifyUpdate {
    onUser = 0,
    onStore = 1,
}
export interface IBObserver extends OnInit, OnDestroy {
    notify(message: NotifyUpdate): void;
}
export interface IBSubject {
    observers: Array<IBObserver>;
    registerObserver(observer: IBObserver): void;
    unregisterObserver(observer: IBObserver): void;
    notifyObservers(message: NotifyUpdate): void;
}
