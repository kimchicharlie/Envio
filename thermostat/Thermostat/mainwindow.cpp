#include "mainwindow.h"
#include <QAbstractSocket>
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),

    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
//    this->setStyleSheet("./style/thermostatStyleSheet.");

    //setup network part
    _netMan = new QNetworkAccessManager(this);
    _netMan->setNetworkAccessible(QNetworkAccessManager::Accessible);
    _netMan->connectToHost(*_hostName, _hostPort);
    _netRep = Q_NULLPTR;

    QHttpPart textPart = QHttpPart();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    textPart.setBody("5717462479f34d720f0248b6");

    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);
    _toSend = true;

    _curRoom = new RoomState();
    // function which will be called every seconds to update de time label and the room's values
    _timer = new QTimer(this);
    connect(_timer, SIGNAL(timeout()), this, SLOT(updateVals()));
    _timer->start(1000);
/*
    // get the logo and display it

     _logo = new QPixmap("./2017_logo_envio2.png");
    _logo->scaled(50, 50, Qt::KeepAspectRatio);
    this->ui->LogoLabel->setPixmap(*_logo);
*/

    //get the label to display the state and fill them
    _tempLbl = this->ui->TempLabel;
    _lumLbl = this->ui->LumLabel;
    _opacLbl = this->ui->OpacLabel;

    _tempBtn = this->ui->TempEditButton;
    _lumBtn = this->ui->LumEditButton;
    _opacBtn = this->ui->OpacEditButton;

    this->_date = new QDateTime();
    this->updateVals();

    // temperature window and associated signals/slots
    _tempWin = new TemperatureWindow(this, _curRoom->getTempDispVal(), _curRoom->getTemp());
    connect(_tempWin, SIGNAL(tempChange(double)),
            this, SLOT(tempValChanged(double)));
    connect(_tempWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    connect(_tempWin, SIGNAL(goToLum()),
            this, SLOT(on_LumEditButton_clicked()));
    connect(_tempWin, SIGNAL(goToOpac()),
            this, SLOT(on_OpacEditButton_clicked()));

    // lum window and associated signals/slots
    _lumWin = new LumWindow(this);
    _lumWin->setSliderVal(_curRoom->getLum());
    connect(_lumWin, SIGNAL(lumChange(int)),
            this, SLOT(lumValChanged(int)));
    connect(_lumWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    connect(_lumWin, SIGNAL(goToTemp()),
            this, SLOT(on_TempEditButton_clicked()));
    connect(_lumWin, SIGNAL(goToOpac()),
            this, SLOT(on_OpacEditButton_clicked()));


    // opac window and associated signals/slots
    _opacWin = new OpacWindow(this);
    _opacWin->setSliderVal(_curRoom->getOpac());
    connect(_opacWin, SIGNAL(opacChange(int)),
            this, SLOT(opacValChanged(int)));
    connect(_opacWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    connect(_opacWin, SIGNAL(goToTemp()),
            this, SLOT(on_TempEditButton_clicked()));
    connect(_opacWin, SIGNAL(goToLum()),
            this, SLOT(on_LumEditButton_clicked()));

    // planning window and associated signals/slots
    _planWin = new PlanningWindow(this);
    connect(_planWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));

    // config window and associated signals/slots
    _configWin = new ConfigWindow(this);

    connect(_configWin, SIGNAL(TempDispChange(int)),
            this, SLOT(tempDispChanged(int)));
    connect(_configWin, SIGNAL(HourDispChange(int)),
            this, SLOT(hourDispChanged(int)));
    connect(_configWin, SIGNAL(changeCurRoom(RoomState*)),
            this, SLOT(changeCurRoom(RoomState*)));
    connect(_configWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
    _curRoom = Q_NULLPTR;
}

MainWindow::~MainWindow()
{
    delete _logo;
    delete _date;
    delete _tempLbl;
    delete _lumLbl;
    delete _opacLbl;
    delete _tempBtn;
    delete _lumBtn;
    delete _opacBtn;
    delete _tempWin;
    delete _lumWin;
    delete _opacWin;
    delete _planWin;
    delete _configWin;
    delete _timer;
    delete ui;
}

TemperatureWindow* MainWindow::getTempWin() {
    return (_tempWin);
}

LumWindow* MainWindow::getLumWin() {
    return (_lumWin);
}


OpacWindow* MainWindow::getOpacWin() {
    return (_opacWin);
}


PlanningWindow* MainWindow::getPlanWin() {
    return (_planWin);
}

ConfigWindow* MainWindow::getConfigWin() {
    return (_configWin);
}


void MainWindow::on_TempEditButton_clicked()
{
    // change window to TemperatureWindow
    _toSend = false;
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_tempWin->show();
}

void MainWindow::on_LumEditButton_clicked()
{
    // change window to TemperatureWindow
    _toSend = false;
    this->hide();
    _tempWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_lumWin->show();
}

void MainWindow::on_OpacEditButton_clicked()
{
    _toSend = false;
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_opacWin->show();
}

void MainWindow::on_PlanningEditButton_clicked()
{
    _toSend = false;
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _configWin->hide();
    _planWin->show();
}

void MainWindow::on_ConfigEditButton_clicked()
{
    _toSend = false;
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->show();
}



void    MainWindow::updateVals() {
    // send the network request if window visible and other reply recieved
    if (_toSend == true)
        roomValFromAPI();
//    static int i = 0;
    if (_curRoom != Q_NULLPTR) {
        if (_curRoom->getHourDisp() == 2)
            this->ui->DateLabel->setText(QDate::currentDate().toString() + "  " + QTime::currentTime().toString("hh:mm:ss"));
        else
            this->ui->DateLabel->setText(QDate::currentDate().toString() + "  " + QTime::currentTime().toString("h:m:s AP"));
    }
    else
        this->ui->DateLabel->setText(QDate::currentDate().toString() + "  " + QTime::currentTime().toString("hh:mm:ss"));
}

void    MainWindow::roomValFromAPI() {
    QAbstractSocket *socket = new QAbstractSocket(QAbstractSocket::TcpSocket, this);
    socket->connectToHost("127.0.0.1", 1337);
     if (!socket->waitForConnected(1000))
         return;
     delete socket;

     _toSend = false;
    QNetworkRequest netReq = QNetworkRequest(QUrl("http://127.0.0.1:1337/api/getRoom?api_key=f8c5e1xx5f48e56s4x8"));
    QHttpPart textPart = QHttpPart();
    QByteArray tmp;
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    if (_curRoom->getID().compare("-1") == 0)
        textPart.setBody("5717462479f34d720f0248b6");
    else {
        tmp.append(_curRoom->getID());
        textPart.setBody(tmp);
    }

    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);

    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(finished()), this, SLOT(httpFinished()));
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
    connect(_netRep, SIGNAL(readyRead()), this, SLOT(httpReadyRead()));
}

