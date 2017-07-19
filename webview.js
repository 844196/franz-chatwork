const path = require('path')

module.exports = (Franz, options) => {
  Franz.injectCSS(path.join(__dirname, 'style.css'))

  const polling = () => {
    let target = {
      unread: {
        count: 0,
        element: document.getElementById('_chatUnreadStatus'),
      },
      reply: {
        count: 0,
        element: document.getElementById('_chatToUnreadStatus'),
      },
    };

    Object.keys(target).forEach((type) => {
      if (target[type].element.style.display != 'none') {
        target[type].count = parseInt(target[type].element.innerText);
      }
    });

    Franz.setBadge(target.reply.count, target.unread.count);
  };

  Franz.loop(polling);
}
