import { Injectable } from '@angular/core';

interface NotificationMessage {
    type: string;
    message: string;
    auto_destroy: boolean;
}

@Injectable()
export class NotificationService {

    // constructor() { }

    notifications: NotificationMessage[] = [];

    notify(type: string, message: string, auto_destroyed: boolean = true): void {
        let _self = this;
        // Auto vs. manual destructor
        if (auto_destroyed === undefined) {
            auto_destroyed = true;
        }

        const notification: NotificationMessage = {
            type: type,
            message: message,
            auto_destroy: auto_destroyed
        };

        this.notifications.push(notification);
        window.scrollTo(0, 0);

        // Destructor
        if (auto_destroyed) {
            // Retire notification after 5 secs
            setTimeout(function () {
                _self.clear(-1);
            }, 5000);
        }
    }

    clear(index: number): void {
        if (index === -1) {
            // clear all auto-destroy notifications
            this.notifications.forEach((notification: NotificationMessage, i: number) => {
                if (notification.auto_destroy) {
                    this.notifications.splice(i, 1);
                }
            });
        } else {
            // otherwise remove specific message
            this.notifications.splice(index, 1);
        }
    }

    clearAll(): void {
        this.notifications = [];
    }

}
