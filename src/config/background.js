console.log('background')


var infoData = null

const genericOnClick = (info, tab) => {
  console.log(info, tab,  window.location.origin + window.location.pathname)
  //向tab发送请求
  infoData =  {
    action: 'add',
    title: tab.title,
    url: tab.url,
    selectionText: info.selectionText
  }
  chrome.tabs.sendRequest(tab.id, { action: `noteAction`, tag:'note', host: window.location.origin + '/static/index.html'},  function  (response) {
    console.log('response', response);
  });
}

var getDataInfo = () => {
  return infoData
}

var clearDataInfo = () => {
  infoData = null
}

chrome.contextMenus.create({
  type: 'normal',
  title: '烂笔头',
  id: 'ph_menu_note',
  contexts: ['all'],
  onclick: genericOnClick
}, function () {
  console.log('contextMenus are create.');
});
