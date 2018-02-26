# create-react-component

Command line interface to initialize empty ES8 React and React Native components


## Installation

```bash
npm install --global @hqro/create-react-component
```


## Usage information

```bash
  Usage: crc [options]


  Options:

    -V, --version       Output the version number
    -n, --name <name>   Component name (default: Test)
    -d, --dest <path>   Component destination (default: current path)
    -F, --statefull     Overide default stateless component template
    -X, --redux         Connect your component with Redux
    -C, --css           Create CSS stylesheet
    -S, --scss          Create SCSS stylesheet
    -h, --help          Output usage information
```


## Example

Generate a statefull component connected to the Redux store and using SCSS stylesheet:

```bash
cd src/components
crc -n MyComponent -CSFX
```

Output:

```bash
  Test
  ├── Test.js
  ├── Test.css
  ├── Test.scss
  └── index.js
```
