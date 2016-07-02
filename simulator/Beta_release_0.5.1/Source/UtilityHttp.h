// Project created on 14/06/2016 Ilyes Abd-Lillah
// [Breif] : Header of UtilityHttp.cpp, the file which contains all the json http methods in C++ for the Envio' software visualizator.
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] OK
//             Unit test  [ ] None
//             Release    [ ] None

#ifndef __UTILITYHTTP_H_
#define __UTILITYHTTP_H_

// Defines //
#ifdef _UTF16_STRINGS
// On Windows, all strings are wide
#define uclog std::wclog
#else
// On POSIX platforms, all strings are narrow
#define uclog std::clog
#endif // endif _UTF16_STRING

// Includes 
#include <iostream>
#include <iomanip>
#include <string>
#include <chrono>
#include <ctime>
#include <sstream>
#include <map>
#include <boost/algorithm/string.hpp>
#include <cpprest\astreambuf.h>
#include <cpprest/uri.h>
#include <cpprest\http_listener.h>
#include <cpprest\http_client.h>
#include <cpprest\json.h>

// NameSpaces //
using namespace web;
using namespace web::http;
using namespace web::http::client;

// API WEATHER Rest Key		(http://openweathermap.org/) //
#define APIWEATHERKEY		U("371dfa0e71b16f1a8bb94afc2a8ee489")

// Functions //
void Respond(const http_request& request, const status_code& status, const json::value& response);

// Classes //

class UtilityHttp {
public:
	UtilityHttp();
	virtual ~UtilityHttp();

public:
	void RequestJSONWeather(const std::string& locCity);
	pplx::task<void> UtilityHttp::RequestJSONValueAsync();
	double const UtilityHttp::getTemp() const;
	double const UtilityHttp::getLum() const;

private:
	double				_currtemp;
	double				_visibility;
};


#endif // !__UTILITYHTTP_H_