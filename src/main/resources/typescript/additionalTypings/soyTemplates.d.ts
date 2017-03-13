/// <reference path="./userPreferences.d.ts" />

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
                        preferences: ExamplePreferences,
                        errorMessage?: string
                    }) => string,
                }
            }
        }
    }
};

declare interface ExampleConfigValidation {
    nameMaxLength: number,
    nameRequired: boolean
}


