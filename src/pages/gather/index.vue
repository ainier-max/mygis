<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        mounted: function () {

        },
        methods: {

        }
    }
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

.titleClass {
  padding: 8px 16px;
  background-color: #fff6f7;
  border-radius: 4px;
  border-left: 5px solid #fe6c6f;
  margin: 10px 0;
  line-height: 40px;
}
</style>
