import {ExamplePreferences} from "../../typescript/models/ExamplePreferences";
/**
 * Soy template namespace/syntax - see example-template.soy
 */
declare const Com: {
    Softwire: {
        Jira: {
            Example: {
                Templates: {
                    Main: (params: {
                        name: string,
                        message: string
                    }) => string,
                    Error: (params: {
                        title: string,
                        content: string
                    }) => string,
                    Configuration: (params: {
                        prefix: string,
                        validation: ExampleConfigValidation,
                        preferences: ExamplePreferences
                    }) => string,
                }
            }
        }
    }
};

declare interface ExampleConfigValidation {
    maxNameLength: number
}