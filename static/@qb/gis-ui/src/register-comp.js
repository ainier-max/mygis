// 引入组件
import LeafletMapComponent from './components/vue-map-component/leaflet/map-component';
import MineMapComponent from './components/vue-map-component/minemap/map-component';
import ApiComponent from './components/vue-map-component/tools/api-component';
import PoiComponent from './components/vue-map-component/tools/poi-component';
import RealtimeComponent from './components/vue-map-component/tools/realtime-component';
import ChooseComponent from './components/vue-map-component/tools/choose-component';
// Vue.use(Qui) 默认加载下列组件
const registerComp = [
  LeafletMapComponent,
  MineMapComponent,
  ApiComponent,
  PoiComponent,
  RealtimeComponent,
  ChooseComponent
];

//  添加单个组件初始化方法
registerComp.map(component => {
  component.install = function (Vue, opts = {}) {
    Vue.component(component.name, component);
  }
});

// 添加组件初始化方法
const install = function(Vue, opts = {}) {
  registerComp.map(component => {
    Vue.component(component.name, component);
  });
};
export default {install};

export {
  LeafletMapComponent,
  MineMapComponent,
  ApiComponent,
  PoiComponent,
  RealtimeComponent,
  ChooseComponent
};
