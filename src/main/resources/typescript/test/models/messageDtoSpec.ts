/// <reference path="../../../typings/index.d.ts" />

import {MessageDto} from "../../main/models/MessageDto";
/**
 * This is a nonsense test as there's not much actual logic (besides view logic) in this example.
 *
 * You mustn't test any modules which depend on dependencies injected by Jira, e.g. "wrm/contextpath",
 * or anything which depends on them as karma-typescript can't cope with this.
 * To make this possible, it's easiest to put any logic you want to test on models, utilities, or in other well-separated modules.
 * Include these in your karma.conf.js
 */
describe("messageDto", () => {
    it("has a message", () => {
        let messageDto: MessageDto = {
            message: "Hi there"
        };
        expect(messageDto.message).toBe("Hi there");
    })
});