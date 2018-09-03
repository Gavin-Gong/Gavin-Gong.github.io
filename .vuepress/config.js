module.exports = {
  title: 'Whisper of Zen',
  description: '  ',
  ga: 'UA-125056169-1',
  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: '我的 blog',
      description: 'Whisper of Zen'
    }
  },
  themeConfig: {
    sidebar: {
      "/Zen/": [
        {
          title: '2018-09',
          children: [
            '/Zen/2018/09/start'
          ]
        }
      ],
      "/": [{
          title: '2018-08',
          children: [
            '/2018/08/translate-js-side-effect',
            '/2018/08/scheduler-and-eventloop'
          ]
        },
        {
          title: '2018-07',
          children: [
            '/2018/07/async-computed',
            '/2018/07/ts-util-generic',
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
    },
    nav: [{
        text: '起源の地',
        link: '/'
      },
      {
        text: '尘尽光生',
        link: '/Zen/'
      },
      {
        text: '瓶中の我',
        link: '/me'
      },
      {
        text: 'Github',
        link: 'https://github.com/Gavin-Gong'
      }
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
