// Project created on 01/04/2016 by Ilyes Abd-Lillah
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] OK
//             Unit test  [x] OK
//             Release    [x] OK

#include "CoreGraphical.h"
#include "Exception.hpp"
#include <algorithm>

// Global Value for catching the callback inside the Async Request
std::string bodyMsg;
std::map<std::string, std::string> cxtBody;

int main(int ac, char **av)
{
	try
	{
		CoreGraphical *graphics = new CoreGraphical();	
		graphics->LaunchSim();
	}
	catch (std::exception *e)
	{
		std::cerr << "Exception:" << e->what() << std::endl;
		return (EXIT_FAILURE);
	}
	return (EXIT_SUCCESS);
}

CoreGraphical::CoreGraphical()
{
	this->_httpU = new UtilityHttp();
	this->_window = new sf::RenderWindow();
	this->initSfmlSprite(NBELEM, PATHASSETS);
	this->_inited = false;
	this->_testMode = false;

	// Inits Values
	this->_valuesHUD.push_back(24);
	this->_valuesHUD.push_back(30);
	this->_valuesHUD.push_back(704);
	this->_valuesHUD.push_back(0);

	// Glass Scale Values
	this->_scaleOpacity.push_back(5 * 2.55);
	this->_scaleOpacity.push_back(27 * 2.55);
	this->_scaleOpacity.push_back(48 * 2.55);
	this->_scaleOpacity.push_back(67 * 2.55);
	this->_scaleOpacity.push_back(94 * 2.55);
	// Inits Values Connexion
	this->_ip = "/ModifyValue";
	this->_port = "8080";
	// std::cout << "ip : " << this->_ip << " " << "port : " << this->_port << std::endl;
	// this->initSocketModule();
	this->_sOpt = 0;
}

CoreGraphical::~CoreGraphical()
{
	closesocket(this->_sock);
	WSACleanup();
	delete this->_httpU;
}

void CoreGraphical::initSocketModule()
{
	unsigned long ulMode = 1;
	WSAStartup(MAKEWORD(2, 2), &this->_WSAData);
	
	std::stringstream ssp;
	ssp.str("");

	// Initialization of the socket
	this->_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	
	struct hostent *host;


	// Socket settings
	this->_sin.sin_port = htons(atoi(this->_port.c_str()));
	this->_sin.sin_family = AF_INET;
	this->_sin.sin_addr.s_addr = inet_addr(this->_ip.c_str());

	/*if (bind(this->_sock, (SOCKADDR *)&this->_sin, sizeof(this->_sin)) != 0)
		std::cerr << "[Network client] : Bind Error." << std::endl;*/
	if (connect(this->_sock, (SOCKADDR *)&this->_sin, sizeof(this->_sin)) != 0)
		std::cout << "[Network client] : Socket Error, could not connect" << std::endl;
	std::cout << "[Network client] : Init.socket.cli finished." << std::endl;
}

void CoreGraphical::initSfmlSprite(int const &elem, std::string const &path)
{
	sf::Texture *img;
	sf::Sprite	*sprite;
	static double it = 0;
	
	if (!it)
	{
		sf::Font *font = new sf::Font();

		for (size_t i = 0; i < 2; i++)
		{
			if (!font->loadFromFile(FONTPATH))
				throw new Exception("[EnvioGlassSimulator 1.3] >> Error loading Font from folder font !");
			this->_fonts.push_back(font);
		}
	}
	for (size_t i = 0; i < static_cast<unsigned int>(elem); i++)
	{

		std::stringstream ss;

		ss.str("");
		ss << i + 1;

		img = new sf::Texture();
		sprite = new sf::Sprite();
		if (!img->loadFromFile(path + ss.str() + ".png", sf::IntRect(0, 0, LENWIN, HEIWIN * 2)))
			throw (new Exception("Error >> Loading image failure"));
		
		this->_assets.push_back(sprite);
		this->_texture.push_back(img);
		this->_assets[static_cast<unsigned int>(it++)]->setTexture(*this->_texture[i]);
		system("CLS");
		std::cout << "[EnvioGlassSimulator 1.3] : Loading Unit : " + path + ss.str() + ".png \n[Loading] >>> [" << (it / NBELEM) * 100 << " %]" << std::setprecision(5) << std::endl;

	}
	this->_texture.clear();
}

