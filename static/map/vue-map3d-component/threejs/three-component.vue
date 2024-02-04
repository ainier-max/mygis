<template>
  <div :id="id" ref="threeComponent">

  </div>
  <!-- export default { -->
</template>

<script>
    module.exports = {
        name: "threeComponent",
        props: {
            mapRef: {type: String, request: true},//地图引用id
            id: {type: String, default: ''},
            type: {type: String, default: ''},
            config: {type: Object, default: () => ({})},
            loadEnd: {type: String},
        },
        data: function () {
            return {
                map: null,//地图对象
                viewer: null,//地图对象
                three: {
                    renderer: null,
                    camera: null,
                    scene: null
                },//three对象
                objects3d:[],
                ThreeContainer:null,
            }
        },
        methods: {
            loadThree() {
                this.map = this.$parent.$refs[this.mapRef];
                console.log("地图对象:", this.map);
                if (typeof (this.map) === "undefined") {
                    window.setTimeout(this.loadThree, 1000);
                } else {
                    console.log("开始初始化threejs");
                    var fov = 45;
                    var width = window.innerWidth;
                    var height = window.innerHeight;
                    var aspect = width / height;
                    var near = 1;
                    var far = 10 * 1000 * 1000; // needs to be far to support Cesium's world-scale rendering

                    this.three.scene = new THREE.Scene();
                    this.three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                    this.three.renderer = new THREE.WebGLRenderer({alpha: true});
                    this.ThreeContainer = document.getElementById(this.id);
                    console.log("three容器对象", this.ThreeContainer);
                    this.ThreeContainer.appendChild(this.three.renderer.domElement);
                    this.init3Dobject(); // Initialize Three.js object mesh with Cesium Cartesian coordinate system
                    this.loop(); // Looping renderer
                }
            },
            init3Dobject() {
                var minWGS84 = [115.23,39.55];
                var maxWGS84 = [116.23,41.55];
                //Cesium entity
                var entity = {
                    name : 'Polygon',
                    polygon : {
                        hierarchy : Cesium.Cartesian3.fromDegreesArray([
                            minWGS84[0], minWGS84[1],
                            maxWGS84[0], minWGS84[1],
                            maxWGS84[0], maxWGS84[1],
                            minWGS84[0], maxWGS84[1],
                        ]),
                        material : Cesium.Color.RED.withAlpha(0.2)
                    }
                };
                console.log("222");
                var Polygon = this.map.viewer.entities.add(entity);
                console.log("3333");
                // Lathe geometry
                var doubleSideMaterial = new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                });
                var segments = 10;
                var points = [];
                for ( var i = 0; i < segments; i ++ ) {
                    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * segments + 5, ( i - 5 ) * 2 ) );
                }
                var geometry = new THREE.LatheGeometry( points );
                var latheMesh = new THREE.Mesh( geometry, doubleSideMaterial ) ;
                latheMesh.scale.set(1500,1500,1500); //scale object to be visible at planet scale
                latheMesh.position.z += 15000.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
                latheMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
                var latheMeshYup = new THREE.Group();
                latheMeshYup.add(latheMesh)
                this.three.scene.add(latheMeshYup); // don’t forget to add it to the Three.js scene manually

                //Assign Three.js object mesh to our object array
                var _3DOB = {};
                _3DOB.graphMesh = latheMeshYup;
                _3DOB.minWGS84 = minWGS84;
                _3DOB.maxWGS84 = maxWGS84;
                console.log("this.objects3d:",this.objects3d);
                console.log("_3DOB:",_3DOB);
                this.objects3d.push(_3DOB);
                // dodecahedron
                geometry = new THREE.DodecahedronGeometry();
                var dodecahedronMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()) ;
                dodecahedronMesh.scale.set(5000,5000,5000); //scale object to be visible at planet scale
                dodecahedronMesh.position.z += 15000.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
                dodecahedronMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
                var dodecahedronMeshYup = new THREE.Group();
                dodecahedronMeshYup.add(dodecahedronMesh)
                this.three.scene.add(dodecahedronMeshYup); // don’t forget to add it to the Three.js scene manually
                //Assign Three.js object mesh to our object array
                var _3DOB = {};
                _3DOB.graphMesh = dodecahedronMeshYup;
                _3DOB.minWGS84 = minWGS84;
                _3DOB.maxWGS84 = maxWGS84;
                this.objects3d.push(_3DOB);
            },
            loop() {
                requestAnimationFrame(this.loop);
                this.renderCesium();
                this.renderThreeObj();
            },
            renderCesium() {
                this.map.viewer.render();
            },
            renderThreeObj() {
                // register Three.js scene with Cesium
                this.three.camera.fov = Cesium.Math.toDegrees(this.map.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
                this.three.camera.updateProjectionMatrix();

                var cartToVec = function (cart) {
                    return new THREE.Vector3(cart.x, cart.y, cart.z);
                };

                // Configure Three.js meshes to stand against globe center position up direction
                for (id in this.objects3d) {
                    var minWGS84 = this.objects3d[id].minWGS84;
                    var maxWGS84 = this.objects3d[id].maxWGS84;
                    // convert lat/long center position to Cartesian3
                    var center = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2);

                    // get forward direction for orienting model
                    var centerHigh = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2, 1);

                    // use direction from bottom left to top left as up-vector
                    var bottomLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
                    var topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
                    var latDir = new THREE.Vector3().subVectors(bottomLeft, topLeft).normalize();
                    console.log("this.objects3d[id]:",this.objects3d[id]);
                    // configure entity position and orientation
                    this.objects3d[id].graphMesh.position.copy(center);
                    this.objects3d[id].graphMesh.lookAt(centerHigh);
                    this.objects3d[id].graphMesh.up.copy(latDir);
                }

                // Clone Cesium Camera projection position so the
                // Three.js Object will appear to be at the same place as above the Cesium Globe
                this.three.camera.matrixAutoUpdate = false;
                var cvm = this.map.viewer.camera.viewMatrix;
                var civm = this.map.viewer.camera.inverseViewMatrix;
                this.three.camera.matrixWorld.set(
                    civm[0], civm[4], civm[8], civm[12],
                    civm[1], civm[5], civm[9], civm[13],
                    civm[2], civm[6], civm[10], civm[14],
                    civm[3], civm[7], civm[11], civm[15]
                );
                this.three.camera.matrixWorldInverse.set(
                    cvm[0], cvm[4], cvm[8], cvm[12],
                    cvm[1], cvm[5], cvm[9], cvm[13],
                    cvm[2], cvm[6], cvm[10], cvm[14],
                    cvm[3], cvm[7], cvm[11], cvm[15]
                );
                this.three.camera.lookAt(new THREE.Vector3(0, 0, 0));

                var width = this.ThreeContainer.clientWidth;
                var height = this.ThreeContainer.clientHeight;
                var aspect = width / height;
                this.three.camera.aspect = aspect;
                this.three.camera.updateProjectionMatrix();

                this.three.renderer.setSize(width, height);
                this.three.renderer.render(this.three.scene, this.three.camera);
            }

        },
        mounted() {
            this.loadThree();
        }

    }
</script>

<style>

</style>
