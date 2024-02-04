<template>
  <div>

    <div class="box left" id="leftBox">
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <div style="position:absolute;right: 50px;top:10px;z-index: 10000">
        <button @click='run()'>运行</button>
      </div>

      <div class="resize-box" id="resize-box">

        <textarea class="form-control" id="code" name="code"></textarea>
      </div>
    </div>
    <div class="box right" id="rightDiv">
      <!--
      <iframe id='effect' style='width:100%;height:100%;margin-top: -10px'></iframe>
      -->
      <code-render ref="codeRender" v-model="codeContent" style="width: 100px"></code-render>
    </div>
  </div>
</template>

<script>
  import CodeRender from "./index";
  import CodeDemo from "./code-demo";
  import elementResizeDetectorMaker from 'element-resize-detector'

  export default {
    name: "gisVue",
    data() {
      return {
        codeContent:'',
      }
    },
    watch: {

    },
    methods:{
      readFile(filePath) {
        // 创建一个新的xhr对象
        let xhr = null
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {
          // eslint-disable-next-line
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        const okStatus = document.location.protocol === 'file' ? 0 : 200
        xhr.open('GET', filePath, false)
        xhr.overrideMimeType('text/html;charset=utf-8')
        xhr.send(null)
        return xhr.status === okStatus ? xhr.responseText : null
      },
      initCodeMirror(){
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
        editor.setValue(this.codeContent);
      },
      run(){
        this.codeContent=Object.assign(JSON.parse(JSON.stringify(editor.getValue())));
      }
    },
    components: {
      CodeRender,
      CodeDemo
    },
    mounted: function () {
      window.mapResizeErd = elementResizeDetectorMaker();

      var isString=window.location.href;
      var urlStr=window.location.href.substring(isString.indexOf("?url=")+5,isString.lastIndexOf("&title="));
      var titleStr=window.location.href.substring(isString.indexOf("&title=")+7,isString.length);

      urlStr=decodeURI(urlStr);
      urlStr=urlStr.replace(new RegExp('%2F','g'),'/');
      urlStr=urlStr.replace(new RegExp('.html','g'),'.vue');
      titleStr=decodeURI(titleStr);
      window.parent.document.title=titleStr;

      console.log(urlStr,titleStr);

      //动态加入依赖文件，防止页面初始化加载过多的依赖文件，导致慢的问题
      if(urlStr.indexOf("minemap.vue")>0){
          document.writeln('<link rel="stylesheet" href="../../../static/map/vue-lib/mapjs/minemap/minemap.css"></link>');
          document.writeln('<link rel="stylesheet" href="../../../static/mapvue-lib/mapjs/minemap/minemap-edit.css"></link>');
          document.writeln("<script src='../../../static/map/vue-lib/mapjs/minemap/minemap.js'><\/script>");
          document.writeln('<script src="../../../static/map/vue-lib/mapjs/minemap/minemap-edit.js"><\/script>');
          document.writeln('<script src="../../../static/map/vue-lib/mapjs/minemap/turf.min.js"><\/script>');
      }
      if(urlStr.indexOf("pieChart.vue")>0 || urlStr.indexOf("barChart.vue")>0 ){
          document.writeln('<script src="../../../static/map/vue-lib/echart/echarts.js"><\/script>');
      }

      this.codeContent=this.readFile('./'+urlStr);
      //console.log("this.codeContent:",this.codeContent);
      this.initCodeMirror();


      // Firefox和Chrome早期版本中带有前缀
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      // 选择目标节点
      var target = document.querySelector('#rightDiv');
// 创建观察者对象
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          console.log(mutation)
        });
      });
// 配置观察选项:
      var config = {
        attributes: true,//检测属性变动
        childList: true,//检测子节点变动
        characterData: true//节点内容或节点文本的变动。
      }
// 传入目标节点和观察选项
      observer.observe(target, config);
// 停止观察
// observer.disconnect();
    },

  };
</script>

<style>
  ::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #a8a9ab;
  }
  ::-webkit-scrollbar-track {/*滚动条里面轨道*/
    border-radius: 5px;
    background: #f0f2f5;
  }
  .mapMain{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .left{
    position: relative;
    height: 100vh;
    overflow: auto;
    float: left;
  }
  .right{
    position: relative;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
  .resize-box {
    position: absolute;
    top: 0;
    right: 7px;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
  }
  .resize-bar {
    width: 50vw;
    height: inherit;
    resize: horizontal;
    cursor: ew-resize;
    opacity: 0;
    overflow: scroll;
  }
  /* 拖拽线 */
  .resize-line {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    border-right: 3px solid #eee;
    border-left: 2px solid #bbb;
    pointer-events: none;
  }
  .resize-bar:hover ~ .resize-line,
  .resize-bar:active ~ .resize-line {
    border-left: 1px dashed skyblue;
  }
  .resize-bar::-webkit-scrollbar {
    width: 50vw;
    height: inherit;
  }

  /* Firefox只有下面一小块区域可以拉伸 */
  @supports (-moz-user-select: none) {
    .resize-bar:hover ~ .resize-line,
    .resize-bar:active ~ .resize-line {
      border-left: 1px solid #bbb;
    }
    .resize-bar:hover ~ .resize-line::after,
    .resize-bar:active ~ .resize-line::after {
      content: '';
      position: absolute;
      width: 16px; height: 16px;
      bottom: 0; right: -8px;
      /*background: url(./resize.svg);*/
      background-size: 100% 100%;
    }
  }

</style>
