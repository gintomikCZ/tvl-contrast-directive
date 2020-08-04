module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'tvl-contrast-directive',
      description: 'vue custom directive checking the contrast ratio'
    }
  },

  themeConfig: {
    search: false,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        // service worker is configured but will only register in production
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: [
          { text: 'Getting Started', link: '/guide' },
          { text: 'Demo', link: '/components/' },
          // external link to git repo...again
          { text: 'GitHub', link: 'https://github.com/gintomikCZ/tvl-contrast-directive' }
        ]
      }
    }
  }
}