const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeResolvers } = require('@graphql-tools/merge')

const resolversArray = loadFilesSync(__dirname, {
  extensions: ['js'],
  extractExports: (fileExport) => {
    if (typeof fileExport === 'function') {
      return fileExport('query_root')
    }
    return fileExport
  }
})

module.exports = mergeResolvers(resolversArray)
