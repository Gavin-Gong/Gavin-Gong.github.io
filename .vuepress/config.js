module.exports = {
  title: 'Whisper of Zen',
  description: '  ',
  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: '我的 blog',
      description: 'Whisper of Zen'
    }
  },
  themeConfig: {
    sidebar: [
      {
        title: '2018-07',
        children: [
          '/2018/07/defining-component-apis-in-react',
          '/2018/07/react-rxjs-auto-unsubscribe-decorator',
          '/2018/07/rxjs-state-manegment',
          '/2018/07/decorator',
          '/2018/07/nginx-note',
          '/2018/07/gin-note',
        ]
      },
      {
        title: '2018-06',
        children: [
          '/2018/06/js-fp-note',
          '/2018/06/rxjs-operator-note',
          '/2018/06/rxjs-subject-note',
        ]
      },
    ],
    nav: [{
        text: '起源之地',
        link: '/'
      },
      {
        text: 'Github',
        link: 'https://github.com/Gavin-Gong'
      },
    ],
    lastUpdated: '最后更新于 ',
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '/img'
      }
    }
  }
}
