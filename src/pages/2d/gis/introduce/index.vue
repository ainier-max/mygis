<template>
  <div>
    <div style="width: 100%">

      <div style="padding-top: 10px;">
        <img  src="../../../../assets/home/background.png" style="padding-top: 10px;padding-left: 10px"><br>
        <div style="padding-top: 0px;margin-left: 20px;padding-right: 30px;color:rgb(86 72 61)">
          <p>
            &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;   由于公安信息化建设中所需的业务数据与空间数据都是相辅相成的，例如：重点人口的分布、案件的分布、警用基础设施管理、 重点单位、报警地点、娱乐场所、道路交通等等。公安机关打击犯罪、维护治安和服务管理社会的工作职责以及协同作战、快速反应的工作特点决定了需要使用GIS技术来辅助决策、指挥作战等等，传统的人工熟悉地理环境或依靠普通地图指挥作战已远不能适应当今实战的要求，目前，指挥中心、刑侦、治安、交通、消防、警卫、反恐等部门需要将已建成的相关业务信息系统与空间地理信息进行融合利用，提高公安机关作战指挥和管理分析等方面的能力和水平。图层数据查询分析在PGIS应用分析中起到关键性作用。基于地理对象的位置进行的空间数据分析技术，可以对地理现象的位置、
            空间布局进行分析,例如寻找适宜位置、计算成本距离等。还包括对空间关系和空间过程进行研究，例如识别空间关系，研究它
            们的内在规律，特别是获得隐含的空间信息。对图层数据进行快速查询分析进行辅助决策。如根据出事地（警情）点信息快速查
            询事故发生地附近的视频，警情、警力、安防信息以及交通和建筑分布状况。
          </p>
        </div>
      </div>
     <div style="padding-top: 20px;color:rgb(86 72 61);padding-left: 35px;padding-right: 30px;">
       <span style="font-family: 宋体;font-weight:bold;font-size: 26px;">主要解决以下问题</span><br>
        <div style="padding-top: 10px"></div>
       <span style="font-family: 宋体;font-weight:bold;">1：解决不同厂商的地图瓦片服务无缝接入（完全兼容）</span><br>
       &nbsp;&nbsp;&nbsp; &nbsp;           使用GIS组件对接各个不同地图厂商的地图服务接口。如方正，超图，天地图等OGC服务标准的瓦片地图服务。<br>
       <span style="font-family: 宋体;font-weight:bold">2：满足接入不同地图厂商的地图API接口</span><br>
       &nbsp;&nbsp;&nbsp; &nbsp;           矢量地图服务支持使用其所属的地图厂商的开发技术。如贵州四维图新API开发技术已融入到PandaGIS中。<br>
       <span style="font-family: 宋体;font-weight:bold">3：兼容js和vue环境</span><br>
       &nbsp;&nbsp;&nbsp; &nbsp;           采用vue组件技术开发地图接口。js使用插件加载vue组件文件，其调用的接口与vue一致，实现与js环境的兼容。这样后期维护只需一套即可同时满足vue和js环境的开发。<br>
       <span style="font-family: 宋体;font-weight:bold">4：空间数据分析</span><br>
       &nbsp;&nbsp;&nbsp; &nbsp;           地图数据（网吧，旅馆，视频，卡口等）都存储ElasticSearch中。空间分析采用ElasticSearch空间查询技术进行分析，对海量的数据进行空间的分析效率高，目前千万级别的空间查询速度基本都是毫秒级别。
     </div>

      <div style="padding-top: 20px;color:rgb(86 72 61);padding-left: 35px;padding-right: 30px;">
        <span style="font-family: 宋体;font-weight:bold;font-size: 26px">适用人员</span><br>
        <div style="padding-top: 10px"></div>
        前后端开发人员,需求人员,产品人员等
      </div>




    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    mounted:function () {
      //console.log(this);

    }
  }
</script>

<style>

</style>
