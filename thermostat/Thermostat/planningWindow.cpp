#include "planningWindow.h"
#include "mainwindow.h"
#include "ui_planningWindow.h"
#include <iostream>
#include <QTimeZone>

PlanningWindow::PlanningWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::PlanningWindow)
{
    ui->setupUi(this);

    _planModel = new PlanningModel(this, QString(QDate::currentDate().toString()));
    _date = QDate::currentDate();
    connect(_planModel, SIGNAL(remove(Planning*)), this, SLOT(removeMode(Planning*)));

    //setup network part
    MainWindow *tmp = (MainWindow*)parent;
    _network = new NetConnection(this, *(tmp->getHostName()),
                                 tmp->getHostPort());

/**/
    _netMan = new QNetworkAccessManager(this);
    _netMan->setNetworkAccessible(QNetworkAccessManager::Accessible);
    _netMan->connectToHost(*(_network->getHostName()), _network->getHostPort());
/**/
    _netRep = Q_NULLPTR;

    _planning = ui->tableView;
    _prevBtn = ui->PrevButton;
    _nextBtn = ui->NextButton;
    _addModeBtn = ui->AddModeButton;
    ui->DateLabel->setText(_date.toString());

    _planning->setModel(_planModel);
    _modal = new AddEvent(this);
    _modal->hide();
    connect(_modal, SIGNAL(checkPlan(QString, int, int,int, QString)), this, SLOT(checkPlan(QString, int, int,int, QString)));
    connect(this, SIGNAL(noAdd(int)), _modal, SLOT(stateRet(int)));
   QHeaderView *hdHorView = _planning->horizontalHeader();
   hdHorView->setDefaultSectionSize(290);
//   hdView->setObjectName(QString(QDate::currentDate().toString()));
   hdHorView->hide();
   _planning->setHorizontalHeader(hdHorView);

   QHeaderView *hdVertView = _planning->verticalHeader();
   hdVertView->hide();
   for (int i = 0; i < _planModel->rowCount(_planModel->index(0, 0)); i++) {
       QString tmp = _planModel->customHeader(_planModel->index(i, 0));
       _planModel->setHeaderData(i, Qt::Vertical, tmp);
   }
}

PlanningWindow::~PlanningWindow()
{
    delete ui;
}

void PlanningWindow::setRoomId(QString id) {
    _roomId = id;
}

void PlanningWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void PlanningWindow::on_PrevButton_clicked()
{
    //récupérer les modes correspondant a la salle et a la date
    _planModel->clearAll();
    _date = _date.addDays(-1);
    ui->DateLabel->setText(_date.toString());
    getRoomsModeFromAPI();
}

void PlanningWindow::on_NextButton_clicked()
{
    //récupérer les modes correspondant a la salle et a la date
    _planModel->clearAll();
    _date = _date.addDays(1);
    ui->DateLabel->setText(_date.toString());
    getRoomsModeFromAPI();
}

void PlanningWindow::on_AddModeButton_clicked()
{
    //poper une fenetre avec choix de date et choix de mode
    _modal->show();
}

void    PlanningWindow::checkPlan(QString modeName, int hour, int min, int dur, QString id) {
    //checker planning with this info
    if (_planModel->checkPlan(_date, hour, min, dur) == -1)
        emit noAdd(1);
    else {
        Planning *n = new Planning(modeName, id, _date, hour, min, dur);
        //create the mode and add it
        _planModel->addMode(n);
        emit noAdd(0);
        _modal->hide();
        toAPI(n);
    }
}