void CoreGraphical::LaunchSim(void)
{
	// Thread the network Http server part
	boost::thread* netThr = new boost::thread(boost::bind(&CoreGraphical::HttpServerListener, this));
	this->_httpU->RequestJSONWeather(CITYWEATHER);
	this->Runtime();
	delete netThr;
}

void CoreGraphical::Runtime(void)
{
   sf::Event eve;
   this->_window->create(sf::VideoMode(LENWIN, HEIWIN), WINDOWNAME, sf::Style::Close);
   this->_window->setMouseCursorVisible(false);

    while (this->_window->isOpen())
	{
		while (this->_window->pollEvent(eve))
		{
			if ((eve.type == sf::Event::Closed) && eve.type != sf::Event::MouseMoved)
			{
				this->_window->close();
			}
		}
		this->Update(eve);
	}
}

void CoreGraphical::manageEvent(sf::Event const & eve)
{
	static int selector = 0;
	static int save;
	this->_elap = this->_time.getElapsedTime();
	

	// Event triggers
	if (this->_elap.asSeconds() > INPUTDELAY)
	{
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Tab))
		{
			this->_testMode = !this->_testMode;
			this->_time.restart();
		}
		else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Escape))
		{
			this->_window->close();
			this->_time.restart();
		}
		else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
		{
			if (this->_testMode)
			{
				save = 255 - this->_scaleOpacity[(selector++)];
				selector = (selector > 4) ? 0 : selector;
			}
			this->_time.restart();
		}
		else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left))
		{
			if (this->_testMode)
			{
				save = 255 - this->_scaleOpacity[(selector--)];
				selector = (selector < 0) ? 4 : selector;
			}
			this->_time.restart();
		}
		// Animation of the opacity
		if (_testMode)
		{
			if (this->_initOp < save)
				this->_initOp++;
			else if (this->_initOp > save)
				this->_initOp--;
		}
	}
}

void CoreGraphical::drawHud()
{
	std::stringstream ss;

	this->DrawElem(0, -50, this->_assets[TITLE]);
	this->DrawElem(1320, -615, this->_assets[STATS]);

	// Put it in a member method
	ss << 100 - round(this->_opPercent) << std::setprecision(0);

	// Op Drawing
	this->_stats.setFont(*this->_fonts[0]);
	this->_stats.setString(ss.str() + "%");
	this->_stats.setCharacterSize(84);
	if (_opPercent == 0)
		this->_stats.setCharacterSize(67);
	this->_stats.setPosition(1725, 167);
	this->_window->draw(this->_stats);

	// Toggle RealTime / Simulation Mode

	// Connexion Elems


	if (this->_testMode)
	{
		this->_assets[TESTMD]->setPosition(0, 757);
		this->_window->draw(*this->_assets[TESTMD]);
	}
	else
	{
		this->_assets[NETWORK]->setPosition(0, 100);
		this->_assets[REALMD]->setPosition(0, 757);
		this->_window->draw(*this->_assets[REALMD]);
		this->_window->draw(*this->_assets[NETWORK]);
	}

	// Other stats With json class (thx Gaetan :) )
	
	this->DrawSampleText(this->atoD(this->_valuesHUD[TEMPINT]) + "°", 1600, 340, 46, this->_textStats);
	this->DrawSampleText(this->atoD(this->_valuesHUD[TEMPEXT]) + "°", 1736, 340, 46, this->_textStats);
	this->DrawSampleText(this->atoD(this->_valuesHUD[LUM]), 1680, 450, 58, this->_textStats);
}

std::string CoreGraphical::atoD(double const & conv)
{
	std::stringstream ss;

	ss.str("");
	ss << conv;
	return (ss.str());
}

void CoreGraphical::DrawSampleText(std::string const &t, double const &x, double const &y, int const &size, sf::Text & s)
{
	s.setString(t);
	s.setFont(*this->_fonts[0]);
	s.setCharacterSize(size);
    s.setPosition(static_cast<float>(x), static_cast<float>(y));
	this->_window->draw(s);
}

void CoreGraphical::DrawElemInitials(void)
{
	this->DrawElem(0, 0, this->_assets[BACKGROUND]);
}

