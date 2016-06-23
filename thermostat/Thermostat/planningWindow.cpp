#include "planningWindow.h"
#include "ui_planningWindow.h"
#include <iostream>

PlanningWindow::PlanningWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::PlanningWindow)
{
    ui->setupUi(this);

    _planModel = new PlanningModel(this, QString(QDate::currentDate().toString()));
    _date = QDate::currentDate();

    //setup network part
    _netMan = new QNetworkAccessManager(this);
    _netMan->setNetworkAccessible(QNetworkAccessManager::Accessible);
    _netMan->connectToHost(*_hostName, _hostPort);
    _netRep = Q_NULLPTR;

    _planning = ui->tableView;
    _prevBtn = ui->PrevButton;
    _nextBtn = ui->NextButton;
    _addModeBtn = ui->AddModeButton;
    ui->DateLabel->setText(_date.toString());

    _planning->setModel(_planModel);
    _modal = new AddEvent(this);
    _modal->hide();
    connect(_modal, SIGNAL(checkPlan(QString, int,int,int)), this, SLOT(checkPlan(QString, int,int,int)));
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

void PlanningWindow::showEvent( QShowEvent* event ) {
    QWidget::showEvent( event );
    _date = QDate::currentDate();
    //update the planning
    _planModel->refreshPlanning(_date);
}

void PlanningWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void PlanningWindow::on_PrevButton_clicked()
{
    //récupérer les modes correspondant a la salle et a la date
    _date = _date.addDays(-1);
    ui->DateLabel->setText(_date.toString());
}

void PlanningWindow::on_NextButton_clicked()
{
    //récupérer les modes correspondant a la salle et a la date
    _date = _date.addDays(1);
    ui->DateLabel->setText(_date.toString());
}

void PlanningWindow::on_AddModeButton_clicked()
{
    _modal->show();
    //poper une fenetre avec choix de date et choix de mode
}

void    PlanningWindow::checkPlan(QString modeName, int hour, int min, int dur) {
    //checker planning with this info
    if (_planModel->checkPlan(_date, hour, min, dur) == -1)
        emit noAdd(1);
    else {
        //create the mode and add it
        _planModel->addMode(modeName, _date, hour, min, dur);
        emit noAdd(0);
        _modal->hide();
    }
}

void PlanningWindow::on_tableView_doubleClicked(const QModelIndex &index)
{
    _planModel->removeMode(index, 1);
}

void    PlanningWindow::show() {
    QMainWindow::show();
//    _model->reset();
//    _rooms->clear();
    getRoomsModeFromAPI();
}

void    PlanningWindow::getRoomsModeFromAPI() {

    QNetworkRequest netReq = QNetworkRequest(QUrl("http://127.0.0.1:1337/api/getRoom?api_key=f8c5e1xx5f48e56s4x8"));
    QHttpPart textPart = QHttpPart();
    QByteArray tmp;
    textPart.setHeader(QNetworkRequest::ContentDispositionHeader, QVariant("form-data; name=\"roomID\""));
    tmp.append(_roomId);
    textPart.setBody(tmp);

    _multiPart = new QHttpMultiPart(QHttpMultiPart::FormDataType);
    _multiPart->append(textPart);

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
        const QUrl newUrl = _url.resolved(redirectionTarget.toUrl());
        _url = newUrl;
        QNetworkRequest request(_url);
        _netRep = _netMan->post(request, _multiPart);
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

                std::cout << m.at("mode") << std::endl;
                std::cout << m.at("name") << std::endl;

                std::cout << dateBeg << std::endl;
                std::cout << timeBeg << std::endl;
                std::cout << "           ----           " << std::endl;
                std::cout << dateEnd << std::endl;
                std::cout << timeEnd << std::endl;

                // 2016-04-20T05:00:00.000Z
               if (dateBeg.compare(dateEnd) == 0) {
                   constructSimpleMode(id, name, dateBeg, timeBeg, timeEnd);
               }
               else {
                   std::cout << "dépasse sur un autre jour =/" << std::endl;
                   constructMode(id, name, dateBeg, dateEnd);
               }
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

    // create hour & min begin
    pos = hB.find(':');
    int h = stoi(hB.substr(0, pos));
    hB.erase(0, pos + 1);
    pos = hB.find(':');
    int mB = stoi(hB.substr(0, pos));

    // create hour & min end
    pos = hE.find(':');
    int hP = stoi(hE.substr(0, pos));
    hE.erase(0, pos + 1);
    pos = hE.find(':');
    int mE = stoi(hE.substr(0, pos));

    // calculate duration
    int dur = (hP * 60 + mE) - (h * 60 + mB);

    Planning *plan = new Planning(QString::fromStdString(name), QString::fromStdString(id), date, h, mE, dur);
    _planModel->addMode(plan, 0);
}

void PlanningWindow::constructMode(std::string id, std::string name, std::string dB, std::string dE) {
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
}

void PlanningWindow::httpFailed(QNetworkReply::NetworkError err) {
    qDebug() << "Error: " << err;
}

void PlanningWindow::httpReadyRead()
{
         qDebug() << "Reply finish: " << _netRep->isFinished();
}
