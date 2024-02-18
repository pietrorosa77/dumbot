import './bootstrap';
import {nanoid} from 'nanoid';

import Alpine from 'alpinejs';

(window as any).Alpine = Alpine;

Alpine.store('dumbotDashboard', {
    isBlocking: false,

    setIsBlocking(isBlocking) {
        this.isBlocking = isBlocking
    },

    toasts:[],
    addToast(toast, timer = 2000){
        const index = this.toasts.length;
        const id = nanoid();
        let totalVisible = this.toasts.filter((toast) => toast.visible).length + 1;
        this.toasts = this.toasts.concat({...toast, visible: true, timeOut: timer * totalVisible, id});
        setTimeout(() => this.removeToast(id), timer * totalVisible);
    },
    removeToast(toastID){
        this.toasts = this.toasts.filter(el => el.id !== toastID);
    }
})

Alpine.start();


document.addEventListener('deleteBot', (evt) => {
    const evtParams = (evt as CustomEvent).detail;
    Alpine.store('dumbotDashboard').setIsBlocking(true);
    (window as any).axios.delete(`/botEditor/${evtParams.botId}`).then(res => {
        evtParams.holderId.innerHTML = res.data.html;
        Alpine.store('dumbotDashboard').addToast({type: 'success', message: 'bot deleted'});
    }).catch((e: Error) => {
        console.error(e);
        Alpine.store('dumbotDashboard').addToast({ type: 'error' , message: 'error deleting bot'})
    }).finally(() => {
        Alpine.store('dumbotDashboard').setIsBlocking(false);
    })
})