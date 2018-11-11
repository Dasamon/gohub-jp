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

const translatePokemonName = (src) => {
    const nameMap = {
        'Regirock': 'レジロック',
        'Ho-Oh': 'ホウオウ',
        'Celebi': 'セレビィ',
    };
    const ret = nameMap[src];
    if (ret) {
        return ret;
    }
    return src;
};

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
    if (ret) {
        return ret;
    }
    return src;
};

const translateMove = (src) => {
    const moveMap = {
        'Rock Throw': 'いわおとし',
        'Stone Edge': 'ストーンエッジ',
        'Extrasensory': 'じんつうりき',
        'Fire Blast': 'だいもんじ',
        'Confusion': 'ねんりき',
        'Psychic': 'サイコキネシス',
    };
    const ret = moveMap[src];
    if (ret) {
        return ret;
    }
    return src;
};

const translateRegion = (src) => {
    const regionMap =  {
        'Kanto': 'カントー',
		'Johto': 'ジョウト',
		'Hoenn': 'ホウエン',
		'Sinnoh': 'シンオウ',
		'Unova': 'イッシュ',
		'Kalos': 'カロス',
		'Alola': 'アローラ',
    };
    const ret = regionMap[src];
    if (ret) {
        return ret;
    }
    return src;
};

const translateToKanjiNum = (src) => {
    const kanjiNum = '一二三四五六七八九';
    const n = parseInt(src);
    if (1 <= n && n <= 9) {
        return kanjiNum[n];
    }
    return  src;
};

const translateWeather = (src) => {
    const weatherMap =  {
        'Windy': '強風',
        'Sunny': '晴れ',
        'Cloudy': '曇り',
        'PartlyCloudy': '時々曇り',
        'Snow': '雪',
        'Rain': '雨',
        'Fog': '霧',
    };
    const ret = weatherMap[src];
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
        } else if (node.innerHTML.search(/best moveset is/) != -1) {
            translateTopPageMoveset(node);
        }
    }
    else if (node instanceof Text) {
    }
};

const translateTopPageSummary = (node) => {
    node.querySelectorAll('span.type span').forEach((s) => {
        s.innerHTML = translateType(s.innerHTML);
    });
    let text = node.innerHTML;
    console.log('aaaaaaaa 30', text);
    text = text.replace(
        /Pokemon GO <strong> (\S+)<\/strong> is a\s+(\S+)/,
        (match, name, type) => {
            name = translatePokemonName(name);
            let r = `<strong>${name}</strong> は`;
            if (type === 'mythical') {
                r += '幻のポケモンで';
            } else if (type === 'legendary') {
                r += '伝説のポケモンで';
            }
            return r;
        }
    );
    console.log('aaaaaa 20', text)
    text = text.replace(
        / type Pokemon with a <strong>max CP of (\d+)<\/strong>,/,
        'タイプです。最大CPは<strong>$1</strong>です。');
    text = text.replace(
        /(\d+)\s+attack,\s+(\d+)\s+defense and\s+(\d+)\s+stamina in Pokemon GO./,
        '種族値は攻撃:$1、防御:$2、HP:$3 です。');
    text = text.replace(
        /It was originally found in the (.*) region \(Gen (\d+)\). /,
        (match, region, gen) => {
            region = translateRegion(region);
            gen = translateToKanjiNum(gen);
            return `${region}地方で発見されました(第${gen}世代)。`
        }
    );
    text =  text.replace(
        /(\S+) is vulnerable to (.+) type moves./,
        (match, name, types) => {
            name = translatePokemonName(name);
            types = types.split(/,|and/).map((type) => {
                return translateType(type.trim());
            });
            return `${name}の弱点は${types.join('、')}です。`;
        }
    );
    text =  text.replace(
        /([^;\s]+) is boosted by (.+) weather./,
        (match, name, weathers, types) => {
            name = translatePokemonName(name)
            ws = weathers.split(/,|and/).map((w) => {
                return translateWeather(w.trim());
            });
            return `${name}は天候が${ws.join('、')}でブーストします。`;
        }
    );
    console.log('aaaaaaaaaaaa 41', text)
    node.innerHTML = text;
};

const translateTopPageMoveset = (node) => {
    node.querySelectorAll('strong').forEach((s) => {   // todo: うまくいかないよ。
        s.innerText = translateMove(s.innerText);
    });
    let text = node.innerHTML;
    text = text.replace(
        /(\S+) best moveset is/,
        (match, name, type) => {
            name = translatePokemonName(name);
            return name + 'のオススメ技構成は';
        }
    );
    text = text.replace(/and/, 'と');
    text = text.replace(/, with a cycle \(weave\) DPS of/, 'です。ウィーブDPSは');
    text = text.replace(/damage per second<\/strong>/, '</strong>です');
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
                observers[path] = observer;
            }
            {
                const elm = document.querySelectorAll('.ui--homepage .card p')[0];
                if (elm.innerHTML.match(/Hello Trainer! Welcome to the world's largest Pokemon GO database/)) {
                    elm.innerHTML = '<p>トレーナーのみなさん、こんにちは！<br>世界最大のポケモンGOデータベースへようこそ。みなさんのお役に立てれば幸いです！メインページは<a href="https://pokemongohub.net">こちら</a>です。</p>';
                }
            }
        }
    }
})();
