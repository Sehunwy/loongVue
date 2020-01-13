import axios from 'axios'
import QS from 'qs';

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
      let reg = /<[^>]+>/g;
      if(reg.test(res.data)) {
        window.location.href = "login.html?errorCode=410";
      }

      // console.log(res.indexOf('<html>'))
      // if(res.indexOf('<html>')) {
      //   window.location.href = "login.html?errorCode=410";
      // }
    }).catch(err => {
      reject(err.data);
      console.log("error")
      console.log(err.response)
      let status = err.response.status;
      if(status==410) {
        window.location.href = "login.html?errorCode=410";
      }
    })
  })
};

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data);
        let status = err.response.status;
        if(status==410) {
          window.location.href = "login.html?errorCode=410";
        };
      })
  });
};
