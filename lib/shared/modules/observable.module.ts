import { OnInit, OnDestroy } from '@angular/core';

export enum NotifyUpdate {
    onUser,
    onStore
}

export interface IBObserver extends OnInit, OnDestroy {
    notify(message:NotifyUpdate): void;
}

export interface IBSubject {
    observers: Array<IBObserver>;

    registerObserver(observer:IBObserver):void;
    unregisterObserver(observer:IBObserver):void;
    notifyObservers(message:NotifyUpdate):void;
}