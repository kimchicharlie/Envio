//var baseURL = "http://localhost:8081/api";
var baseURL = "http://137.74.40.245:8081/api";

function HttpPost(API, data, cb){
    
        $.ajax({
        url: baseURL + API,                      
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(data) {
            cb(data)
        }
    });
}

function HttpGet(API, data, cb){

        $.ajax({
        url: baseURL + API,                      
        type: 'Get',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(data) {
            cb(data)
        }
    });
}
