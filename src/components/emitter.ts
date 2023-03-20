import Vue from 'vue';
import mitt, { Emitter } from 'mitt';

const emitter: Emitter<any> = mitt();

export { emitter };