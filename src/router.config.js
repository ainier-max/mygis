import GisVue from './pages/code-render/gis-vue'//codeRender
import ChartVue from './pages/code-render/chart-vue'//codeRender

//2d
import Main from './pages/2d/Main.vue'
import GisIntroduce from './pages/2d/gis/introduce/index.vue'
import GisAccess from './pages/2d/gis/access/index.vue'
import GisBase from './pages/2d/gis/base/index.vue'
import GisAssembly from './pages/2d/gis/assembly/index.vue'
import GisApiExample from './pages/2d/gis/api/index.vue'//api接口用例
import gisChart from './pages/2d/gis/chart/index'//图表用例
import scene from './pages/2d/gis/scene/index'//应用场景
import Question from './pages/2d/gis/question/index'//常见问题
import Issue from './pages/2d/gis/issue/index'//提交Issue
import Support from './pages/2d/gis/support/index'//技术支持与服务


//gather
import Gather from './pages/gather/index'//通用采集系统登录页
import Login from './pages/gather/login/login'//通用采集系统登录页
import GatherMain from './pages/gather/main/main'//通用采集系统登录页

import GatherMainGatherState from './pages/gather/main/gatherState/gatherState'//采集状况
import GatherMainGatherTask from './pages/gather/main/gatherTask/gatherTask'//任务申请
import GatherMainTaskApply from './pages/gather/main/taskApply/taskApply'//任务申请
import GatherMainTaskApproval from './pages/gather/main/taskApproval/taskApproval'//任务申请
import GatherMainTaskDeploy from './pages/gather/main/taskDeploy/taskDeploy'//任务调配
import GatherMainTaskDetail from './pages/gather/main/taskDetail/taskDetail'//任务详情
import GatherMainTaskDistribution from './pages/gather/main/taskDistribution/taskDistribution'//任务分配
import GatherMainSelectDic from './pages/gather/main/selectDic/selectDic'//下拉框字典
import GatherMainTreeDic from './pages/gather/main/treeDic/treeDic'//树形字典
import GatherMainUserManager from './pages/gather/main/userManager/userManager'//用户管理

import GatherPage from './pages/gather/main/gatherPage/gatherPage'//采集页面

//3d
import Main3D from './pages/3d/Main.vue'
import GisIntroduce3D from './pages/3d/gis/introduce/index.vue'
import GisAccess3D from './pages/3d/gis/access/index.vue'
import GisBase3D from './pages/3d/gis/base/index.vue'
import GisChart3D from './pages/3d/gis/chart/index.vue'
import GisSpace3D from './pages/3d/gis/analysis/index.vue'
import GisScene3D from './pages/3d/gis/scene/index.vue'


//cesium-vue
import CesiumVue from './pages/cesium-vue/index.vue'

export default {
	routes:[
    //通用采集系统
    {
      path:'/gather',
      component:Gather,
      children:[
        {
          path: 'login',
          component: Login
        },
        {
          path: 'gatherPage',
          component: GatherPage
        },
        {
          path: 'main',
          component: GatherMain,
          children:[
            {
              path: 'gatherState',
              component: GatherMainGatherState
            },
            {
              path: 'gatherTask',
              component: GatherMainGatherTask
            },
            {
              path: 'taskApply',
              component: GatherMainTaskApply
            },
            {
              path: 'taskApproval',
              component: GatherMainTaskApproval
            },
            {
              path: 'taskDeploy',
              component: GatherMainTaskDeploy
            },
            {
              path: 'taskDetail',
              component: GatherMainTaskDetail
            },
            {
              path: 'taskDistribution',
              component: GatherMainTaskDistribution
            },
            {
              path: 'selectDic',
              component: GatherMainSelectDic
            },
            {
              path: 'treeDic',
              component: GatherMainTreeDic
            },
            {
              path: 'userManager',
              component: GatherMainUserManager
            },

          ]
        }
      ]
    },
    //codeRender
    {
      path:'/gisVue',
      component:GisVue
    },
    {
      path:'/cesiumVue',
      component:CesiumVue
    },
    {
      path:'/2d',
      component:Main,
      children:[
        {
          path: 'gisIntroduce',
          component: GisIntroduce
        },
        {
          path: 'gisAccess',
          component: GisAccess
        },
        {
          path: 'gisBase',
          component: GisBase
        },
        {
          path: 'gisAssembly',
          component: GisAssembly
        },
        {
          path: 'chart',
          component: gisChart
        },
        {
          path: 'gisApiExample',
          component: GisApiExample
        },
        {
          path: 'gisScene',
          component: scene
        },{
          path: 'gisQuestion',
          component: Question
        },{
          path: 'gisIssue',
          component: Issue
        },{
          path: 'gisSupport',
          component: Support
        },

      ]
    },
    {
      path:'/3d',
      component:Main3D,
      children:[
        {
          path: 'gisIntroduce',
          component: GisIntroduce3D
        },
        {
          path: 'gisAccess',
          component: GisAccess3D
        },
        {
          path: 'gisBase',
          component: GisBase3D
        },
        {
          path: 'gisAssembly',
          component: GisAssembly
        },
        {
          path: 'gisChart',
          component: GisChart3D
        },
        {
          path: 'gisSpace',
          component: GisSpace3D
        },
        {
          path: 'gisScene',
          component: GisScene3D
        },

      ]
    }
	]
}
