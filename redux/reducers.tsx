import { Reducer } from "redux";
import { SET_PROFILE, SET_FILTERS, SET_CHANNELS, SET_PROGRAMS } from "./actions";

const initialState = {
    profile: {
        id: null,
        username: null,
        name: null,
        surname: null,
        avatar: null,
        password: null,
        fare: null,
        tvUntil: null,
        likes: null,
        wishlist: null
    },
    filters: {
        rating: -1,
        timeStart: "",
        timeEnd: "",
        genre: "",
        minAge: -1,
        prodYear: "",
        prodPlace: "",
        duration: -1
    },
    channels: [],
    programs: []
};

function userReducer(state = initialState, action: { type: any; payload: Reducer; }) {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.payload}
        case SET_FILTERS:
            return {...state, filters: action.payload}
        case SET_CHANNELS:
            return {
                ...state,
                channels: action.payload
            };
        case SET_PROGRAMS:
            return {
                ...state,
                programs: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;
