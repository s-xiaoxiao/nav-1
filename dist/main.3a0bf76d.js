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
var x = localStorage.getItem("x"); //得到缓存
//localStorage.getItem() :    得到缓存

var xObject = JSON.parse(x); //JSON.parse():方法用来解析JSON字符串,构造由字符串描述的JavaScript值或对象.

var hashMap = xObject || [//缓存
{
  url: "https://www.bilibili.com"
}, {
  url: "https://www.acfun.cn"
}]; //search input 阻止冒泡document

$(".globalSearch").on("input", function (e) {
  e.stopPropagation();
}); //Event.stopPropagation()：方法阻止捕获和冒泡阶段中当前事件的进一步传播
//渲染快捷方式

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    //foreach():方法对数组的每个元素执行一次提供的函数
    var $li = $("<li>\n      <div class=\"site\">\n        <div class=\"logo\">\n          <img src=\"".concat(node.url.slice(0, node.url.indexOf(".com") === -1 ? node.url.length : node.url.indexOf(".com") + 4), "/favicon.ico\" alt=\"\" />\n        </div>\n        <div class=\"link\">").concat(node.url.slice(0, 12) === "https://www." ? node.url.slice(12, node.url.indexOf(".com") === -1 ? node.url.length : node.url.indexOf(".com") + 4) : node.url.slice(8, node.url.indexOf(".com") === -1 ? node.url.length : node.url.indexOf(".com") + 4), "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">x\n            <use xlink:href=\"#icon-close\"></use>\n          </svg>\n        </div>\n      </div>\n    </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url); //window接口的open()方法,是用指定的名称将指定的资源加载到浏览器上下文(窗口window,内嵌框架iframe或者tab标签)。如果没有指定，则新窗口
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
}; //运行缓存数据


render(); //添加快捷方式

$(".addButton").on("click", function () {
  var url = window.prompt("输入xx.com or www.xx.com 网址;"); //window.prompt() :显示一个对话框,对话框中包含一条文字信息,用来提示用户输入文字
  //防止出现两个

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
}); //使用热键快速打开网站快捷方式

$(document).on("keypress", function (e) {
  var key = e.key;

  if (key >= 1 && key <= 9) {
    window.open(hashMap[key - 1].url);
  } else if (key === "0") {
    window.open(hashMap[hashMap.length - 1].url);
  }
}); //窗口关闭时缓存数据

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //JSON.stringify() 方法将一个JavaScript值(对象或者数组)转换为一个JSON字符串,如果指定了replacer是一个函数

  localStorage.setItem("x", string); //setItem() 作为storage接口的方法,接收一个键名和值作为参数,将会把键名添加到存储中,如果键名已存在,则更新其对应的值
}; //提示用户使用热键
// $(document).on("keypress", e => {
//   let { key } = e;
//   if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z")) {
//     window.alert("仅支持数字0-9热键");
//   }
// });
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.3a0bf76d.js.map