void CoreGraphical::DrawEnvironnement(void)
{	
	this->DrawElemInitials();

	if (this->_initOp == 255)
		_inited = true;
	if (!_inited && this->_initOp < 256)
		this->_initOp++;
	if (!this->_initOp)
		this->_inited = true;
	this->_opPercent = (this->_initOp / 255) * 100;
	// Hack ///////////////////////////////////////////////////////////////////
	if (this->_initOp > 255)
		this->_initOp = 255;
	if (this->_initOp < 0)
		this->_initOp = 0;
	// Dynamic Entities /////////////////////////////////////////////////////////////
	// Teinted Windows 
	this->_assets[WINDOWS]->setColor(sf::Color(0, 0, 0, 255 - static_cast<sf::Uint8>(this->_initOp)));
	this->DrawElem(0, 0, this->_assets[WINDOWS]);
	// Light of the room
	if (this->_initOp > 55)
		this->_assets[LIGHTROOM]->setColor(sf::Color(0, 0, 0, 255 - static_cast<int>(this->_initOp)));
	else
		this->_assets[LIGHTROOM]->setColor(sf::Color(0, 0, 0, 200));
	this->DrawElem(0, 0, this->_assets[LIGHTROOM]);

	// HUD Call 
	this->drawHud();
}

void CoreGraphical::DrawElem(double const &xPos, double const &yPos, sf::Sprite *s)
{
	s->setPosition(sf::Vector2f(static_cast<float>(xPos), static_cast<float>(yPos)));
	this->_window->draw(*s);
}

void CoreGraphical::Update(sf::Event const &eve)
{
	int t = (int)this->_time.getElapsedTime().asMilliseconds();
	this->_window->clear();
	this->updateServerValue();
	// Draw Functions ///////////
	this->DrawEnvironnement();
	// Socket listen [Depreciated]
	this->SocketUpdate();
	//HttpServerListener();
	// Get JSON data from server !
	// Here 5 sec of update (t = runtime in ms, t / 10 = runtime in 100s of seconds, t / 10 % 200 = each 2.00 sec, refresh the request)
	
	if (t / 10 % 500 == 0)
		this->_httpU->RequestJSONWeather(CITYWEATHER);

	/*{
		// JSON response
		RequestJSONValueAsync();
		//std::cout << jsonResponds << std::endl;
		// Regex
		
		std::regex rgx = std::regex("[^a-zA-Z0-9]");
		std::regex reg("[^\\w]+");
		std::string sjr;
		sjr = jsonResponds;
		sjr = std::regex_replace(sjr, rgx, " ");
		//std::cout << jsonResponds << std::endl;

		// Convert to array

		int i = 0;
		std::stringstream ssin(sjr);
		while (ssin.good() && i < 4) {
			ssin >> this->_arr[i];
			++i;
		}
		for (i = 0; i < 4; i++) {
			std::cout << this->_arr[i] << std::endl;
		}
	}*/
	/////////////////////////////
	// Display & events functions 
	this->_window->display();
	this->manageEvent(eve);

}


void CoreGraphical::getJsonResponse(std::wstring s)
{
	std::wcout << s << std::endl;
}

void CoreGraphical::HttpServerListener()
{
	utility::string_t address = U("http://localhost:");
	address.append(U("8080"));

	web::uri_builder uri(address);
	uri.append_path(U("ModifyValue"));

	auto addr = uri.to_uri().to_string();

	web::http::experimental::listener::http_listener listener(addr);

	listener.support(methods::POST, [](http_request req) {
		auto http_get_vars = uri::split_query(req.request_uri().query());
		auto found_name = http_get_vars.find(U("/ModifyValue"));

		std::wstring s = req.extract_string().get();
		std::string ss(s.begin(), s.end());
		bodyMsg = ss;
		std::map<std::string, std::string> m;
		ss.erase(0, 1);
		ss.erase(ss.size() - 1);
		std::replace(ss.begin(), ss.end(), ',', '\n');
		std::istringstream resp(ss.c_str());
		std::string header;
		std::string::size_type index;
		while (std::getline(resp, header) && header != "\r") {
			index = header.find(':', 0);
			if (index != std::string::npos) {
				m.insert(std::make_pair(
					boost::algorithm::trim_copy(header.substr(0, index)),
					boost::algorithm::trim_copy(header.substr(index + 1))
				));
			}
		}
		std::cout << "\n" << "Body of the request received." << std::endl;
		for (auto& kv : m) {
			std::cout << "KEY: `" << kv.first << "`, VALUE: `" << kv.second << '`' << std::endl;
		}
		if (m.find("\"airConditioning\"") == m.end() && m.find("\"window\"") == m.end())
		{
			Respond(req, status_codes::BadRequest, json::value::string(U("Bad request received form POST")));
			return;
		}
		cxtBody = m;
		Respond(req, status_codes::OK, json::value::string(U("Request received form POST")));
	});
	listener
		.open()
		.then([]() {std::cout << "Listening on http://localhost:8080/ModifyValue...\n"; })
		.wait();

	std::string line;
	std::getline(std::cin, line);
	listener.close().wait();
}

