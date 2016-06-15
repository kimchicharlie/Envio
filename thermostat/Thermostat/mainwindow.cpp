#include "mainwindow.h"
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
//    connect(_netMan, SIGNAL(finished(QNetworkReply*)), this, SLOT(httpFinished(QNetworkReply*)));

    QHttpPart textPart = QHttpPart();
    /*
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"organisation\""));
    textPart.setBody("Envio");
    */

    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    textPart.setBody("5717462479f34d720f0248b6");

    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);


/*
    _netRep = manager->get(QNetworkRequest(QUrl("http://qt-project.org")));
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
    qDebug() << _netRep->operation();
*/

    _curRoom = new RoomState();
    // function which will be called every seconds to update de time label
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
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + _curRoom->getTempDisp());
    if (_curRoom->getTempDispVal() == 1)
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    else
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
    _lumLbl = this->ui->LumLabel;
    _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
    _opacLbl = this->ui->OpacLabel;
    _opacLbl->setText(QString::number(_curRoom->getOpac()) + "%");

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

    connect(_configWin, SIGNAL(returnToMain()),
            this, SLOT(backToMain()));
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
    this->hide();
    _tempWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_lumWin->show();
}

void MainWindow::on_OpacEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->_opacWin->show();
}

void MainWindow::on_PlanningEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _configWin->hide();
    _planWin->show();
}

void MainWindow::on_ConfigEditButton_clicked()
{
    this->hide();
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->show();
}



void    MainWindow::updateVals() {
    if (_curRoom->getHourDisp() == 2)
        this->ui->DateLabel->setText(QDate::currentDate().toString() + "  " + QTime::currentTime().toString("hh:mm:ss"));
    else
        this->ui->DateLabel->setText(QDate::currentDate().toString() + "  " + QTime::currentTime().toString("h:m:s AP"));
    if (_netRep == Q_NULLPTR || _netRep->isFinished())
        roomValFromAPI();
}

void    MainWindow::roomValFromAPI() {
    QNetworkRequest netReq = QNetworkRequest(QUrl("http://127.0.0.1:1337/api/getRoom?api_key=f8c5e1xx5f48e56s4x8"));
    static int i = 0;
    qDebug() << "------------------- i = " << i << " -------------";
    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(finished()), this, SLOT(httpFinished()));
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
    connect(_netRep, SIGNAL(readyRead()), this, SLOT(httpReadyRead()));
    i++;
}

void    MainWindow::backToMain() {
    _tempWin->hide();
    _lumWin->hide();
    _opacWin->hide();
    _planWin->hide();
    _configWin->hide();
    this->show();
}

void MainWindow::tempValChanged(double newVal) {
    _curRoom->setTemp(newVal);
    _tempLbl->setText(QString::number(_curRoom->getTemp()) + _curRoom->getTempDisp());
/*    if (_curRoom->gettempDispVal() == 1)
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°C");
    else
        _tempLbl->setText(QString::number(_curRoom->getTemp()) + "°F");
*/
}

void MainWindow::lumValChanged(int newVal) {
    _curRoom->setLum(newVal);
    _lumLbl->setText(QString::number(_curRoom->getLum()) + "%");
}

void MainWindow::opacValChanged(int newVal) {
    _curRoom->setOpac(newVal);
    _opacLbl->setText(QString::number(_curRoom->getOpac()) + "%");
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
            std::cout  << _netRep->errorString().toStdString() << std::endl;
            _netRep->deleteLater();
            _netRep = Q_NULLPTR;
            return;
        }
    _reply = _netRep->readAll();
    QJsonDocument doc = QJsonDocument();
    doc = doc.fromJson(_reply);
    qDebug() << "Is Object : " << doc.isObject();
    qDebug() << "Is Array : " << doc.isArray();
    _jsonArr = new QJsonArray(doc.array());
    qDebug() << "jsonArr first line = " << _jsonArr->at(0).toString();
    qDebug() << _reply;//.toStdString();
    qDebug() << "Reply finish: " << _netRep->isFinished();

    QVariant redirectionTarget  = _netRep->attribute(QNetworkRequest::RedirectionTargetAttribute);
/*    _netRep->deleteLater();
    _netRep = Q_NULLPTR;
*/
    if(!redirectionTarget.isNull()) {
        qDebug() << "redirection exists !!!!!!!";
        const QUrl newUrl = _url.resolved(redirectionTarget.toUrl());
        _url = newUrl;
        QNetworkRequest request(_url);

/*        QHttpPart textPart = QHttpPart();
        textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"organisation\""));
        textPart.setBody("Envio");
        QHttpMultiPart *multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);

        multiPart->append(textPart);
*/
        _netRep = _netMan->post(request, _multiPart);
    }
    qDebug() << "after red test";
}

void MainWindow::httpFailed(QNetworkReply::NetworkError err) {
    qDebug() << "Error: " << err;
}

void MainWindow::httpReadyRead()
{
         std::cout << _netRep->readAll().toStdString() << std::endl;
         qDebug() << "Reply finish: " << _netRep->isFinished();
//         _netRep->setFinished(true);
//         _netRep->deleteLater();
//         _netRep = Q_NULLPTR;
}
