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
    addToast(toast){
        this.toasts = this.toasts.concat(toast);
    },
    removeToast(toastID){
        this.toasts = this.toasts.filter(el => el.id !== toastID)
    }
})

Alpine.start();


document.addEventListener('deleteBot', (evt) => {
    const evtParams = (evt as CustomEvent).detail;
    Alpine.store('dumbotDashboard').setIsBlocking(true);
    (window as any).axios.delete(`/botEditor/${evtParams.botId}`).then(res => {
        evtParams.holderId.innerHTML = res.data.html;
        Alpine.store('dumbotDashboard').addToast({id: nanoid(), type: 'success'});
    }).catch((e: Error) => {
        console.error(e);
        Alpine.store('dumbotDashboard').addToast({id: nanoid(), type: 'error'})
    }).finally(() => {
        Alpine.store('dumbotDashboard').setIsBlocking(false);
    })
})