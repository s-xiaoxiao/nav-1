// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  url: "https://www.bilibili.com"
}, {
  url: "https://www.acfun.cn"
}];
console.log($("globalHeader>input"));
$("globalSearch").on("click", function (e) {
  console.log(aa);
  window.open = null;
  e.stopPropagation();
});

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n      <div class=\"site\">\n        <div class=\"logo\">\n          <img src=\"".concat(node.url.slice(0, node.url.indexOf(".com") === -1 ? node.url.length : node.url.indexOf(".com") + 4), "/favicon.ico\" alt=\"\" />\n        </div>\n        <div class=\"link\">").concat(node.url.slice(0, 12) === "https://www." ? node.url.slice(12, node.url.indexOf(".com") === -1 ? node.url.length : node.url.indexOf(".com") + 4) : node.url.slice(8, node.url.indexOf(".com") === -1 ? node.url.length : node.url.indexOf(".com") + 4), "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">x\n            <use xlink:href=\"#icon-close\"></use>\n          </svg>\n        </div>\n      </div>\n    </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });

  if (hashMap.length <= 9) {
    $(".last").css("display", "block");
  } else {
    $(".last").css("display", "none");
  }
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("输入xx.com or www.xx.com 网址;一级域名仅支持.com .cn"); //防止出现两个
  //仅支持一级域名.cn or .com

  if (url !== "") {
    if (url.indexOf("https://") !== 0) {
      url = "https://" + url;
      let = result = 1;
      hashMap.forEach(function (Node) {
        Node.url === url ? result = 0 : 1;
      });

      if (result) {
        hashMap.push({
          url: url
        });
        render();
      }
    }
  }

  if (hashMap.length >= 10) {
    $(".last").css("display", "none");
  }
});
$(document).on("keypress", function (e) {
  var key = e.key;

  if (key >= 1 && key <= 9) {
    window.open(hashMap[key - 1].url);
  } else if (key === "0") {
    window.open(hashMap[hashMap.length - 1].url);
  }
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", function (e) {
  var key = e.key;

  if (key >= "a" && key <= "z" || key >= "A" && key <= "Z") {
    window.alert("仅支持数字0-9热键");
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d467b9c7.js.map