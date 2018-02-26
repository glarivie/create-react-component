const {
  webStylesheet,
  statelessWebRedux,
  statelessWeb,
  statefullWebRedux,
  statefullWeb,
} = require('./web')

const {
  mobileStylesheet,
  statelessMobileRedux,
  statelessMobile,
  statefullMobileRedux,
  statefullMobile,
} = require('./mobile')

const generateIndex = name => `export { default } from './${name}'`

module.exports = {
  webStylesheet,
  statelessWebRedux,
  statelessWeb,
  statefullWebRedux,
  statefullWeb,
  mobileStylesheet,
  statelessMobileRedux,
  statelessMobile,
  statefullMobileRedux,
  statefullMobile,
  generateIndex,
}
