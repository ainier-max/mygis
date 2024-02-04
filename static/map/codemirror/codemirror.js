var cbc_codemirror_scripts = document.getElementsByTagName('script')//获所有script标签
var cbc_codemirror_pre="";
//获取/vue-lib/jslib.js的前缀
for(var i=0;i<cbc_codemirror_scripts.length;i++){
  if(cbc_codemirror_scripts[i].src.indexOf("/codemirror/codemirror.js")>0){
    var jslibsrc=cbc_codemirror_scripts[i].src;
    var subsrc=jslibsrc.substring(0,jslibsrc.indexOf("/codemirror/codemirror.js"));
    cbc_codemirror_pre=subsrc;
  }
}
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/codemirror.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_codemirror_pre+'/codemirror/css/codemirror.css">');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/codemirror.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/selection-pointer.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/xml.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/javascript.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/css.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/vbscript.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/htmlmixed.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/clike.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/groovy.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_codemirror_pre+'/codemirror/css/dracula.css"/>');
document.writeln('<link rel="stylesheet" href="'+cbc_codemirror_pre+'/codemirror/css/foldgutter.css"/>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/foldcode.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/foldgutter.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/brace-fold.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/comment-fold.js"></script>');
document.writeln('<script src="'+cbc_codemirror_pre+'/codemirror/js/matchbrackets.js"></script>');
