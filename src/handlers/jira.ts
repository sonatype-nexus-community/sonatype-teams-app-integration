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

import { JiraWebhookTarget, WebhookTarget } from "../WebHookTarget"
import { HandlerNotImplementedError } from "../error"
import { getIqUrlForApplicationEvaluation } from "../helpers/iq";
import { IqWebhookPayloadApplicationEvaluation, IqWebhookPayloadWaiverRequest } from "../types"
import { BaseHandler } from "./base"


export class JiraHandler extends BaseHandler {

    public handleWaiverRequest(payload: IqWebhookPayloadWaiverRequest, target: JiraWebhookTarget): void {
        console.log(`Handling Waiver Request to JIRA with PK=${target.projectKey} and IT=${target.issueType}`)
        //Create Issue with API Docs: https://blog.developer.atlassian.com/creating-a-jira-cloud-issue-in-a-single-rest-call/
        //Jira Markdown Docs: https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/blockquote/
        const message = {
            "fields": {
                "summary": "New Sonatype Platform Policy Waiver Request",
                "issuetype": {
                    "name": target.issueType
                },
                "project": {
                    "key": target.projectKey
                },
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": payload.initiator,
                                    "marks": [
                                        {
                                            "type": "strong"
                                        }
                                    ]
                                },
                                {
                                    "type": "text",
                                    "text": " has requested a policy violation waiver in your Sonatype Platform.\nRead more about this issue here: "
                                },
                                {
                                    "type": "text",
                                    "text": "Violation Details",
                                    "marks": [
                                        {
                                            "type": "link",
                                            "attrs": {
                                                "href": payload.policyViolationLink,
                                                "title": payload.policyViolationLink
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "text",
                                    "text": "\nRequest note:\n\t"
                                },
                                {
                                    "type": "text",
                                    "text": "\"" + payload.comment + "\"",
                                    "marks": [
                                        {
                                            "type": "em"
                                        }
                                    ]
                                },
                                {
                                    "type": "text",
                                    "text": "\n\n Go here to approve and create the waiver: "
                                },
                                {
                                    "type": "text",
                                    "text": "Add Waiver",
                                    "marks": [
                                        {
                                            "type": "link",
                                            "attrs": {
                                                "href": payload.addWaiverLink,
                                                "title": payload.addWaiverLink
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }

        target.sendMessage(message).catch((err) => {
            console.error(`JIRA Error ${err.response.status}: ${JSON.stringify(err.response.data)}`)
            console.error(err.message)
        })
    }


    public handleApplicationEvaluation(payload: IqWebhookPayloadApplicationEvaluation, target: JiraWebhookTarget): void {
        console.log(`Handling Waiver Request to JIRA with PK=${target.projectKey} and IT=${target.issueType}`)

        const message = {
            "fields": {
                "summary": "Sonatype IQ Evaluation Results",
                "issuetype": {
                    "name": target.issueType
                },
                "project": {
                    "key": target.projectKey
                },
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Sonatype Scan Result for "
                                },
                                {
                                    "type": "text",
                                    "text": payload.applicationEvaluation.application.name,
                                    "marks": [
                                        {
                                            "type": "strong"
                                        },
                                        {
                                            "type": "em"
                                        }
                                    ]
                                },
                                {
                                    "type": "text",
                                    "text": `\n Application Evaluation Report:`,
                                    "marks": [
                                        {
                                            "type": "strong"
                                        }
                                    ]
                                },
                                {
                                    "type": "text",
                                    "text": `\n\t- Affected Components:\t ${payload.applicationEvaluation.affectedComponentCount} \n\t- Critical Issues:\t ${payload.applicationEvaluation.criticalComponentCount} \n\t- Severe Issues:\t ${payload.applicationEvaluation.severeComponentCount} \n\t- Moderate Issues:\t ${payload.applicationEvaluation.moderateComponentCount} \n Evaluation Date: ${payload.applicationEvaluation.evaluationDate} \nStage: ${payload.applicationEvaluation.stage} \nOutcome: ${payload.applicationEvaluation.outcome}`,
                                },
                                {
                                    "type": "text",
                                    "text": "\nView Evaluation in Sonatype IQ",
                                    "marks": [
                                        {
                                            "type": "link",
                                            "attrs": {
                                                "href": getIqUrlForApplicationEvaluation(payload),
                                                "title": "IQ URL"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }

        target.sendMessage(message).catch((err) => {
            console.error(`JIRA Error ${err.response.status}: ${JSON.stringify(err.response.data)}`)
            console.error(err.message)
        })
    }
}



