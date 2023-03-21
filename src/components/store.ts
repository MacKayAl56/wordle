import { createStore } from 'vuex';

export interface State {
    username: string;
    userID: string;
}

export default createStore<State>({
    state: {
        username: '',
        userID: '',
    },
    mutations: {
        setUsername(state, payload: string) {
            state.username = payload;
        },
        setUserID(state, payload: string) {
            state.userID = payload;
        },
    },
    actions: {
        setUsername({ commit }, payload: string) {
            commit('setUsername', payload);
        },
        setUserID({ commit }, payload: string) {
            commit('setUserID', payload);
        },
    },
    getters: {
        getUsername(state) {
            return state.username;
        },
        getUserID(state) {
            return state.userID;
        },
    },
});

