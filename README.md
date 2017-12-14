# pop-react-component

Command line interface to initialize empty ES8 React components


## Installation

```bash
npm install --global pop-react-component
```


## Usage information

```bash
  Usage: pop [options]


  Options:

    -V, --version   Output the version number
    --name <name>   Component name (default: Test)
    --dest <path>   Component destination (default: current path)
    --statefull     Overide default stateless component template
    --redux         Connect your component with Redux
    --scss          Create SCSS stylesheet
    -h, --help      Output usage information
```


## Example

```bash
cd src/components
pop --name SearchInput --statefull --scss --redux
```

Output:

```bash
  Test
  ├── Test.js
  ├── Test.css
  ├── Test.scss
  └── index.js
```
