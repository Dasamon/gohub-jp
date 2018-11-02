window.MyEmbededProgram = {
  helloWorld: function() {
    alert("Hello World!")
  }
};

//window.onpopstate = function (event) {
//  if (event.state) {
//    console.log('aaaaaaaaaaaaaaaaa 500');
//  } else {
//    console.log('aaaaaaaaaaaaaaaaa 501');
//  }
//};




console.log('aaaaaaaaaaaaaa 300.0');
(function() {
    console.log('aaaaaaaaaaaaaa 300');
    var XHR = XMLHttpRequest.prototype;
    // Remember references to original methods
    var open = XHR.open;
    var send = XHR.send;

    // Overwrite native methods
    // Collect data:
    XHR.open = function(method, url) {
        console.log('aaaaaaaaaaaaaaaa 2000', url);
        this._method = method;
        this._url = url;
        watch();
        return open.apply(this, arguments);
    };

    // Implement "ajaxSuccess" functionality
    XHR.send = function(postData) {
        console.log('aaaaaaaaaaaaaaaa 3000', postData);
        this.addEventListener('load', function() {
            /* Method        */ this._method
            /* URL           */ this._url
            /* Response body */ this.responseText
            /* Request body  */ postData
            //console.log('aaaaaaaaaaaaaaaa 3001', this._url, this.responseText);
        });
        return send.apply(this, arguments);
    };

    const watch = () => {
        console.log('aaaaaaaaaaaaaa 4000', document.location);
        console.log('aaaaaaaaaaaaaa 4001', document.querySelectorAll('.pokemon--summary'));
        if (document.location.href === 'https://db.pokemongohub.net/') {
            console.log('aaaaaaaaaaaaa 4001.0');
            const elm = document.querySelectorAll('.card.featured-pokemon')[0];
            if (elm) {
                console.log('aaaaaaaaaaaaa 4001.1');
                const observer = new MutationObserver(records => {
                    console.log('aaaaaaaaaaaa 5000', records);
                    observer.disconnect();
                    for (const record of records) {
                        if (record.addedNodes.length == 0) {
                            continue;
                        }
                        const node = record.addedNodes[0];
                        console.log('aaaaaaaaaaaa 6000', node.innerHTML);
                        //node.innerHTML = 'hell world';
                    }
                });
                observer.observe(elm, {
                    subtree: true,
                    characterData: true,
                    childList: true,
                    //attributes: true,
                });
            }
        }
    }
})();

