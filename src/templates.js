const generateIndex = name => `export { default } from './${name}'`

const generateStylesheet = name => [
  `.${name} {`,
  "",
  "}",
].join('\n')

const generateComponentHead = (name, statefull, redux, styleExt) => {
  const react = statefull ? 'React, { Component }' : 'React'

  const head = redux ? [
    `import ${react} from 'react'`,
    "import PropTypes from 'prop-types'",
    "import { connect } from 'react-redux'",
    "// import { get } from 'lodash'",
    "",
    "// import actions from '../../actions'",
  ] : [
    `import ${react} from 'react'`,
    "import PropTypes from 'prop-types'",
    "",
  ]

  return Boolean(styleExt)
    ? head.join('\n')
    : head.concat(`import './${name}.${styleExt}'`).concat('').join('\n')
}

const generateComponentBody = (name, statefull) => {
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

const generateComponent = (name, statefull, redux, styleExt) => [
  generateComponentHead(name, statefull, redux, styleExt),
  generateComponentBody(name, statefull),
  generateComponentFooter(name, redux),
].join('\n')

module.exports = {
  generateIndex,
  generateStylesheet,
  generateComponent,
}
