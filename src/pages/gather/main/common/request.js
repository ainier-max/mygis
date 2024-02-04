export function commonSelectRequest(param, callback) {
  axios.post(window.gisConfig.serverUrl + '/cbc/select.cbc', param, my_headers_config)
    .then(response => {
      console.log(param.sql + "对应结果集为：", response);
      if (response.data[0].state == "success") {
        callback(response.data[0].objects);
      } else {
        console.error("服务异常,错误信息1：", response.data[0].message);
      }
    }).catch(error => {
    console.error("服务异常,错误信息2：", error);
  });
}

export function commonSelectRequestAndOtherParam(param, callback,otherParam) {
  axios.post(window.gisConfig.serverUrl + '/cbc/select.cbc', param, my_headers_config)
    .then(response => {
      console.log(param.sql + "对应结果集为：", response);
      if (response.data[0].state == "success") {
        callback(response.data[0].objects,otherParam);
      } else {
        console.error("服务异常,错误信息1：", response.data[0].message);
      }
    }).catch(error => {
    console.error("服务异常,错误信息2：", error);
  });
}

export function commonExcuteRequest(param, callback) {
  console.log(param.sql + "对应参数：", param);
  axios.post(window.gisConfig.serverUrl + '/cbc/excute.cbc', param, my_headers_config)
    .then(response => {
      console.log(param.sql + "对应结果集为：", response);
      if (response.data[0].state == "success") {
        callback(response.data[0]);
      } else {
        console.error("服务异常,错误信息1：", response.data[0].message);
        callback(response.data[0].message);
      }
    }).catch(error => {
    console.error("服务异常,错误信息2：", error);
  });
}

