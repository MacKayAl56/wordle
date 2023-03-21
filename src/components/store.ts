import { createStore } from 'vuex';

export interface State {
    username: string;
    displayUsername: string;
    userID: string;
}

export default createStore<State>({
    state: {
        username: '',
        displayUsername: '',
        userID: '',
    },
    mutations: {
        setUsername(state, payload: string) {
            state.username = payload;
        },
        setDisplayUsername(state, payload: string) {
            state.displayUsername = payload;
        },
        setUserID(state, payload: string) {
            state.userID = payload;
        },
    },
    actions: {
        setUsername({ commit }, payload: string) {
            commit('setUsername', payload);
        },
        setDisplayUsername({ commit }, payload: string) {
            commit('setDisplayUsername', payload);
        },
        setUserID({ commit }, payload: string) {
            commit('setUserID', payload);
        },
    },
    getters: {
        getUsername(state) {
            return state.username;
        },
        getDisplayUsername(state) {
            return state.displayUsername;
        },
        getUserID(state) {
            return state.userID;
        },
    },
});

