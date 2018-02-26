exports.mobileStylesheet = name => [
  "import { StyleSheet } from 'react-native'",
  "",
  "const styles = StyleSheet.create({",
  `  ${name}: {`,
  "    flex: 1,",
  "    backgroundColor: 'white',",
  "  },",
  "})",
  "",
  "export default styles",
].join('\n')
