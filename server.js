var http = require("http");
var url = require("url");

function start(route,handle){
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for" + pathname + "received.");

		//响应头部信息
		//200为状态码，2xx表示请求已成功被服务器接收
		response.writeHead(200,{"Content-Type":"text/plain"});

		var content = route(handle,pathname)

		response.write(content);
		response.end();//结束响应
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;

