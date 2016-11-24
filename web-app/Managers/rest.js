var request = require('request');

var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'multipart/form-data'
}

var get = function (url, form, cb) {
    request({
        'url': url,
        'method': 'GET',
        'headers': headers,
        'form': form
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(body);
        }
    })
}

var post = function (url, form, cb) {
    request({
        'url': url,
        'method': 'POST',
        'headers': headers,
        'form': form
    }, function (error, response, body) {
        console.log("error : ", error)
        console.log("response : ", response)
        console.log("body : ", body)
        if (!error && response.statusCode == 200) {
            cb(body);
        }
    })
}

exports.get = get;
exports.post = post;