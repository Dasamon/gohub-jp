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


const observers = {};

const translateType = (src) => {
    const typeMap = {
        'Bug': 'むし',
        'Dark': 'あく',
        'Dragon': 'ドラゴン',
        'Electric': 'でんき',
        'Fairy': 'フェアリー',
        'Fighting': 'かくとう',
        'Fire': 'ほのお',
        'Flying': 'ひこう',
        'Ghost': 'ゴースト',
        'Grass': 'くさ',
        'Ground': 'じめん',
        'Ice': 'こおり',
        'Normal': 'ノーマル',
        'Poison': 'どく',
        'Psychic': 'エスパー',
        'Rock': 'いわ',
        'Steel': 'はがね',
        'Water': 'みず',
    };
    const ret = typeMap[src];
    console.log('aaaaaaaaaaaaa 500', src, ret);
    if (ret) {
        return ret;
    }
    return src;
};



const translateTopPage = (node) => {
    if (node instanceof Element) {
        const n1 = node.querySelector('.pokemon--summary');
        if (n1) {
            translateTopPageSummary(n1);
        }
    }
};

const translateTopPageSummary = (node) => {
    //console.log('aaaaaaaaaaaa 6000', node.innerHTML);
    //node.innerHTML = 'hell world';
    //console.log('aaaaaaaaaaaa 6000', node.innerHTML);
    node.querySelectorAll('span.type span').forEach((s) => {
        console.log('aaaaaaaaaa 6001', s.innerHTML);
        s.innerHTML = translateType(s.innerHTML);
    });
    let text = node.innerHTML;
    console.log('aaaaaaaaa 770', text);
    text = text.replace(
        /Pokemon GO <strong> (\S+)<\/strong> is a\s+(\S+)/,
        (match, name, type) => {
            console.log('aaaaaaaaa 777', name, type);
            let r = `<strong>${name}</strong> は`;
            if (type === 'mythical') {
                r += '幻のポケモンで';
            } else if (type === 'legendary') {
                r += '伝説のポケモンで';
            }
            return r;
        }
    );
    node.innerHTML = text;
};




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
            watch();
        });
        return send.apply(this, arguments);
    };

    const watch = () => {
        const path = document.location.pathname;
        if (observers[path])
            return;
        //console.log('aaaaaaaaaaaa 3900', path);
        if (path ===  '/') {
            const elm = document.querySelectorAll('.card.featured-pokemon')[0];
            if (elm) {
                const observer = new MutationObserver(records => {
                    console.log('aaaaaaaaaaaa 5000', records);
                    //observer.disconnect();
                    records.forEach((r) => {
                        if (r.addedNodes.length == 0) {
                            return;
                        }
                        const node = r.addedNodes[0];
                        translateTopPage(node);
                    });
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
