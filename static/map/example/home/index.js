/**
 * 点击运行
 */
function run() {
  var object = document.getElementById("effect");
  object.srcdoc = window.editor.getValue();
}

function runVue() {
  let url = getUrlKey("url");
  let title=getUrlKey("title");
  var getUrl=window.parent.location.href.split("static/map")[0]+"#/gisVue?url="+url+"&title="+title;
  console.log("vue跳转路径:",getUrl);
  window.open(getUrl, '_blank');
}



/**
 * 编辑器初始化
 */
function initCodeMirror() {
  var mixedMode = {
    name: "htmlmixed",
    scriptTypes: [{
      matches: /\/x-handlebars-template|\/x-mustache/i,
      mode: null
    },
      {
        matches: /(text|application)\/(x-)?vb(a|script)/i,
        mode: "vbscript"
      }]
  };
  window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: mixedMode,
    selectionPointer: true,
    lineNumbers: true,	//显示行号
    theme: "dracula",	//设置主题
    lineWrapping: true,	//代码折叠
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true,	//括号匹配
  });
  var height=document.getElementById('resize-box').offsetHeight;
  editor.setSize('100%', height);     //设置代码框的长宽
  var object = document.getElementById("effect");
  object.srcdoc = editor.getValue();
}
/**
 * 参数路径解析
 */
function getUrlKey(name){
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(window.parent.location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}
/**
 * 页面初始化
 */
function load() {
  let url = getUrlKey("url");
  let title=getUrlKey("title");
  window.parent.document.title=title;
  if(url){
    var getUrl=window.parent.location.href.split("static/map")[0]+"/"+url;
    console.log("js跳转路径:",getUrl);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case 4: {
          if(xhr.response){
            var tObj = document.getElementById('code');
            tObj.value = xhr.response;
            initCodeMirror();
          }
          break;
        }
      }
    };
    xhr.open('get', getUrl);
    xhr.send();
  }
}
