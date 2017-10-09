var config = {
  history: true,
  // fragments: false,

  dependencies: [
    {src: 'plugin/notes/notes.js', async: true},
    {src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); }},
  ],
};

var following = window.location.search.includes('follow');
var master = window.location.href.includes('localhost:') && ! following;
if (master || following) {
  config.multiplex = {
    secret: following ? null : '15075670032199992251',
    id: 'f70a7bf070cc4b4e',
    url: 'https://reveal-js-multiplex-yaueirvoul.now.sh',
  };

  config.dependencies = [
    {src: '//cdn.socket.io/socket.io-1.3.5.js', async: true},
    {src: 'plugin/multiplex/' + (following ? 'client.js' : 'master.js'), async: true},
  ].concat(config.dependencies);
}

Reveal.initialize(config);
