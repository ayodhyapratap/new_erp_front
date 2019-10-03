import {postOuterAPI} from "../../app/utils/common";
import CONFIG from "../../app.config";
import moment from "moment";
import lockr from "lockr";
import {loggedInUser} from "../../app/utils/auth";

export const logErrorToSlackChannel = function (error, errorInfo) {
    let crashData = {
        "text": error.toString(),
        "attachments": [
            {
                "color": "#36a64f",
                "author_name": window.location.hostname,
                "author_link": "http://flickr.com/bobby/",
                "author_icon": window.location.hostname + "/favicon.ico",
                "title": "BK ERP Admin Application Crash Error",
                text: errorInfo.componentStack,
                "fields": [
                    {
                        "title": "Priority",
                        "value": "High",
                        "short": false
                    }, {
                        "title": "Domain",
                        "value": window.location.hostname,
                        "short": false
                    }, {
                        "title": "Path",
                        "value": window.location.pathname,
                        "short": false
                    }, {
                        "title": "User",
                        "value": loggedInUser(),
                        "short": false
                    }
                ],
                "ts": new moment().format('X')
            }
        ]
    }
    let successFn = function () {
        console.log("The above error has been notified to devs.");
    }
    let errorFn = function () {
        console.log("The above error notifications failed");
    }
    if ((CONFIG.prodDomain && CONFIG.crashHandling.slack.sendOnProduction && CONFIG.prodDomain.indexOf(window.location.hostname) > -1) || CONFIG.crashHandling.slack.sendOnDevelopment) {
        postOuterAPI(CONFIG.crashHandling.slack.webHookUrl, crashData, successFn, errorFn, {
            'Content-type': 'application/x-www-form-urlencoded'
        });
    }
}