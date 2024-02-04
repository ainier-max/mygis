function circleFadeMaterialProperty(color, speed){
	this._definitionChanged = new Cesium.Event();
    this.color = color;
    this.speed = speed;
	circleFadeMaterialProperty.prototype.init(color, speed);
}

Object.defineProperties(circleFadeMaterialProperty.prototype, {
      isConstant: {
        get: function () {
          return false;
        }
      },
      definitionChanged: {
        get: function () {
          return this._definitionChanged;
        }
      }
});

circleFadeMaterialProperty.prototype.getType = function (time) {
      return 'CircleFade';
}
circleFadeMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
      result = {};
    }
	//console.log(" this.color1", this.color);
    result.color = this.color;
    result.speed = this.speed;
    return result;
}
circleFadeMaterialProperty.prototype.equals = function (other) {
	return false;
    //return this === other || (other instanceof circleFadeMaterialProperty && Cesium.Property.equals(this._color, other._color));
}

circleFadeMaterialProperty.prototype.init = function (color, speed) {
	var sourceStr=`
        uniform vec4 color;
        uniform float speed;

        czm_material czm_getMaterial(czm_materialInput materialInput){
          czm_material material = czm_getDefaultMaterial(materialInput);
          material.diffuse = 1.5 * color.rgb;
          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5, 0.5));
          float per = fract(czm_frameNumber * speed / 1000.0);
          if(dis > per * 0.5){
            material.alpha = color.a;
          }else {
            discard;
          }
          return material;
        }
         `
		console.log("sourceStr",sourceStr);
		console.log("参数:",color, speed);
		var uniforms={
			color: color,
			speed: speed
        };
		Cesium.Material._materialCache.addMaterial("CircleFade", {
            fabric: {
					type:"CircleFade", 
					uniforms:uniforms, 
					source:sourceStr
			},
            translucent: true
        });
    
}


