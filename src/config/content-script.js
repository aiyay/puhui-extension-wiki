console.log('content-script')
const documentHtmlInit = function(request) {
  const bodyDom = document.getElementsByTagName('body')[0]
  if(!document.getElementById('ph-wiki-document_container')){
    var mainNode = document.createElement('div')
    mainNode.id = 'ph-wiki-document_container'
    bodyDom.appendChild(mainNode)
    var modalNode = document.createElement('div')
    modalNode.style.width = '100vw'
    modalNode.style.height = '100vh'
    modalNode.style.position = 'fixed'
    modalNode.style.zIndex = '999998'
    modalNode.style.top = '0'
    modalNode.style.left = '0'
    modalNode.style.backgroundColor = 'rgba(0,0,0,0.2)'
    const phDom = document.getElementById('ph-wiki-document_container')
    phDom.appendChild(modalNode)
    var iframeNode = document.createElement('iframe')
    iframeNode.src = request.host + '#/' + request.tag
    iframeNode.name = 'iframe_ph-wiki'
    iframeNode.style.width = '40vw'
    iframeNode.style.height = '100vh'
    iframeNode.style.position = 'fixed'
    iframeNode.style.zIndex = '999999'
    iframeNode.style.top = '0'
    iframeNode.style.right = '0'
    phDom.appendChild(iframeNode)
  }
}
const removeHtml = function (request) {
  const phDom = document.getElementById('ph-wiki-document_container')
  if (phDom) {
    phDom.remove()
  }
}

// eslint-disable-next-line no-undef
chrome.extension.onRequest.addListener( //监听扩展程序进程或内容脚本发送的请求
  function(request, sender, sendResponse) {
    console.log('popup12312', request, sender, sendResponse)
    // sendResponse({ kw: document.forms[0].wd.value });
    if (request.action ==  "aboutAction" || request.action ==  "noteAction") {
      console.log('popup',request.action)
      removeHtml(request)
      documentHtmlInit(request)
    }
    if (request.action ==  "closeAction") {
      removeHtml(request)
    }
  }
);