void PlanningWindow::toAPI(Planning *plan) {
     if (!_network->testConnection())
         return;

      QString tmpStr = QString(QString("http://") + *(_network->getHostName()) + QString(":") + QString::number(_network->getHostPort()) +
                            QString("/api/addEventPlanning?api_key=f8c5e1xx5f48e56s4x8"));
      QNetworkRequest netReq = QNetworkRequest(QUrl(tmpStr.toStdString().c_str()));


     _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    QHttpPart textPart = QHttpPart();
    QByteArray tmp;
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    tmp.append(_roomId);
    textPart.setBody(tmp);
    _multiPart->append(textPart);

    textPart = QHttpPart();
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"eventName\""));
    tmp.append(plan->getType());
    textPart.setBody(tmp);
    _multiPart->append(textPart);

    textPart = QHttpPart();
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"modeID\""));
    tmp.append(plan->getId());
    textPart.setBody(tmp);
    _multiPart->append(textPart);

    QDateTime now = QDateTime::currentDateTime();
    int offset = now.offsetFromUtc() / 3600;
    textPart = QHttpPart();
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"dateBegin\""));
    int begHour = plan->getHour() - offset;
    if (begHour < 0)
        begHour = 0;
    QString hourStr;
    if (begHour < 10)
        hourStr = QString("0" + QString::number(begHour));
    else
        hourStr = QString::number(begHour);
    QString minStr;
    if (plan->getMinute() < 10)
        minStr = QString("0" + QString::number(plan->getMinute()));
    else
        minStr = QString::number(plan->getMinute());
    QString dB = QString();
    dB += _date.toString(Qt::ISODate) + "T" + hourStr + ":" + minStr + ":00.000Z";
    tmp.append(dB);
    textPart.setBody(tmp);
    _multiPart->append(textPart);

    textPart = QHttpPart();
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"dateEnd\""));
    int hourE = begHour + plan->getDuration() / 60;
    int minE = plan->getMinute() + plan->getDuration() % 60;
    if (hourE < 10)
        hourStr = QString("0" + QString::number(hourE));
    else
        hourStr = QString::number(hourE);
    if (minE < 10)
        minStr = QString("0" + QString::number(minE));
    else
        minStr = QString::number(minE);
    QString dE = QString();
    dE += _date.toString(Qt::ISODate) + "T" + hourStr + ":" + minStr + ":00.000Z";

    tmp.append(dE);
    textPart.setBody(tmp);
    _multiPart->append(textPart);

//    _netRep = _network->post(netReq, _multiPart);
    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
}

void PlanningWindow::on_tableView_doubleClicked(const QModelIndex &index)
{
    _planModel->removeMode(index, 1);
    //remove node in API
}

void PlanningWindow::removeMode(Planning *plan) {
    qDebug() << "will remove";
    if (!_network->testConnection())
        return;

     QString tmpStr = QString(QString("http://") + *(_network->getHostName()) + QString(":") + QString::number(_network->getHostPort()) +
                           QString("/api/removeEventPlanning?api_key=f8c5e1xx5f48e56s4x8"));
     QNetworkRequest netReq = QNetworkRequest(QUrl(tmpStr.toStdString().c_str()));


     _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    QHttpPart textPart = QHttpPart();
    QByteArray tmp;
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    tmp.append(_roomId);
    textPart.setBody(tmp);
    _multiPart->append(textPart);

    textPart = QHttpPart();
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"eventName\""));
    tmp.append(plan->getType());
    textPart.setBody(tmp);
    _multiPart->append(textPart);

    QDateTime now = QDateTime::currentDateTime();
    int offset = now.offsetFromUtc() / 3600;
    textPart = QHttpPart();
    tmp.clear();
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"dateBegin\""));
    int begHour = plan->getHour() - offset;
    if (begHour < 0)
        begHour = 0;
    QString hourStr;
    if (begHour < 10)
        hourStr = QString("0" + QString::number(begHour));
    else
        hourStr = QString::number(begHour);
    QString minStr;
    if (plan->getMinute() < 10)
        minStr = QString("0" + QString::number(plan->getMinute()));
    else
        minStr = QString::number(plan->getMinute());
    QString dB = QString();
    dB += _date.toString(Qt::ISODate) + "T" + hourStr + ":" + minStr + ":00.000Z";
    tmp.append(dB);
    textPart.setBody(tmp);
    _multiPart->append(textPart);

