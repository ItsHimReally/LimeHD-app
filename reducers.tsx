import { Reducer } from "redux";
import { SET_PROFILE, SET_FILTERS, SET_CHANNELS, SET_PROGRAMS } from "./actions";

const initialState = {
    profile: {
        id: 1,
        username: "LimeDir",
        name: "Lime",
        surname: "Director",
        avatar: null,
        password: 123,
        fare: {
            START: "20.12.2024",
            Киномир: "28.12.2023",
        },
        tvUntil: null,
        likes: {},
        wishlist: {}
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
