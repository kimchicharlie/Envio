#include "configWindow.h"
#include "ui_configWindow.h"

ConfigWindow::ConfigWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::ConfigWindow)
{
    ui->setupUi(this);
    _model = new RoomListModel(this);
//    _model = new QStringListModel(this);
    _listView = ui->listView;
    _listView->setModel(_model);
    //get the rooms attach to the thermostat and put them in the list
    _rooms = new QList<RoomState*>();

    _rooms->append(new RoomState("test1", "1234"));
    _rooms->append(new RoomState("test2", "1234"));
    _rooms->append(new RoomState("test3", "1234"));
    _rooms->append(new RoomState("test4", "1234"));
}

ConfigWindow::~ConfigWindow()
{
    delete ui;
}

void ConfigWindow::on_AccueilBtn_clicked()
{
    emit returnToMain();
}

void ConfigWindow::on_TempDispButton_clicked()
{
    if (!ui->TempDispButton->text().compare("°F"))
        ui->TempDispButton->setText("°C");
    else
        ui->TempDispButton->setText("°F");
    emit TempDispChange();
}

void ConfigWindow::on_HourDispButton_clicked()
{
    if (!ui->HourDispButton->text().compare("12h"))
        ui->HourDispButton->setText("24h");
    else
        ui->HourDispButton->setText("12h");
    emit HourDispChange();
}

//an item in the listView was clicked.
//it asks for the pin of the clicked room, check it and change the current room if correct
void ConfigWindow::on_listView_clicked(const QModelIndex &index)
{
}