//    _netRep = _network->post(netReq, _multiPart);
    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));

}

void    PlanningWindow::show() {
    QMainWindow::show();
    _planModel->clearAll();
    _date = QDate::currentDate();
    getRoomsModeFromAPI();
}

void    PlanningWindow::getRoomsModeFromAPI() {
    if (!_network->testConnection())
        return;

     QString tmpStr = QString(QString("http://") + *(_network->getHostName()) + QString(":") + QString::number(_network->getHostPort()) +
                           QString("/api/getRoom?api_key=f8c5e1xx5f48e56s4x8"));
     QNetworkRequest netReq = QNetworkRequest(QUrl(tmpStr.toStdString().c_str()));

    QHttpPart textPart = QHttpPart();
    QByteArray tmp;
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    tmp.append(_roomId);
    textPart.setBody(tmp);

    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);

//    _netRep = _network->post(netReq, _multiPart);
    _netRep = _netMan->post(netReq, _multiPart);
    connect(_netRep, SIGNAL(finished()), this, SLOT(httpFinished()));
    connect(_netRep, SIGNAL(error(QNetworkReply::NetworkError)), this, SLOT(httpFailed(QNetworkReply::NetworkError)));
    connect(_netRep, SIGNAL(readyRead()), this, SLOT(httpReadyRead()));
}

void PlanningWindow::httpFinished()
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
    parseRep();

    QVariant redirectionTarget  = _netRep->attribute(QNetworkRequest::RedirectionTargetAttribute);

    if(!redirectionTarget.isNull()) {
        const QUrl newUrl = _network->getUrl().resolved(redirectionTarget.toUrl());
        _network->setUrl(newUrl);
        QNetworkRequest request(_network->getUrl());
        _netRep = _netMan->post(request, _multiPart);
//        _netRep = _network->post(request, _multiPart);
    }
}

void    PlanningWindow::parseRep() {
    std::map<std::string, std::string> m;
    std::istringstream resp(_reply.toStdString().c_str());
    std::string header;
    std::string::size_type index;
    while (std::getline(resp, header) && header != "\r") {
        header.erase(std::remove(header.end() - 1, header.end(), ','), header.end());
        header.erase(std::remove(header.begin(), header.end(), '\"'), header.end());

        index = header.find("planning", 0);
        if (index != std::string::npos) {
            while (std::getline(resp, header) && header.find("]", 0) == std::string::npos && header != "\r") {
                while (std::getline(resp, header) && header.find("}", 0) == std::string::npos && header != "\r") {
                    header.erase(std::remove(header.end() - 1, header.end(), ','), header.end());
                    header.erase(std::remove(header.begin(), header.end(), '\"'), header.end());
                    index = header.find(':', 0);
                    m.insert(std::make_pair(boost::algorithm::trim_copy(header.substr(0, index)),
                                            boost::algorithm::trim_copy(header.substr(index + 1))));
                }

                // create useful strings to create mode
                std::string id = m.at("mode");
                std::string name = m.at("name");

                // begin of the mode (day and time)
                std::string dateBeg = m.at("dateBegin").substr(0, m.at("dateBegin").find('T'));
                std::string timeBeg = m.at("dateBegin").erase(0, m.at("dateBegin").find('T') + 1);
                timeBeg = timeBeg.substr(0, timeBeg.find('.'));

                // end of the mode (day and time)
                std::string dateEnd = m.at("dateEnd").substr(0, m.at("dateEnd").find('T'));
                std::string timeEnd = m.at("dateEnd").erase(0, m.at("dateEnd").find('T') + 1);
                timeEnd = timeEnd.substr(0, timeEnd.find('.'));

                // 2016-04-20T05:00:00.000Z
               if (dateBeg.compare(dateEnd) == 0)
                   constructSimpleMode(id, name, dateBeg, timeBeg, timeEnd);
               else
                   constructMode(id, name, dateBeg, dateEnd, timeBeg, timeEnd);
                m.clear();
            }
        }
    }
}

