# Example JIRA dashboard item

Working with JIRA server can be a challenging process, especially for developers encountering the stack
for the first time. As you'd expect from a feature-heavy application that's been around for many years,
there are a lot of conventions and effectively languages to learn - in particular the XML used to 
declare plugins and dashboard items ("widgets"), and the Velocity templating language.

Luckily, specifically if you're writing a dashboard item, help is available. JIRA's own new 
dashboard items are written in a friendly, well-known tech stack, using JavaScript AMD modules. 
The only downside is that it looks like they're still writing the documentation for JIRA server,
perhaps since most of their development effort is now focused on JIRA Cloud.

To make my own, and now hopefully your life a bit easier, I've written an example/skeleton JIRA dashboard item
which demonstrates how to put together all these shiny bits and pieces. I've also used TypeScript
for extra help in the front-end.

Please feel free to comment, fork this repository, submit pull requests, and generally use this to make all the dashboard items
you ever wanted!

## Zero to Hero

To get this example plugin up and running, you'll need to:

1. Clone this repository using 
```git
git clone git@github.com:hayleyross/jira-example-dashboard-item.git
```

2. Install [Node](https://nodejs.org/en/download/).
3. Open `src/main/resources` and run
```
npm install -g typings
npm install
typings install
```
Sometimes `typings` refuses to install on your path, if so, try:
```
./node_modules/.bin/typings install
```
4. Install the [Atlassian SDK](https://developer.atlassian.com/docs/getting-started/set-up-the-atlassian-plugin-sdk-and-build-a-project/install-the-atlassian-sdk-on-a-windows-system).
5. From within the project directory, run `atlas-mvn package`
This will build and package the plugin using a modified version of Maven. 
(Making sure all your build steps are defined in your `pom` makes this possible.)

6. Run `atlas-run` from your project directory
to spin up a local version of JIRA with your plugin pre-installed. This will take a while. 
Ignore all the exceptions it throws, this won't stop it from running.  
Having said that if it does fail to start the best you can probably do is try starting it again.
7. When you see something like `jira started successfully in 415s at http://TAWNYOWL:2990/jira`, visit <http://localhost:2990/jira>
and login with username 'admin' and password 'admin'.
8. Create a new dashboard and use 'Add Gadget' to add a copy of the example dashboard item to the dashboard.
9. From now on, if you make changes, you just need to run `atlas-mvn package` in a separate console window
rather than restarting JIRA with `atlas-run`. 
[QuickReload](https://developer.atlassian.com/docs/getting-started/set-up-the-atlassian-plugin-sdk-and-build-a-project/modify-the-plugin-using-quickreload) 
should be triggered in the main console and it will swap in your plugin with the changes.
10. You can see the add-on and its companion test add-on which is created by visiting <http://localhost:2990/jira/plugins/servlet/upm>.

## Technologies and setup

I've tried hard to use all the new shiny technologies in this and to abstract it away from the
steep learning curve of JIRA as much as possible. 

We have primarily
* Java
* [TypeScript](https://www.typescriptlang.org/)
* [Soy](https://developer.atlassian.com/confdev/tutorials/writing-soy-templates-in-your-plugin) - 
Atlassian's take on Google's [Closure templates](https://developers.google.com/closure/templates/)
* [LESS](http://lesscss.org)

### Plugin declaration

All the components of the plugin are declared in `src/main/resources/atlassian-plugin.xml`. 
This is a list of every single thing your plugin contains and depends on. 

It's all focused around the dashboard item which is declared as follows:
```xml
<dashboard-item key="example-dashboard-item" configurable="true">
    <definition>
        <title key="dashboarditem.example.title"/>
        <categories>
            <category>JIRA</category>
        </categories>
        <author>
            <name>Softwire</name>
        </author>
        <!-- 122px x 62px -->
        <thumbnail
                location="/download/resources/com.softwire.jira.example-dashboard-item:jira-example-resources/images/thumbnail.png"/>
    </definition>
    <description key="dashboarditem.example.description"/>
    <amd-module>ExampleDashboardItem</amd-module>
</dashboard-item>
```

Read on for what all the entries actually mean.

### i8n

The keys `dashboarditem.example.title` and `dashboarditem.example.description` are defined in `src/main/resources/example-dashboard-item.properties` 
and declared in the plugin XML with
```xml
<resource type="i18n" name="i18n" location="example-dashboard-item"/>
```

Even if you're not planning on ever writing your plugin in anything other than English you need these strings for your plugin to display nicely
in JIRA's "Add a new gadget" dialog and other similar places. You can also use this for any other messages and strings.

### Typescript

The intention of this setup is that you can write a lot of your code in the frontend to avoid dealing with Java and JIRA.
Notice the `<amd-module>` section in the dashboard item declaration? 

```xml
<amd-module>ExampleDashboardItem</amd-module>
```

This allows us to declare an AMD module using Javascript on the page
and have JIRA call this module with an API for us to use and the user's saved preferences. 
It's done entirely by name of the module (not the file) so make sure this matches exactly.

TypeScript is set up using a special `tsconfig` which compiles it down to a single file of AMD modules. 
This file is included in a script tag on all dashboards with the following:

```xml
<web-resource key="jira-example-resources" name="jira-example Web Resources">
    ...
    <resource type="download" name="exampleDashboardItem.js" location="/js/exampleDashboardItem.js"/>
    <context>atl.dashboard</context>
</web-resource>
```

When JIRA calls your AMD module, it expects three methods, which it will call with the following parameters:
```typescript
class ExampleDashboardItem {
    constructor(private API: DashboardItemAPI, private options: any = {}) {
    }
    
    public render($element: JQuery, preferences: ExamplePreferences): void {
    }
    
    public renderEdit($element: JQuery, preferences: ExamplePreferences): void {
    }
}
```

I've documented the API as best as I can in `typescript/additionalTypings/jiraApi.d.ts` - the only reference I could find 
is [here](https://developer.atlassian.com/jiradev/jira-platform/guides/dashboards/guide-building-a-dashboard-item-for-a-jira-p2-add-on) 
(click "Show me..." at the bottom of the page).

I'm not sure what the `options` are. The `$element` is the `<div>` that the dashboard item should get rendered into, and the preferences
are whatever object you last passed to `API.savePreferences()` from the edit screen - they'll start out empty.

`ExamplePreferences` is defined in `typescript/additionalTypings/userPreferences.d.ts`.

If you change the preferences, you may need to re-run

```
typings install --global --save file:./typescript/additionalTypings/userPreferences.d.ts
```

or, if `typings` is not on your path:

```
./node_modules/.bin/typings install --global --save file:./typescript/additionalTypings/userPreferences.d.ts
```

### TypeScript tests

[Karma](https://karma-runner.github.io/) runs Typescript tests in a headless browser ([PhantomJS](https://github.com/karma-runner/karma-phantomjs-launcher)) as part of `atlas-mvn package`. 
It compiles the Typescript itself, using a different configuration to the `tsconfig` as this compiles everything in `typescript/main` into a single file and doesn't include the tests.

There is a caveat:  You mustn't test any modules which depend on dependencies injected by Jira, e.g. `wrm/contextpath`,
or anything which depends on them as `karma-typescript` can't cope with this. 
It tries to resolve the dependencies but obviously these AMD modules are only injected at runtime.

To make this possible, it's easiest to put any logic you want to test on models, utilities, or in other well-separated modules.
Include these in your `karma.conf.js` - currently it only searches for files in `main/models`. 
If you need to pass directories to `karma-typescript` containing files which depend on rogue AMD modules, make sure to exclude those files.

### HTML templating with Soy

Rather than using Java-inspired [Velocity](https://developer.atlassian.com/confdev/development-resources/confluence-architecture/confluence-internals/velocity-template-overview) templates
we can use [Soy templates](https://developer.atlassian.com/confdev/tutorials/writing-soy-templates-in-your-plugin) - 
Atlassian's take on Google's [Closure templates](https://developers.google.com/closure/templates/).
The reason for using these rather than just plain HTML is that you can take advantage of Atlassian's UI components for a consistent UI 
with the rest of JIRA. 

For example you can use the inbuilt form fields to make the configuration view look like every other JIRA plugin, with inbuilt validation:

```soy
{call aui.form.label}
    {param forField: 'name' /}
    {param isRequired : $validation.nameRequired /}
    {param content: getText('dashboarditem.example.config.name.label') /}
{/call}
{call aui.form.input}
    {param id: 'name' /}
    {param name: 'name' /}
    {param type: 'text' /}
    {param value: $preferences.name /}
    {param maxLength: $validation.nameMaxLength /}
{/call}
```

I haven't been able to find any documentation for this, but you can find examples of this by searching the [source code](https://confluence.atlassian.com/jirakb/download-jira-source-code-800307235.html) of the in-built JIRA plugins.
(Access to the source code is given by your JIRA license). 

A good example of the new shiny gadget/dashboard item stack, including Soy, is the Bubble Chart gadget.

The Soy templates are included in the plugin XML with

```xml
<web-resource key="jira-example-resources" name="jira-example Web Resources">
    <dependency>com.atlassian.auiplugin:ajs</dependency>
    <transformation extension="soy">
        <transformer key="soyTransformer"/>
    </transformation>
    ...
    <resource type="download" name="example-template-soy.js" location="/soy/example-template.soy"/>
    <resource type="download" name="exampleDashboardItem.js" location="/js/exampleDashboardItem.js"/>
    <context>atl.dashboard</context>
</web-resource>
```

Note that JIRA compiles/"transforms" them automatically into JavaScript as part of `atlas-mvn package` thanks to the `transformation` tag.

Finally, you include these into your dashboard item by JavaScript (see `ExampleDashboardItemView.ts`):

```typescript
$element.html(Com.Softwire.Jira.Example.Templates.Main({
    message: this.message,
    name: preferences.name
}));
```

where `Com.Softwire.Jira.Example.Templates.Main` is the name(space) of your Soy Template.

You'll need to add `.d.ts` files for Typescript to understand - see `typescript/additionalTypings/soyTemplates.d.ts`. 
If you change these files, you may need to re-run

```
typings install --global --save file:./typescript/additionalTypings/soyTemplates.d.ts
```

or, if `typings` is not on your path:

```
./node_modules/.bin/typings install --global --save file:./typescript/additionalTypings/soyTemplates.d.ts
```

### LESS 

JIRA will automatically compile your [LESS](http://lesscss.org) for you, so all you need in the plugin XML is

```xml
<web-resource key="jira-example-resources" name="jira-example Web Resources">
    <transformation extension="less">
        <transformer key="lessTransformer"/>
    </transformation>
    <resource type="download" name="exampleDashboardItem.css" location="/less/exampleDashboardItem.less"/>
    <context>atl.dashboard</context>
</web-resource>
```

### Images and other resources

You'll want to include at least an icon for your plugin, and probably other images and files. 
Include images or files as follows in your plugin XML:

```xml
<web-resource key="jira-example-resources" name="jira-example Web Resources">
    <resource type="download" name="images/" location="/images"/>
    <context>atl.dashboard</context>
</web-resource>
```

The URLs to access these images will look like 
```
/download/resources/com.softwire.jira.example-dashboard-item:jira-example-resources/images/thumbnail.png
```

### Backend

The backend consists of a `RestResource` where all the fun of querying JIRA will be. 
(You don't want to do this in the frontend as then you have to deal with authentication.)

This is declared in the plugin XML with 

```xml
<rest name="Example Rest Resource" key="example-rest-resource" path="/example-api" version="1.0">
    <description>Example Rest Resource Plugin</description>
</rest>
```

You can use constructor dependency injection to pull in any components of JIRA you need and use the methods on those.
There's a rough example [here](https://developer.atlassian.com/jiradev/jira-platform/guides/dashboards/tutorial-writing-a-plugin-gadget-that-shows-days-left-in-a-version#Tutorial-Writingaplugingadgetthatshowsdaysleftinaversion-Step5.MakeResourcesAvailabletoyourGadget) - 
ignore all the references to Velocity templates as we're using a newer, shinier templating language.
I'd also recommend giving some thought to separation of concerns, rather than
following Atlassian's instructive but rather concise example. 

There are unit and integration tests set up - use them! They get run automatically with `atlas-mvn package`.

## Adapt this to create your own dashboard item

### Renaming

You're going to need to change the word "example" in a lot of places.

I'll update this in more detail once I've done this myself, but here's a hopefully complete list:

* Name of the folder
* Name of the module in IntelliJ (should match the folder, but won't update when you rename the folder)
* Name of the package (`com.softwire.jira.example`), referenced in `atlassian-plugin.xml` and in `pom.xml` (this one should get refactored automatically). 
You'll also need to update the matching test packages.
* Name of the plugin in `pom.xml`
* `exampleDashboardItem.js` - generated by `tsconfig.json`, referenced in `atlassian-plugin.xml`
* `exampleDashboardItem.less`, also referenced in `atlassian-plugin.xml`
* `example-template.soy` and the namespace(s) in it, also referenced in `atlassian-plugin.xml` and `typescript/additionalTypings/soyTemplates.d.ts`
* Typescript renames: `ExampleRepository.ts`, `Example...View.ts`, `ExamplePreferences` in `userPreferences.d.ts` (see above for running `typings install`)
* `ExampleDashboardItem.ts`, this is the AMD module referenced in `atlassian-plugin.xml`
* `example-dashboard-item.properties`, referenced in `atlassian-plugin.xml`, and its contents
* `ExampleRestResource.java`
* API path in `atlassian-plugin.xml`, referenced in `typescript/main/repository/Urls.ts`
* Change the thumbnail image

Please feel free to expand on this section as you learn / hit difficulties / discover new things.

## Improvements

I'd love to add [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) to this instead of using JQuery's not-so-nice 
[Deferred](https://api.jquery.com/category/deferred-object/) objects. 
If you fancy doing this before I get round to it, please feel free to submit a pull request.
