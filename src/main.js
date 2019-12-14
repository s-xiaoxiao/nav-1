const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x"); //得到缓存
//localStorage.getItem() :    得到缓存
const xObject = JSON.parse(x);
//JSON.parse():方法用来解析JSON字符串,构造由字符串描述的JavaScript值或对象.
const hashMap = xObject || [
  //缓存
  { url: "https://www.bilibili.com" },
  { url: "https://www.acfun.cn" }
];
//search input 阻止冒泡document

$(".globalSearch").on("input", function(e) {
  e.stopPropagation();
});
//Event.stopPropagation()：方法阻止捕获和冒泡阶段中当前事件的进一步传播

//渲染快捷方式
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    //foreach():方法对数组的每个元素执行一次提供的函数
    const $li = $(`<li>
      <div class="site">
        <div class="logo">
          <img src="${node.url.slice(
            0,
            node.url.indexOf(".com") === -1
              ? node.url.length
              : node.url.indexOf(".com") + 4
          )}/favicon.ico" alt="" />
        </div>
        <div class="link">${
          node.url.slice(0, 12) === "https://www."
            ? node.url.slice(
                12,
                node.url.indexOf(".com") === -1
                  ? node.url.length
                  : node.url.indexOf(".com") + 4
              )
            : node.url.slice(
                8,
                node.url.indexOf(".com") === -1
                  ? node.url.length
                  : node.url.indexOf(".com") + 4
              )
        }</div>
        <div class="close">
          <svg class="icon">x
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url); //window接口的open()方法,是用指定的名称将指定的资源加载到浏览器上下文(窗口window,内嵌框架iframe或者tab标签)。如果没有指定，则新窗口
    });

    $li.on("click", ".close", e => {
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
//运行缓存数据
render();
//添加快捷方式
$(".addButton").on("click", () => {
  let url = window.prompt("输入xx.com or www.xx.com 网址;");
  //window.prompt() :显示一个对话框,对话框中包含一条文字信息,用来提示用户输入文字
  //防止出现两个
  if (url !== "") {
    if (url.indexOf("https://") !== 0) {
      url = "https://" + url;
      let = result = 1;
      hashMap.forEach(Node => {
        Node.url === url ? (result = 0) : 1;
      });
      if (result) {
        hashMap.push({ url: url });
        render();
      }
    }
  }
  if (hashMap.length >= 10) {
    $(".last").css("display", "none");
  }
});
//使用热键快速打开网站快捷方式
$(document).on("keypress", e => {
  const { key } = e;
  if (key >= 1 && key <= 9) {
    window.open(hashMap[key - 1].url);
  } else if (key === "0") {
    window.open(hashMap[hashMap.length - 1].url);
  }
});

//窗口关闭时缓存数据
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  //JSON.stringify() 方法将一个JavaScript值(对象或者数组)转换为一个JSON字符串,如果指定了replacer是一个函数
  localStorage.setItem("x", string);
  //setItem() 作为storage接口的方法,接收一个键名和值作为参数,将会把键名添加到存储中,如果键名已存在,则更新其对应的值
};

//提示用户使用热键
$(document).on("keypress", e => {
  let { key } = e;
  if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z")) {
    window.alert("仅支持数字0-9热键");
  }
});
