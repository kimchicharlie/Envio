#include "configWindow.h"
#include "mainwindow.h"
#include "ui_configWindow.h"

#include <map>

ConfigWindow::ConfigWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::ConfigWindow)
{
    ui->setupUi(this);
    //get the rooms attach to the thermostat and put them in the list
    _rooms = new QList<RoomState*>();

    MainWindow *tmp = (MainWindow*)parent;
    _network = new NetConnection(this, *(tmp->getHostName()),
                                 tmp->getHostPort());

/**
    _netMan = new QNetworkAccessManager(this);
    _netMan->setNetworkAccessible(QNetworkAccessManager::Accessible);
    _netMan->connectToHost(*(_network->getHostName()), _network->getHostPort());
/**/
    _netRep = Q_NULLPTR;

    QHttpPart textPart = QHttpPart();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"organisation\""));
    textPart.setBody("Envio");
    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);

    _model = new RoomListModel(this);
    _listView = ui->listView;
    _listView->setModel(_model);
}

ConfigWindow::~ConfigWindow()
{
    delete ui;
}

void ConfigWindow::getRoomsFromAPI() {
    if (!_network->testConnection())
        return;

     QString tmpStr = QString(QString("http://") + *(_network->getHostName()) + QString(":") + QString::number(_network->getHostPort()) +
                           QString("/api/getRooms?api_key=f8c5e1xx5f48e56s4x8"));
     QNetworkRequest netReq = QNetworkRequest(QUrl(tmpStr.toStdString().c_str()));

    QHttpPart textPart = QHttpPart();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"organisation\""));
    textPart.setBody("Envio");
    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);

    _netRep = _network->post(netReq, _multiPart);
//    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(finished()), this, SLOT(httpFinished()));
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
    connect(_netRep, SIGNAL(readyRead()), this, SLOT(httpReadyRead()));

}

void ConfigWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void ConfigWindow::on_TempDispButton_clicked()
{
    if (!_network->testConnection())
        return;
    if (!ui->TempDispButton->text().compare("°F")) {
        ui->TempDispButton->setText("°C");
        emit TempDispChange(2);
    }
    else {
        ui->TempDispButton->setText("°F");
        emit TempDispChange(1);
    }
}

void ConfigWindow::on_HourDispButton_clicked()
{
    if (!_network->testConnection())
        return;
    if (!ui->HourDispButton->text().compare("12h")) {
        ui->HourDispButton->setText("24h");
        emit HourDispChange(1);
    }
    else {
        ui->HourDispButton->setText("12h");
        emit HourDispChange(2);
    }
}

//an item in the listView was clicked.
//it asks for the pin of the clicked room, check it and change the current room if correct
void ConfigWindow::on_listView_clicked(const QModelIndex &index)
{
    _modal = new RoomSelection(this, index.row(), ((RoomState*)_rooms->at(index.row()))->getPin());
    connect(_modal, SIGNAL(changeRoom(int)), this, SLOT(changeRoom(int)));
    _modal->show();
}

void ConfigWindow::changeRoom(int ind) {
    _modal->hide();
    disconnect(_modal, SIGNAL(changeRoom(int)), this, SLOT(changeRoom(int)));
    delete _modal;
    _modal = NULL;
    if (ind != -1) {
        emit changeCurRoom((RoomState*)(_rooms->at(ind)));
        ui->msgLabel->setText("Salle: " + _rooms->at(ind)->getName());
    }
    _model->reset();
    _rooms->clear();
    getRoomsFromAPI();
}

void    ConfigWindow::show() {
    QMainWindow::show();
    ui->msgLabel->setText("");
    _model->reset();
    _rooms->clear();
    getRoomsFromAPI();
}

void ConfigWindow::httpFinished()
{
    if (_netRep->error()) {
            std::cout  << _netRep->errorString().toStdString() << std::endl;
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

    if(!redirectionTarget.isNull())
        _network->redirectUrl(redirectionTarget, _multiPart);
}

void    ConfigWindow::parseRep() {
        std::map<std::string, std::string> m;
        std::istringstream resp(_reply.toStdString().c_str());
        std::string header;
        std::string::size_type index;
        while (std::getline(resp, header) && header != "\r") {
            header.erase(std::remove(header.end() - 1, header.end(), ','), header.end());
            header.erase(std::remove(header.begin(), header.end(), '\"'), header.end());

            index = header.find(':', 0);
            size_t index2 = header.find('[', 0);
            // if open square brackets & not room, go forward to the close square bracket
            if (index2 != std::string::npos && header.find("rooms", 0) == std::string::npos) {
                index2 = header.find(']', 0);
                while (index2 == std::string::npos && header != "\r") {
                    std::getline(resp, header);
                    index2 = header.find(']', 0);
                }
            }
            else if (index != std::string::npos) {
                std::string tmp = boost::algorithm::trim_copy(header.substr(0, index));
                // if _id & name in the map, create and add the new room
                if (m.find("_id") != m.end() && m.find("name") != m.end()) {
                    std::string name = m.at("name");
                    std::string id = m.at("_id");
                    RoomState *tmpRoom = new RoomState(QString::fromStdString(name), QString::fromStdString(id));
                    _rooms->append(tmpRoom);
                    _model->addRoom(tmpRoom->getName());
                    m.clear();
                }
                //else add the data in the map
                else {
                   m.insert(std::make_pair(tmp, boost::algorithm::trim_copy(header.substr(index + 1))));
               }
            }
        }
}

void ConfigWindow::httpFailed(QNetworkReply::NetworkError err) {
    qDebug() << "Error: " << err;
    getRoomsFromAPI();
}

void ConfigWindow::httpReadyRead()
{
    qDebug() << "Reply finish: " << _netRep->isFinished();
}
