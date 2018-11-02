const injectScript = function(file, node) {
    var s, th;
    th = document.getElementsByTagName(node)[0];
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    //console.log('aaaaaaaaaa 500');
    return th.appendChild(s);
};
injectScript(chrome.extension.getURL('/embeded-script.js'), 'html');


console.log('hello world');


//document.addEventListener('DOMSubtreeModified', function (e) {
//    //console.log('DOM Changed at ' + new Date());
//    console.log(e.path);
//    console.log('aaaaaaaaaaaaaa 300', e);
//}, false);

//console.log('aaaaaaaaaa 100', window);
////window.alert('hoge');
//window.addEventListener("hashchange", function(e) {
//    console.log('aaaaaaaaaaaaaa 700');
//}, false);
//
//
//window.onpopstate = function (event) {
//  if (event.state) {
//    console.log('aaaaaaaaaaaaaaaaa 600');
//  } else {
//    console.log('aaaaaaaaaaaaaaaaa 601');
//  }
//};

