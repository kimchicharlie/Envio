function HttpPost(API, data, cb){
    
        var baseURL = "http://localhost:8081/api";

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

        var baseURL = "http://localhost:8081/api";

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