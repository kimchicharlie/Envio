#pragma once
// Project created on 06/04/2016 Ilyes Abd-Lillah
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] OK
//             Unit test  [ ] None
//             Release    [ ] None

// Includes //

#include <chrono>
#include <cstdlib>
#include <iostream>
#include <string>
#include <sstream>
#include <fstream>
#include <vector>
#include <map>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Window.hpp>
#include <SFML/Audio.hpp>
#include <math.h>
#include <iomanip>
#include <string.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdlib.h>
#include <tchar.h>
#include <cpprest\http_client.h>
#include <cpprest\json.h>
#include <Regex>
#include <cpprest\http_listener.h>
#include <cpprest\astreambuf.h>
#include <cpprest/uri.h>
#include <boost\thread.hpp>
#include <boost/algorithm/string.hpp>
#include <boost/thread.hpp>
#include "UtilityHttp.h"

#pragma comment (lib, "Ws2_32.lib")
#pragma comment (lib, "Mswsock.lib")
#pragma comment (lib, "AdvApi32.lib")

// NameSpaces //
using namespace web;
using namespace web::http;
using namespace web::http::client;

// Defines //
#ifdef _UTF16_STRINGS
// On Windows, all strings are wide
#define uclog std::wclog
#else
// On POSIX platforms, all strings are narrow
#define uclog std::clog
#endif // endif _UTF16_STRING

//		msg format
#define DELIMITERMSG	(3)
//		buffer socket size
#define DEFAULT_PORT    (4242)
#define WIN32_LEAN_AND_MEAN
#define MAXSIZE			(10000)
//		window size
#define LENWIN			(1920)
#define HEIWIN			(1080)
//		window name
#define WINDOWNAME		("[EIP - 2017] > Envio Visualization 1.3")
// avoid multiple input
#define INPUTDELAY		(0.10)
// sfml config
#define BPP				(32)
#define REFRESHDELAY	(1.f)

// sfml path ressources //
#define FONTPATH		("Fonts/gotham.ttf")
#define PATHASSETS		("Assets/asset")
#define NBELEM			(8)

// Weather Location		(Simulate the weather sensor)
#define CITYWEATHER		("Toulouse,fr")

// Enums //
enum e_assets {
	BACKGROUND,
	LIGHTROOM,
	WINDOWS,
	TITLE,
	STATS,
	REALMD, 
	TESTMD,
	NETWORK
};

enum e_stats{
	TEMPINT,
	TEMPEXT,
	LUM,
	OPACITY
};


// Classes //

class CoreGraphical
{
public:
	CoreGraphical();
	CoreGraphical(const char * ip, const char * port);
	virtual ~CoreGraphical();

	//// Init and load sprites for the lib.
	virtual void initSfmlSprite(int const & elem, std::string const & path);
	void  Update(sf::Event const &);
	pplx::task<void> RequestJSONValueAsync();
	void respond(const http_request & request, const status_code & status, const json::value & response);
	//int const HttpServerListener();
	void getJsonResponse(std::wstring s);
	void HttpServerListener();
	void SocketUpdate(std::wstring resp);
	void SocketUpdate();
	float getTime() const;
	void  Runtime();
	void  LaunchSim();
	
	////  Drawing functions.
	void  DrawElemInitials(void);
	void  DrawEnvironnement(void);
	void CoreGraphical::DrawTextStats(std::string tempInt, std::string tempExt, std::string LuxExt);
	void  DrawSampleText(std::string const &, double const &, double const &, int const &, sf::Text &);
	void  DrawElem(double const &, double const &, sf::Sprite *);
	void  drawHud();
	void  updateServerValue();
	std::string atoD(double const &);
	void  drawText(void(*ptr)(double, std::string, double, double, int, sf::Text &));
	//// Event manager.
	void  manageEvent(sf::Event const&);
	void  initSocketModule();
private:
	sf::Clock								_time;
	sf::Clock								_timeout;
	sf::Time								_elap;
	sf::Time								_elaptimeout;
	sf::Font								*_font;
	sf::RenderWindow						*_window;

	sf::Text								_stats;
	sf::Text								_symbolConnex;
	// Assets containers 
	std::vector<sf::Font *>					_fonts;
	std::vector<sf::Sprite*>				_assets;
	std::vector<sf::Sprite*>				_hud;
	std::vector<sf::Texture*>				_texture;
	
	// Values 
	bool									_testMode;
	double									_initOp;
	bool									_inited;
	double									_opPercent;
	std::vector<double>						_valuesHUD;
	std::vector<int>						_scaleOpacity;
	std::string								_arr[4];
	std::map<std::string, std::string>		_jsonResponds;
	std::string								_bodyMsg;

	// UtilityHttpRequest
	UtilityHttp*							_httpU;

	// Text HUD (stats)
	sf::Text								_textStats;

	// [>>|] Connexion Information
	std::string _ip;
	std::string _port;

	// [>>|] Sockets
	WSADATA		_WSAData;
	SOCKET		_sock;
	SOCKADDR_IN _sin;

	// [>>|] Sockets receive
	std::string _strSocket;

	// Swagness [>>|]
	double _sOpt;
};
