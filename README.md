# Nodexp

A simple command-line tool for Node.js APIs boilerplate, inspirade on Ruby on Rails and [Express generator](https://github.com/expressjs/generator)

[![NPM](https://nodei.co/npm/nodexp.png?compact=true)](https://npmjs.org/package/nodexp)

## Index

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

## Dependencies

- [Node.js v6+](https://nodejs.org)
- [NPM v3+](https://www.npmjs.com)

## Installation

Download from NPM:

```sh
npm i nodexp@0.0.3-0 -g
```

## Usage
`nodexp <command>`

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

Generate a new model at `/model` directory

```sh
nodexp generate model <model-name>
```
e.g
```sh
nodexp generate model User
```
You can pass some initial properties and its respective type

e.g
```sh
nodexp g model User name:string age:number
```

## Support

Please [open an issue](https://github.com/MacgyverMartins/nodexp/issues/new) for support.
