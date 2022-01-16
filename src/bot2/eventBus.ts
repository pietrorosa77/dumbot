import React from "react";

let _bus: Comment;

type DmbtEventBusUnsubscibeHandle = (event: CustomEvent) => void;
type DmbtEvents = "syncScroll" | "resize";

interface IDmbtEventBus {
  subscribe: (
    event: DmbtEvents,
    callback: (data?: any) => void,
    options?: AddEventListenerOptions
  ) => DmbtEventBusUnsubscibeHandle;

  unSubscribe: (
    event: DmbtEvents,
    unsubscribeHandle: DmbtEventBusUnsubscibeHandle,
    options?: AddEventListenerOptions
  ) => void;

  emit: (type: DmbtEvents, data: any) => void;
}

const subscribe = (
  event: DmbtEvents,
  callback: (data?: any) => void,
  options?: AddEventListenerOptions
): DmbtEventBusUnsubscibeHandle => {
  const cb = (event: CustomEvent) => {
    const eventData = event.detail;
    callback(eventData);
  };
  _bus.addEventListener(
    event,
    cb as EventListenerOrEventListenerObject,
    options
  );
  return cb;
};

const unSubscribe = (
  event: DmbtEvents,
  unsubscribeHandle: DmbtEventBusUnsubscibeHandle,
  options?: AddEventListenerOptions
) => {
  _bus.removeEventListener(
    event,
    unsubscribeHandle as EventListenerOrEventListenerObject,
    options
  );
};

const emit = (type: DmbtEvents, data: any) => {
  const event = new CustomEvent(type, {
    detail: data,
  });
  _bus.dispatchEvent(event);
};

export const getEventBus = (): IDmbtEventBus => {
  if (!_bus) {
    _bus = document.appendChild(new Comment("my-event-bus"));
  }

  return {
    subscribe,
    unSubscribe,
    emit,
  };
};

export const EventBusContext: React.Context<IDmbtEventBus> =
  React.createContext<any>(null);
