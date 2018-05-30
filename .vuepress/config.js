module.exports = {
  title: 'Gavin Gong',
  description: 'Code & Life',
  // base: '/note/',
  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: '我的 blog',
      description: '随便写写'
    }
  },
  themeConfig: {
    nav: [{
        text: '主页',
        link: '/'
      },
      {
        text: 'Go',
        link: '/Go/'
      },
      {
        text: 'Github',
        link: 'https://github.com/Gavin-Gong'
      },
    ],
    lastUpdated: 'Last Updated',
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '/img'
      }
    }
  }
}
