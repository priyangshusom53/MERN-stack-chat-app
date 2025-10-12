'use client';

export const appEvents = {
   addChat: 'app:addChat',
   updateChat: 'app:updateChat'
}

export function publishEvent(targetId, eventObject) {
   const event = new CustomEvent(eventObject.name, {
      detail: eventObject.detail,
      cancelable: true
   })

   const el = document.getElementById(targetId);
   if (el) el.dispatchEvent(event);
}

const eventHandlers = {}