void CoreGraphical::SocketUpdate()
{
	this->_elaptimeout = this->_timeout.getElapsedTime();
	
	std::stringstream ss;
	int status;

	if (!_testMode)
	{
		// std::wstring info = APIADDRESS;
		// std::string s(info.begin(), info.end());
		this->DrawSampleText("[Route]:\t" + this->_ip, 15, 170, 15, this->_stats);
		// info.str("");
		// info << this->_port;
		this->DrawSampleText("[Port d'Ecoute]:\t"+ this->_port, 15, 190, 15, this->_stats);
		int i;

		/*// Receving socket message (Local : 127.0.0.1)
		// 
		i = recv(this->_sock, buffer, sizeof(buffer), 0);
		if (i != -1)
		{
			buffer[i - 2] = '\0';
			this->_strSocket = "";
			
			for (int it = 0; it < sizeof(buffer) && buffer[it]; it++)
				this->_strSocket += buffer[it];
		}
		
		// Test Dev
		*/
		static double d;
		static int m;
		ss << std::fixed << std::setprecision(0) << std::setw(2) << std::setfill('0') << static_cast<int>(this->_time.getElapsedTime().asMilliseconds() / 10) % 100;
		ss >> d;
		ss << static_cast<int>(d) % 60;
		m = static_cast<int>(static_cast<int>((this->_time.getElapsedTime().asSeconds())) % 60);
		std::stringstream ss1, ss2; int h;
		ss1 << std::setw(2) << std::setfill('0') << m;
		h = (float)(this->_time.getElapsedTime().asSeconds() / 60);
		ss2 << std::setw(2) << std::setfill('0') << h;
		this->DrawSampleText(ss2.str() + ":" + ss1.str() + "'" + ss.str() + "\"", 58, 225, 50, this->_stats);
		this->DrawSampleText("[Active Time]", 15, 210, 15, this->_stats);
		

		this->DrawSampleText("[Contenu de la requete]: \n" + bodyMsg, 10, 300, 24, this->_stats);
			
		/*if (this->_elaptimeout.asSeconds() > 20.0)
		{
			sf::RectangleShape rectangle(sf::Vector2f(750, 500));
			rectangle.setSize(sf::Vector2f(700, 50));
			rectangle.setFillColor(sf::Color(0, 0, 0, 145));
			rectangle.setPosition(sf::Vector2f(725, 500));
			this->_window->draw(rectangle);
			 
			// Timer timeout message
			double tO = this->_elaptimeout.asSeconds();
			ss << std::fixed << std::setprecision(0) << tO;
			this->DrawSampleText("[Connexion Timeout] : since " + ss2.str() + " min " + ss1.str() + "" , 750, 500, 33, this->_stats);
		}*/
	}
	// Clear message
	ss.str("");
}

void CoreGraphical::updateServerValue()
{
	// Check if the value is correctely sended
	if (cxtBody.find("\"airConditioning\"") != cxtBody.end() && (int)this->_elap.asMilliseconds() % 300 == 0)
	{
		if (this->_valuesHUD[0] < atoi(cxtBody["\"airConditioning\""].c_str()))
			this->_valuesHUD[0] += 1;
		if (this->_valuesHUD[0] > atoi(cxtBody["\"airConditioning\""].c_str()))
			this->_valuesHUD[0] -= 1;
	}
	if (cxtBody.find("\"window\"") != cxtBody.end() && (int)this->_elap.asMilliseconds() % 10 == 0)
	{
		if (this->_initOp < 255 - atoi(cxtBody["\"window\""].c_str()) * 2.55)
			this->_initOp++;
		if (this->_initOp > 255 - atoi(cxtBody["\"window\""].c_str()) * 2.55)
			this->_initOp--;
	}
	// To develop
	this->_valuesHUD[1] = this->_httpU->getTemp();
	this->_valuesHUD[2] = (0.8 * (1 - (this->_httpU->getLum() / 100)) + 0.2) * 5000;

	// Animation
	if (!_testMode && this->_inited)
	{
		if (this->_initOp < 255 - this->_valuesHUD[this->_valuesHUD.size() - 1] * 2.55)
			this->_initOp;
		else
			this->_initOp--;
	}
}