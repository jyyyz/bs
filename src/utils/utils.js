if(loader == 'less'){
  loaders.push({
   loader: 'style-resources-loader',
   options: {
    patterns: path.resolve(__dirname, '../assets/less/index.less')
   }
  })
}