void MainWindow::changeCurRoom(RoomState* room) {
    _curRoom = room;
    _planWin->setRoomId(_curRoom->getID());
    roomValFromAPI();
}

void    MainWindow::backToMain() {
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->show();
    _toSend = true;
}

void MainWindow::tempValChanged(double newVal) {
    _curRoom->setTemp(newVal);
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + _curRoom->getTempDisp());

    QAbstractSocket *socket = new QAbstractSocket(QAbstractSocket::TcpSocket, this);
    socket->connectToHost("127.0.0.1", 1337);
     if (!socket->waitForConnected(1000))
         return;
     delete socket;
    //send new temp to API
    QNetworkRequest netReq = QNetworkRequest(QUrl("http://127.0.0.1:1337/api/changeTemperature?api_key=f8c5e1xx5f48e56s4x8"));

    QByteArray tmp;
    QHttpPart textPart = QHttpPart();
    QHttpMultiPart *multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    tmp.append(_curRoom->getID());
    textPart.setBody(tmp);
    multiPart->append(textPart);
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"temperature\""));
    tmp.append(QString::number(newVal));
    textPart.setBody(tmp);
    multiPart->append(textPart);
    _netMan->post(netReq, multiPart);

/*    if (_curRoom->gettempDispVal() == 1)
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    else
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
*/
}

