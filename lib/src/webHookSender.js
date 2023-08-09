/*
 * Copyright (c) 2019-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const axios = require('axios');

function sendWebHookMessage(e){
    axios(e).then(function (response) {
        console.log("WebHook Response: " + JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
        console.log(e);
    });
}

module.exports = {
    sendWebHookMessage:sendWebHookMessage
}