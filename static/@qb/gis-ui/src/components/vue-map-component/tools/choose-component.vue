<template>
  <div>
    <div v-show="chooseFlag" align="center"
         style="background-color: white;float:left;margin-right: 20px;border:2px solid #FFFFF0;border-radius:10px;">
      <ul style="padding-inline-start:20px;" :class="chooseClass">
        <li v-for="(item,i) in chooseMapData" style="display:inline-block;list-style:none;padding-right: 20px">
          <div>
            <img style="cursor:pointer;" @click="changeMap(item.config)" width="80px" height="60px"
                 :src="item.img">
            <div style="font-size: 10px">{{item.title}}</div>
          </div>
        </li>
      </ul>
    </div>

    <div
      style="float: right;width: 35px;height: 35px;background-color: white;border:2px solid #FFFFF0;border-radius:10px;cursor: pointer"
      align="center">
      <img style="padding-top: 6px" @click="showChooseWindow" :src="defaultImg">
    </div>

  </div>
  <!--export default {-->
</template>

<script>
    export default {
        name: "ChooseComponent",
        props: {
            mapRef: {type: String, request: true},//地图引用id
            chooseMapConfig: {type: Array, default: () => ([])},
        },
        data() {
            return {
                map: null,
                chooseFlag: false,
                chooseMapData: this.chooseMapConfig,
                defaultImg:this.chooseMapConfig.defaultImg,
                chooseClass:''
            }
        },
        computed: {},
        watch: {},
        components: {},
        methods: {
            initCoponent() {
                this.map = this.$parent.$refs[this.mapRef];
                console.log("this.map:",this.map.type);
                if(this.map.type=="vue"){
                    this.chooseClass="ulClass";
                }
                if (typeof (this.map) === "undefined") {
                    window.setTimeout(this.initCoponent, 500);
                }
            },
            changeMap(mapConfig) {
                console.log("地图配置：", mapConfig);
                //this.map
                this.map.loadMapByParam(mapConfig);
            },
            showChooseWindow() {
                if (this.chooseFlag==true) {
                    this.chooseFlag=false;
                }else{
                    this.chooseFlag = true;
                }

            },
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
            this.initCoponent();
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        }
    }
</script>

<style scoped>
  .ulClass{
    padding-top: 15px;
    padding-bottom: 5px;
  }
</style>
