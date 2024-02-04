const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

//webpack -p
module.exports = {
  //mode: "development",
  entry: [
    //des依赖
    './static/map/vue-lib/vuejs/crypto-js.js',
    //leaflet基础依赖
    './static/map/vue-lib/mapjs/leaflet/leaflet/leaflet-src.js',
    './static/map/vue-lib/mapjs/leaflet/proj4/proj4.js',
    './static/map/vue-lib/mapjs/leaflet/proj4/proj4leaflet.js',
    './static/map/vue-lib/mapjs/leaflet/heatmap/leaflet-heat.js',

    //leaflet特色用例依赖
    './static/map/vue-lib/mapjs/leaflet/markercluster/leaflet.markercluster-src.js',
    './static/map/vue-lib/mapjs/leaflet/leaflet-ant-path/leaflet-ant-path.js',
    './static/map/vue-lib/mapjs/leaflet/control/pan/L.Control.Pan.js',
    './static/map/vue-lib/mapjs/leaflet/iconpulse/L.Icon.Pulse.js',
    './static/map/vue-lib/mapjs/leaflet/polylineDoctor/leaflet.polylineDecorator.js',
    './static/map/vue-lib/mapjs/leaflet/animation/AnimatedMarker.js',
    './static/map/vue-lib/mapjs/leaflet/animation/L.Polyline.SnakeAnim.js',
    './static/map/vue-lib/mapjs/leaflet/animation/MovingMarker.js',
    './static/map/vue-lib/mapjs/leaflet/canvas/L.CanvasOverlay.js',
    //标绘依赖
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/Leaflet.draw.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/Leaflet.Draw.Event.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/Toolbar.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/Tooltip.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/Control.Draw.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/ext/GeometryUtil.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/ext/LatLngUtil.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/ext/Polygon.Intersect.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/ext/Polyline.Intersect.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/ext/TouchEvents.js',
    //采集
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/DrawToolbar.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Feature.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.SimpleShape.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Polyline.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Marker.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Circle.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.CircleMarker.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Polygon.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Rectangle.js',
    //httpVueLoader依赖
    './static/map/vue-lib/vuejs/httpVueLoader.js',
    //修改
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/EditToolbar.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/EditToolbar.Edit.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/EditToolbar.Delete.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Poly.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.SimpleShape.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Rectangle.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Marker.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.CircleMarker.js',
    './static/map/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Circle.js',
    //mapv
    './static/map/vue-lib/mapv/mapv.js',

    './static/map/vue-lib/mapjs/leaflet/polylineoffset/leaflet.polylineoffset.js',
    //path 可拖动
    './static/map/vue-lib/mapjs/leaflet/drag/L.Path.Drag-src.js',
    //椭圆
    './static/map/vue-lib/mapjs/leaflet/ellipse/l.ellipse.js',

    //军事标绘
    './static/map/vue-lib/mapjs/leaflet/plot/Plots.js',
    './static/map/vue-lib/mapjs/leaflet/plot/PlotUtil.js',

    //碰撞
    './static/map/vue-lib/mapjs/leaflet/collision/Leaflet.LayerGroup.Collision.js'
  ],
  output: {
    filename: 'panda.gis.2d.min.js',
    path: path.resolve(__dirname, 'static/map/vue-lib/'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|gif|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 500000
          }
        }]
      }
    ]
  },
  //watch: true,   // 监听修改自动打包
  plugins: [
    new uglify()
  ],
  devServer: {}
}
