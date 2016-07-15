// Project created on 14/04/2016 Ilyes Abd-Lillah
// [Breif] This file contains all the methods used for http communication in c++, this file use the C++ Rest API (codename : Casablanca) to perform all the Http connection
//		   from the Envio' software visualizator
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] OK
//             Unit test  [x] OK
//             Release    [ ] None

#include "UtilityHttp.h"

UtilityHttp::UtilityHttp()
{
}

UtilityHttp::~UtilityHttp()
{
}

void UtilityHttp::RequestJSONWeather(const std::string& locCity)
{
	// Target Weather API - Simulate the weather sensor
	http_client client(U("http://api.openweathermap.org"));
	uri_builder builder(U("/data/2.5/forecast"));
	// Location of the weather
	builder.append_query(U("q"), U("Toulouse,fr"));
	builder.append_query(U("appid"), U("371dfa0e71b16f1a8bb94afc2a8ee489"));
	builder.append_query(U("units"), U("metric"));
	builder.append_query(U("mode"), U("json"));

	http_response response = client.request(methods::GET, builder.to_string()).get();
	web::json::value forecastJson = response.extract_json(true).get();
	web::json::value forecastListJson = forecastJson.at(U("list"));
	web::json::value forecastDayJson = forecastListJson[0];
	web::json::value mainJson = forecastDayJson.at(U("main"));
	web::json::value currentTemperatureJson = mainJson.at(U("temp"));
	this->_currtemp = 0;
	if (!currentTemperatureJson.is_null())
	{
		this->_currtemp = currentTemperatureJson.as_double();
	}
	std::cout << "Current Temperature " << this->_currtemp << std::endl;


	web::json::value weatherJson = forecastDayJson.at(U("clouds"));
	web::json::value cloudJson = weatherJson.at(U("all"));
	this->_visibility = 0;
	if (!cloudJson.is_null())
	{
		this->_visibility = cloudJson.as_double();
	}
	std::cout << "Weather Description " << this->_visibility << std::endl;

}

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

double const UtilityHttp::getTemp() const
{
	return this->_currtemp;
}


double const UtilityHttp::getLum() const
{
	return this->_visibility;
}

pplx::task<void> UtilityHttp::RequestJSONValueAsync()
{
	http_client client(L"localhost:8080");
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