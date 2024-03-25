# Figma Event Modeling Plugin

![62862431-71537f00-bd0e-11e9-85db-d97c0fb729a4](https://eventmodeling.org/event-modeling-tutorial.jpg)

This is a Figma plugin that allows you to create event modeling diagrams directly in Figma. 
It is based on the [Event Modeling](https://eventmodeling.org/) methodology.

# What is Event Modeling?
Event Modeling is a method of describing systems using an example of how information has changed within them over time. Specifically this omits transient details and looks at what is durably stored and what the user sees at any particular point in time. These are the events on the timeline that form the description of the system.

# Roadmap
- [x] Create an Event
- [x] Create bulk Events
- [x] Create Commands for all Events which does not have a Command
- [x] Create a View
- [x] Edit all Events with the same name
- [x] Edit all Commands with the same name
- [x] Edit all Views with the same name
- [x] Display connected stickies in the Detail View
- [ ] Verify Event Model

## Contributing

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

#### Folder Structure
To keep the codebase clean, we have the following folder structure:

- To add new handlers for features use [controller.ts](./src/plugin/controller.ts)
- To add new components for features use [components](./src/app/components) folder.
- In [methods](./src/app/methods) you can find some helper methods and default values.
- Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings

This repo is using:

- React + Webpack
- TypeScript
- Prettier precommit hook
