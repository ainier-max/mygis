function WaterRippleMaterialProperty(color, speed,count,gradient){
	this._definitionChanged = new Cesium.Event();
    this.color = color;
    this.speed = speed;
	this.count = count;
	this.gradient = gradient;
	WaterRippleMaterialProperty.prototype.init(color, speed,count,gradient);
}

Object.defineProperties(WaterRippleMaterialProperty.prototype, {
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

WaterRippleMaterialProperty.prototype.getType = function (time) {
      return 'WaterRipple';
}
WaterRippleMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
      result = {};
    }
	//console.log(" this.color1", this.color);
    result.color = this.color;
    result.speed = this.speed;
    result.count = this.count;
	result.gradient =this.gradient;
    return result;
}
WaterRippleMaterialProperty.prototype.equals = function (other) {
	return false;
    //return this === other || (other instanceof DynamicFlowMaterialMaterialProperty && Cesium.Property.equals(this._color, other._color));
}

WaterRippleMaterialProperty.prototype.init = function (color, speed,count,gradient) {
	var sourceStr='czm_material czm_getMaterial(czm_materialInput materialInput)'
                +'{'
                +'    czm_material material = czm_getDefaultMaterial(materialInput);'
                +'    material.diffuse = 1.5 * color.rgb;'
                +'    vec2 st = materialInput.st;'
                +'    vec3 str = materialInput.str;'
                +'    float dis = distance(st, vec2(0.5, 0.5));'
                +'    float time = fract( czm_frameNumber  *  speed / 1000.0);'
                +'    float per = fract(time);'
                +'    if (abs(str.z) > 0.001) {'
                +'        discard;'
                +'    }'
                +'    if (dis > 0.5) {' 
                +'        discard;' 
                +'    } else {' 
                +'        float perDis = 0.5 / count;'
                +'        float disNum;'                     
                +'        float bl = .0;'
                +'        for (int i = 0; i <= '+count+'; i++) {'                            
                +'            disNum = perDis *float(i) - dis + per / count;'    
                +'            if (disNum > 0.0) {'    
                +'                if (disNum < perDis) {'                                      
                +'                    bl = 1.0 - disNum / perDis;'
                +'                }'                                 
                +'                else if(disNum - perDis < perDis) {'                            
                +'                        bl = 1.0 - abs(1.0 - disNum / perDis); '
                +'                }'
                +'                material.alpha = pow(bl, gradient); '
                +'            } '
                +'        } '
                +'    } '
                +'    return material; '
                +'}'
		var uniforms={
			color: color,
			speed: speed,//步长
			count: count,//波纹总数
			gradient: gradient,//波纹的间须长度
        };
		Cesium.Material._materialCache.addMaterial("WaterRipple", {
            fabric: {
					type:"WaterRipple", 
					uniforms:uniforms, 
					source:sourceStr
			},
            translucent: true
        });
    
}