void PlanningWindow::constructSimpleMode(std::string id, std::string name, std::string dB, std::string hB, std::string hE) {
    // create date
    size_t pos = dB.find('-');
    int y = stoi(dB.substr(0, pos));
    dB.erase(0, pos + 1);
    pos = dB.find('-');
    int m = stoi(dB.substr(0, pos));
    dB.erase(0, pos + 1);
    int d = stoi(dB);

    QDate date = QDate(y, m, d);
    if (_date != date)
        return;

    QDateTime now = QDateTime::currentDateTime();
    int offset = now.offsetFromUtc() / 3600;
    // create hour & min begin
    pos = hB.find(':');
    int h = stoi(hB.substr(0, pos)) + offset;
    hB.erase(0, pos + 1);
    pos = hB.find(':');
    int mB = stoi(hB.substr(0, pos));

    // create hour & min end
    pos = hE.find(':');
    int hP = stoi(hE.substr(0, pos)) + offset;
    hE.erase(0, pos + 1);
    pos = hE.find(':');
    int mE = stoi(hE.substr(0, pos));

    // calculate duration
    int dur = (hP * 60 + mE) - (h * 60 + mB);

    Planning *plan = new Planning(QString::fromStdString(name), QString::fromStdString(id), date, h, mB, dur);
    _planModel->addMode(plan);
}

void PlanningWindow::constructMode(std::string id, std::string name, std::string dB,
                                   std::string dE, std::string timeBeg, std::string timeEnd) {
    // create date begin and end
    size_t pos = dB.find('-');
    int y = stoi(dB.substr(0, pos));
    dB.erase(0, pos + 1);
    pos = dB.find('-');
    int m = stoi(dB.substr(0, pos));
    dB.erase(0, pos + 1);
    int d = stoi(dB);

    QDate tmp = QDate(y, m, d);

    pos = dE.find('-');
    y = stoi(dE.substr(0, pos));
    dE.erase(0, pos + 1);
    pos = dE.find('-');
    m = stoi(dE.substr(0, pos));
    dE.erase(0, pos + 1);
    d = stoi(dE);

    QDate tmp2 = QDate(y, m, d);

    if (tmp <= _date && tmp2 >= _date) {
        QDateTime now = QDateTime::currentDateTime();
        int offset = now.offsetFromUtc() / 3600;
        int hB = 0;
        int mB = 0;
        if (tmp < _date)
            tmp = _date;
        else {
            // create hour & min begin
            pos = timeBeg.find(':');
            hB = stoi(timeBeg.substr(0, pos)) + offset;
            timeBeg.erase(0, pos + 1);
            pos = timeBeg.find(':');
            mB = stoi(timeBeg.substr(0, pos));
        }
        int hE = 23;
        int mE = 30;
        if (tmp2 > _date)
            tmp2 = _date;
        else {
            // create hour & min end
            pos = timeEnd.find(':');
            hE = stoi(timeEnd.substr(0, pos)) + offset;
            timeEnd.erase(0, pos + 1);
            pos = timeEnd.find(':');
            mE = stoi(timeEnd.substr(0, pos));
        }
        // calculate duration
        int dur = (hE * 60 + mE) - (hB * 60 + mB);

        Planning *plan = new Planning(QString::fromStdString(name), QString::fromStdString(id), tmp, hB, mB, dur);
        _planModel->addMode(plan);
    }
}

void PlanningWindow::httpFailed(QNetworkReply::NetworkError err) {
    qDebug() << "Error: " << err;
}

void PlanningWindow::httpReadyRead()
{
    qDebug() << "Reply finish: " << _netRep->isFinished();
}
