
function toParams(dataobj) {
    let str = '';
    for (let key in dataobj) {
        str += `${key}=${dataobj[key]}&`
    }
    return str.slice(0, str.length - 1);
}

function ajax(obj) {

    let default_obj = {
        method: obj.method || 'get', // 默认参数为get请求
        url: obj.url,
        // boolean: obj.boolean == undefined ? true : obj.boolean ? true : false
        boolean: obj.boolean !== false ? true : false,
        data: null,
        header: obj.header ? obj.header : null
    }

    if (obj.data) {
        if (default_obj.method == 'get') {
            default_obj.data = toParams(obj.data);
            default_obj.url = default_obj.url + '?' + toParams(obj.data);
        } else {

            if (obj.header['content-type'] == 'application/x-www-form-urlencoded') {
                default_obj.data = toParams(obj.data);
            } else {
                default_obj.data = obj.data;
            }
        }
    }


    // 使用promise

    let p = new Promise((resolve, reject) => {
        // 定义ajax
        const xhr = new XMLHttpRequest();
        xhr.open(default_obj.method, default_obj.url, default_obj.boolean);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText)

                if (res.code == 0) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }
        }
        // console.log(default_obj.url);
        if (default_obj.header) {
            // xhr.setRequestHeader('content-type', default_obj.header['content-type']);
            for (let key in default_obj.header) {
                xhr.setRequestHeader(key, default_obj.header[key]);
            }
            // console.log(default_obj);
            xhr.send(default_obj.data);
        } else {
            xhr.send();
        }

    })

    // 将promis对象返回出去
    return p;

}


export default ajax;

