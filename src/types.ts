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


interface IqApplication {
    id: string
    publicId: string
    name: string
    organizationId: string
}

interface IqApplicationEvaluation {
    application: IqApplication
    policyEvaluationId: string
    stage: string
    ownerId: string
    evaluationDate: string
    affectedComponentCount: number
    criticalComponentCount: number
    severeComponentCount: number
    moderateComponentCount: number
    outcome: string
    reportId: string
}

export interface IqWebhookPayloadBase {
    timestamp: string
    initiator: string
}

export type IqWebhookPayloadApplicationEvaluation = IqWebhookPayloadBase & {
    id: string
    applicationEvaluation: IqApplicationEvaluation
}
        
export type IqWebhookPayloadWaiverRequest = IqWebhookPayloadBase & {
    comment: string
    policyViolationId: string
    policyViolationLink: string
    addWaiverLink: string
}

export type IqWebhookPayload = IqWebhookPayloadApplicationEvaluation | IqWebhookPayloadWaiverRequest