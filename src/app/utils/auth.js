import lockr from 'lockr';
import axios from 'axios';
import {AUTH_TOKEN, PASSWORD, ROLE, EMAIL, PRACTICE, GROUP} from "../constants/dataKeys";
import {getAPI, handleErrorResponse, makeURL} from "./common";
import {LOGIN_URL, USER_DATA} from "../constants/api";
import {CURRENT_PRACTICE} from "../constants/formLabels";


export const loggedInUser = function () {
    let role = lockr.get(ROLE);
    let token = lockr.get(AUTH_TOKEN);
    if (role && token) {
        return role;
    }
    return null;
};

export const currentPractice = function () {

}
export const setCurrentPractice = function (practice) {
    lockr.set(CURRENT_PRACTICE, practice);
}
export const loggedInUserGroup = function () {
    let role = lockr.get(ROLE);
    let token = lockr.get(AUTH_TOKEN);
    let group = lockr.get(GROUP);
    if (role && token && group) {
        return group;
    }
    return null;
};
export const loggedInUserPractices = function () {
    let role = lockr.get(ROLE);
    let token = lockr.get(AUTH_TOKEN);
    let practice = lockr.get(PRACTICE);
    if (role && token && practice) {
        return practice;
    }
    return [];
};
export const loggedInactivePractice = function () {
    let currentPractice = lockr.get(CURRENT_PRACTICE);
    if (currentPractice && currentPractice != {}) {
        return currentPractice;
    } else {
        let practice = lockr.get(PRACTICE);
        if (practice && practice.length) {
            console.log(practice);
            setCurrentPractice(practice[0].pratice.id);
            return loggedInactivePractice();
        }
    }
    return null
}


export const loggedInPermissions = function () {
    let groups = lockr.get(GROUP);
    let permissions = {};
    if (groups)
        groups.forEach(function (group) {
            group.permissions.forEach(function (permission) {
                permissions[permission.codename] = true
            });
        })
    return permissions;
}


export const logInUser = function (data, successFn, errorFn) {
    console.log("workign");
    var data = {
        [EMAIL]: data.email,
        [PASSWORD]: data.password
    };
    axios.post(makeURL(LOGIN_URL), data).then(function (response) {
        // console.log(response);
        let data = response.data;
        lockr.set(ROLE, data.user);
        lockr.set(AUTH_TOKEN, data.token);
        lockr.set(PRACTICE, data.practice_permissions);
        successFn()
    }).catch(function (error) {
        console.log(error);
        handleErrorResponse(error);
        errorFn();
    })
};
export const loadUserDetails = function (callBackFn) {
    let successFn = function (data) {
        lockr.set(ROLE, data.user);
        callBackFn();
    }
    let errorFn = function () {

    }
    getAPI(USER_DATA, successFn, errorFn);
}
export const saveAuthToken = function (response, successFn) {
    let data = response;
    lockr.set(ROLE, data.id);
    lockr.set(AUTH_TOKEN, data.token);
    successFn()
}

export const logOutUser = function (successFn, errorFn) {
    lockr.rm(ROLE);
    lockr.rm(AUTH_TOKEN);
    lockr.rm(PRACTICE);
    lockr.rm(GROUP);
    successFn();
};
export const getAuthToken = function () {
    let token = lockr.get(AUTH_TOKEN);
    return token;
};

export const checkRole = function (role) {
    let roles = lockr.get(ROLE);
    if (roles[role] === undefined || roles[role] === '' || !roles[role]) {
        return false;
    }
    return roles[role];
}