void MainWindow::lumValChanged(int newVal) {
    _curRoom->setLum(newVal);
    _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
    QAbstractSocket *socket = new QAbstractSocket(QAbstractSocket::TcpSocket, this);
    socket->connectToHost("127.0.0.1", 1337);
     if (!socket->waitForConnected(1000))
         return;
     delete socket;

     //send new temp to API
    QNetworkRequest netReq = QNetworkRequest(QUrl("http://127.0.0.1:1337/api/changeLight?api_key=f8c5e1xx5f48e56s4x8"));

    QByteArray tmp;
    QHttpPart textPart = QHttpPart();
    QHttpMultiPart *multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    tmp.append(_curRoom->getID());
    textPart.setBody(tmp);
    multiPart->append(textPart);
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"light\""));
    tmp.append(QString::number(newVal));
    textPart.setBody(tmp);
    multiPart->append(textPart);
    _netMan->post(netReq, multiPart);

}

void MainWindow::opacValChanged(int newVal) {
    _curRoom->setOpac(newVal);
    _opacLbl->setText(QString::number(_curRoom->getOpac()) + "%");

    QAbstractSocket *socket = new QAbstractSocket(QAbstractSocket::TcpSocket, this);
    socket->connectToHost("127.0.0.1", 1337);
     if (!socket->waitForConnected(1000))
         return;
     delete socket;

     //send new temp to API
}

void MainWindow::tempDispChanged(int val) {
    _curRoom->setTempDisp(val);
    if (val == 1)
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    else
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
    _tempWin->setTempDisp(val);
    _tempWin->setSliderVal(_curRoom->getTemp());
}

void MainWindow::hourDispChanged(int val) {
    _curRoom->setHourDisp(val);
    updateVals();
}

void MainWindow::httpFinished()
{
    if (_netRep->error()) {
            _netRep->deleteLater();
            _netRep = Q_NULLPTR;
            return;
        }

    QJsonDocument doc = QJsonDocument();
    doc = doc.fromJson(_netRep->readAll());
    doc.Indented;
    _reply = doc.toJson();
    if (_netRep->isFinished())
        _toSend = true;
    parseRep();

    QVariant redirectionTarget  = _netRep->attribute(QNetworkRequest::RedirectionTargetAttribute);

    if(!redirectionTarget.isNull()) {
        const QUrl newUrl = _url.resolved(redirectionTarget.toUrl());
        _url = newUrl;
        QNetworkRequest request(_url);
        _netRep = _netMan->post(request, _multiPart);
    }
}

void    MainWindow::parseRep() {
        std::map<std::string, std::string> m;
        std::istringstream resp(_reply.toStdString().c_str());
        std::string header;
        std::string::size_type index;
        // fill the map with the API reply
        while (std::getline(resp, header) && header != "\r") {
            header.erase(std::remove(header.end() - 1, header.end(), ','), header.end());
            header.erase(std::remove(header.begin(), header.end(), '\"'), header.end());
            index = header.find(':', 0);
            if (index != std::string::npos) {
                m.insert(std::make_pair(
                    boost::algorithm::trim_copy(header.substr(0, index)),
                    boost::algorithm::trim_copy(header.substr(index + 1))
                ));
            }
        }
        // if there is no room configure, configure it with the API reply
        if (_curRoom == Q_NULLPTR) {
            std::string name = m.at("name");
            std::string id = m.at("_id");
            _curRoom = new RoomState(QString::fromStdString(name), QString::fromStdString(id));
            _planWin->setRoomId(_curRoom->getID());
        }
        _curRoom->setTemp(std::stoi(m.at("temperature")));
        _curRoom->setLum(std::stoi(m.at("light")));
//        _curRoom->setOpac(std::stoi(m.at("opacification")));
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + _curRoom->getTempDisp());
        if (_curRoom->getTempDispVal() == 1)
            _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
        else
            _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
        _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
        _opacLbl->setText(QString::number(_curRoom->getOpac()) + "%");

        _tempWin->setTempDisp(_curRoom->getTempDispVal());
        _tempWin->setSliderVal(_curRoom->getTemp());
        _lumWin->setSliderVal(_curRoom->getLum());
        _opacWin->setSliderVal(_curRoom->getOpac());
}

void MainWindow::httpFailed(QNetworkReply::NetworkError err) {
    qDebug() << "Error: " << err;
}

void MainWindow::httpReadyRead()
{
    qDebug() << "Reply finish: " << _netRep->isFinished();
}
