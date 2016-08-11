var http = require('http');
var fs = require("fs")
const PORT=3000;
// WARNING: There will be no persistance layer - when server is shutdown we lose the endpoints - endpoints are stored in memory and in following array
var functions = []

function handleRequest(request, response){
	// We might wanna use a url parser to make sure we are not missing corner cases but for this simple task it is easier to go without
	switch (request.url) {
		case "/":
			// It is usually much more efficient to serve static files with another server like nginx - but for sake of simplicity here I server our initial page with node
			fs.readFile("index.html", "binary", function(err, file) {
				if(err) {
					response.writeHead(500);
					response.write(err + "\n");
					response.end();
					return;
				}
				response.writeHead(200);
				response.write(file, "binary");
				response.end();
			});
			break;
		case "/deploy":
			newFunc = ""
			request.on('data', function(chunk) {
				newFunc += chunk;
			});
			request.on('end', function() {
				response.writeHead(200);
				functions.push(newFunc)
				response.end(""+(functions.length - 1));
			});
			break;
		default:
			idx = request.url.split("?")[0].substring(1);
			toRun = functions[idx];
			if (toRun) {
				argsStr = decodeURIComponent(request.url.substring(idx.length+2));
				responseStr = "";
				success = true;
				try {
					// WARNING: This is totally not the way to do it as it opens up our server to attacks - We might wanna run code from clients in a sandbox environment with very limited access. As an example, a well thought out solution will run this code in a containr with restricted access - not with server code
					responseStr = eval(argsStr+";\n"+toRun+";\n"+"run.apply(null,args);")
				} catch(e) {
					success = false;
					responseStr = e.message;
				}
				response.writeHead(success?200:500);
				response.end(""+responseStr);
			} else {
				response.writeHead(404);
				response.end("function not found");
			}
	}
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);
});
