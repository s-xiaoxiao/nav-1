const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { url: "https://www.bilibili.com" },
  { url: "https://www.acfun.cn" }
];
console.log($("globalHeader>input"));

$("globalSearch").on("click", e => {
  console.log(aa);
  window.open = null;
  e.stopPropagation();
});
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
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
      window.open(node.url);
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
render();
$(".addButton").on("click", () => {
  let url = window.prompt(
    "输入xx.com or www.xx.com 网址;一级域名仅支持.com .cn"
  );
  //防止出现两个
  //仅支持一级域名.cn or .com
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

$(document).on("keypress", e => {
  const { key } = e;
  if (key >= 1 && key <= 9) {
    window.open(hashMap[key - 1].url);
  } else if (key === "0") {
    window.open(hashMap[hashMap.length - 1].url);
  }
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on("keypress", e => {
  let { key } = e;
  if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z")) {
    window.alert("仅支持数字0-9热键");
  }
});
