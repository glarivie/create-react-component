const generateIndex = name => `export { default } from './${name}'`

const generateStylesheet = name => [
  `.${name} {`,
  "",
  "}",
].join('\n')

const generateComponentHead = (name, statefull, redux) => {
  const react = statefull ? 'React, { Component }' : 'React'

  if (redux) {
    return [
      `import ${react} from 'react'`,
      "import PropTypes from 'prop-types'",
      "import { connect } from 'react-redux'",
      "// import { get } from 'lodash'",
      "",
      "// import actions from '../../actions'",
      `import './${name}.css'`,
      "",
    ].join('\n')
  }

  return [
    `import ${react} from 'react'`,
    "import PropTypes from 'prop-types'",
    "",
    `import './${name}.css'`,
    "",
  ].join('\n')
}

const generateComponentBody = (name, statefull) => {
  console.log('generateComponentBody', { name, statefull })
  if (statefull) {
    return [
      `class ${name} extends Component {`,
      "  static propTypes = {}",
      "",
      "  render = () => {",
      "    return (",
      `      <div className="${name}">`,
      `        <span>${name} statefull component</span>`,
      "      </div>",
      "    )",
      "  }",
      "}",
      "",
    ].join('\n')
  }

  return [
    `const ${name} = () => (`,
    `  <div className="${name}">`,
    `    <span>${name} stateless component</span>`,
    "  </div>",
    ")",
    "",
    `${name}.propTypes = {}`,
    "",
  ].join('\n')
}

const generateComponentFooter = (name, redux) => {
  if (redux) {
    return [
      "const mapStateToProps = () => ({})",
      "",
      "const mapDispatchToProps = dispatch => ({})",
      "",
      `export default connect(mapStateToProps, mapDispatchToProps)(${name})`,
      "",
    ].join('\n')
  }

  return `export default ${name}`
}

const generateComponent = (name, statefull, redux) => [
  generateComponentHead(name, statefull, redux),
  generateComponentBody(name, statefull),
  generateComponentFooter(name, redux),
].join('\n')

module.exports = {
  generateIndex,
  generateStylesheet,
  generateComponent,
}
