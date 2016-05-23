#include "configWindow.h"
#include "ui_configWindow.h"

ConfigWindow::ConfigWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::ConfigWindow)
{
    ui->setupUi(this);
    //get the rooms attach to the thermostat and put them in the list
    _rooms = new QList<RoomState*>();

    _rooms->append(new RoomState("test1", "1234"));
    _rooms->append(new RoomState("test2", "1234"));
    _rooms->append(new RoomState("test3", "1234"));
    _rooms->append(new RoomState("test4", "1234"));

    _model = new RoomListModel(this);
    _listView = ui->listView;
    _listView->setModel(_model);
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
    _modal->show();
}

void ConfigWindow::changeRoom(int ind) {
    _modal->hide();
    delete _modal;
    _modal = NULL;
/*    if (ind != -1)
        changeRoom();
*/

}

