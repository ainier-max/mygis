function DynamicFlowMaterialProperty(color, speed,opacity,percent){
	this._definitionChanged = new Cesium.Event();
    this.color = color;
    this.speed = speed;
	this.opacity = opacity;
	this.percent = percent;
	DynamicFlowMaterialProperty.prototype.init(color, speed,opacity,percent);
}

Object.defineProperties(DynamicFlowMaterialProperty.prototype, {
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

DynamicFlowMaterialProperty.prototype.getType = function (time) {
      return 'DynamicFlow';
}
DynamicFlowMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
      result = {};
    }
	//console.log(" this.color1", this.color);
    result.color = this.color;
    result.speed = this.speed;
    result.opacity = this.opacity;
	result.percent =this.percent;
    return result;
}
DynamicFlowMaterialProperty.prototype.equals = function (other) {
	return false;
    //return this === other || (other instanceof DynamicFlowMaterialProperty && Cesium.Property.equals(this._color, other._color));
}

DynamicFlowMaterialProperty.prototype.init = function (color, speed,opacity,percent) {
	var sourceStr=`
            uniform vec4 color;
            uniform float speed;
            uniform float percent;
            uniform float opacity;
            czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st;
                    float time = fract( czm_frameNumber  *  speed / 1000.0);
                    time *= (1.0 + percent);
                    float alpha = smoothstep(time- percent, time, st.s) * step(-time, -st.s);
                    alpha += opacity;
                    material.diffuse= color.rgb;
                    material.alpha = alpha;
                    return material;
                }
                `
		console.log("sourceStr",sourceStr);
		console.log("参数:",color, speed,opacity,percent);
		var uniforms={
			color: color,
			speed: speed,
			opacity: opacity,
			percent: percent,
        };
		Cesium.Material._materialCache.addMaterial("DynamicFlow", {
            fabric: {
					type:"DynamicFlow", 
					uniforms:uniforms, 
					source:sourceStr
			},
            translucent: true
        });
    
}


