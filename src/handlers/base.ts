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

import { WebhookTarget } from "../WebHookTarget";
import { 
    IqWebhookPayloadApplicationEvaluation,
    IqWebhookPayloadWaiverRequest
} from "../types";

export enum HandlerType {
    SLACK,
    TEAMS,
    JIRA
}

export abstract class BaseHandler {

    public abstract handleApplicationEvaluation(payload: IqWebhookPayloadApplicationEvaluation, target: WebhookTarget): void
    
    public abstract handleWaiverRequest(payload: IqWebhookPayloadWaiverRequest, target: WebhookTarget): void
}