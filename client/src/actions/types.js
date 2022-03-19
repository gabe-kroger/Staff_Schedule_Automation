//this file is going to hold all of our constants (constant variables)
//this is setting our alert variables globally so we have a centralized file of all our action types

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'; //after making axios call to the backend, it will return success
export const REGISTER_FAIL = 'REGISTER_FAIL'; // if the axios call fails, it will return register_fail
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
