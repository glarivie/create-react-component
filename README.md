# create-react-component

Command line interface to initialize empty ES8 React components


## Installation

```bash
npm install --global create-react-component
```


## Usage information

```bash
  Usage: create-react-component [options]


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
create-react-component --name SearchInput --statefull --scss --redux
```
