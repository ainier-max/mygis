<template>
  <div>

    <div style="position: absolute;left: 10px;top:10px;">
      <el-button @click="openEdit" type="primary" size="mini">打开代码编辑器</el-button>
    </div>

    <div style="height: 100%;width: 100%">
      <code-render ref="codeRender" v-model="codeContent"
                   style="height: 100%;width: 100%;background-image: url(../../../static/img/mapBackground.jpg);background-repeat: no-repeat;background-size: 100% 100%;"></code-render>
    </div>

    <el-drawer
      title="编码编辑器"
      :visible.sync="drawer"
      :modal-append-to-body="false"
      :wrapperClosable="false"
      :modal="false"
      :direction="direction"
      size="50%">
      <div style="height: 100%" id="box">
        <textarea class="form-control" id="code" name="code"></textarea>
        <div style="position: absolute;right: 20px;top:100px;z-index: 9999">
          <el-button @click="run" type="primary" size="mini">运行</el-button>
          <el-button @click="showConfirm" type="primary" size="mini">另存为我的组件</el-button>
        </div>
      </div>
    </el-drawer>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      :close-on-click-modal="false">
      <el-input v-model="componentTitle" placeholder="请输入标题"></el-input>
      <el-input v-model="componentName" style="padding-top: 20px" placeholder="请输入组件名"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveConfirm">确 定</el-button>
  </span>
    </el-dialog>


  </div>

</template>

<script>
    import CodeRender from "./index";
    import CodeDemo from "./code-demo";
    import axios from 'axios';

    export default {
        name: "gisVue",
        data() {
            return {
                codeContent: '',
                drawer: true,
                direction: 'rtl',
                axios: axios,
                componentTitle: "",
                componentName: "",
                dialogVisible: false
            }
        },
        watch: {},
        methods: {
            initCodeMirror() {
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
                var height = document.getElementById("box").offsetHeight;
                editor.setSize('100%', height);     //设置代码框的长宽
                editor.setValue(this.codeContent);
            },
            openEdit() {
                this.drawer = true;
            },
            run() {
                this.codeContent = Object.assign(JSON.parse(JSON.stringify(editor.getValue())));
            },
            showConfirm() {
                this.dialogVisible = true;

                // this.$prompt('请输入组件标题', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                // }).then(({value}) => {
                //     console.log("输入名称：", value);
                //     var the = this;
                //     console.log("jkljk:", $("#customid"));
                //     html2canvas($("#customid"), {
                //         height: $("#customid").outerHeight(),
                //         background: '#000',
                //         onrendered: function (canvas) {
                //             var url = canvas.toDataURL();
                //             the.saveMyComponent(value, url);
                //         }
                //     });
                // });
            },
            saveConfirm() {
                var the = this;
                html2canvas($("#customid"), {
                    height: $("#customid").outerHeight(),
                    background: '#000',
                    onrendered: function (canvas) {
                        var url = canvas.toDataURL();
                        the.saveMyComponent(url);
                    }
                });
            },
            saveMyComponent(img) {
                //console.log(title,img);
                var optionTemp = this.$refs.codeRender.$children[0].value.props.option.default();
                console.log("optionTemp:", optionTemp);
                var the = this;
                var param = {};
                param.sql = "chart_scene.saveCustomComponent";
                param.userid = window.localStorage.getItem('loginUserid');
                param.chartoption = JSON.stringify(optionTemp);
                param.type = "custom";
                param.title = this.componentTitle;
                param.name = "custom-"+this.componentName;
                param.img = img;
                param.code = window.editor.getValue();
                this.axios.post(window.chartConfig.serverUrl + '/cbc/excute.cbc', param, this.headers_config)
                    .then(response => {
                        console.log("response123:", response);
                        var state = response.data[0].state;
                        if (state == "success") {
                            the.$message.success("保存成功！");
                            the.dialogVisible = false;
                        }
                    }).catch(error => {
                    console.log(error);
                });

            },
        },
        components: {
            CodeRender,
            CodeDemo
        },
        mounted: function () {
            var userid = window.localStorage.getItem('loginUserid');
            console.log("userid：", userid);
            if (userid == null || userid == '' || userid == 'null') {
                window.location.href = window.cbc_pre.split("static")[0] + "#/chart/login";
            }
            this.codeContent = "";
            this.$nextTick(function () {
                this.initCodeMirror();
            });
        },
    };
</script>

<style scoped>


</style>
