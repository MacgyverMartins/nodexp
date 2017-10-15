# Nodexp

A simple command-line tool for Node.js APIs boilerplate, inspirade on Ruby on Rails and [Express generator](https://github.com/expressjs/generator)

[![NPM](https://nodei.co/npm/nodexp.png?compact=true)](https://npmjs.org/package/nodexp)

> :warning::warning: This module is on development mode and it is not ready to be used in real web applications yet :warning::warning:

## Index

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

## Dependencies

- [Node.js v6+](https://nodejs.org)
- [NPM v3+](https://www.npmjs.com)
- [MongoDB 3.4](https://docs.mongodb.com/manual/installation)

## Installation

Download from NPM:

```sh
npm install -g nodexp
```

## Usage
`nodexp <command>`

## Quick Start

Create a new project:
```sh
nodexp new awesome-api
```

Install the dependencies:
```sh
cd awesome-api
npm install
```

Run your app:
```sh
npm start
```

Visit `localhost:3000`

## Commands

### new

Creates a new project 

```sh
nodexp new <project-name>
```
e.g

```sh
nodexp new awesome-api
  ```

### generate

Generate some boilerplate.

**usage:**
```sh
nodexp generate <boilerplate>
```
*alias: `nodexp g <boilerplate>`*

See the [boilerplate section](#boilerplates) below to get a list of available generators

## Boilerplates

All those boilerplates can be generated through `nodexp generate` command.

### model
*`nodexp generate model <model-name>`*

Creates a new model inside the `/model` directory
```sh
nodexp generate model User
```
You also can pass some initial properties and their respective types
```sh
nodexp g model User name:string age:number
```

## Support

Please [open an issue](https://github.com/MacgyverMartins/nodexp/issues/new) for support.
