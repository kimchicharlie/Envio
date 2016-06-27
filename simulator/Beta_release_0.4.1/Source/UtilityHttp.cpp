// Project created on 14/04/2016 Ilyes Abd-Lillah
// [Breif] This file contains all the methods used for http communication in c++, this file use the C++ Rest API (codename : Casablanca) to perform all the Http connection
//		   from the Envio' software visualizator
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] OK
//             Unit test  [x] OK
//             Release    [ ] None

#include "UtilityHttp.h"

void Respond(const http_request& request, const status_code& status, const json::value& response) {
	json::value resp;
	resp[U("status")] = json::value::number(status);
	resp[U("response")] = response;

	// Pack in the current time for debugging purposes.
	time_t now = time(0);
	utility::stringstream_t ss;
 	ss << std::put_time(localtime(&now), L"%Y-%m-%dT%H:%M:%SZ");
	resp[U("server_time")] = json::value::string(ss.str());

	request.reply(status, resp);
}

pplx::task<void> RequestJSONValueAsync()
{
	http_client client(APIADDRESS);
	int i = 0;
	return client.request(methods::GET).then([](http_response response) -> pplx::task<json::value>
	{
		if (response.status_code() == status_codes::OK)
		{
			return response.extract_json();
		}

		// Handle error cases, for now return empty json value...
		return pplx::task_from_result(json::value());
	})
		.then([](pplx::task<json::value> previousTask)
	{
		try
		{
			const json::value& v = previousTask.get();
			std::wstring s = v.to_string();
			std::string ss(s.begin(), s.end());
			// Perform actions here to process the JSON value...
		}
		catch (const http_exception& e)
		{
			// Print error.
			std::wostringstream ss;
			ss << e.what() << std::endl;
			std::wcout << ss.str();
		}
	});
}