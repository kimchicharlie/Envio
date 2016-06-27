#include "roomSelection.h"
#include "ui_roomSelection.h"

RoomSelection::RoomSelection(QWidget *parent, int index, QString pin) :
    QDialog(parent),
    ui(new Ui::RoomSelection)
{
    _pin = pin;
    _room = index;
    ui->setupUi(this);
}

RoomSelection::~RoomSelection()
{
    delete ui;
}

void RoomSelection::on_buttonBox_accepted()
{
    if (!ui->label->text().isEmpty()) {
        if (ui->lineEdit->text().compare(_pin) == 0)
            emit changeRoom(_room);
        else {
            ui->errorLbl->setText("<font color='red'>Mauvais code.</font>");
            this->show();
        }
    }
    else {
        ui->errorLbl->setText("<font color='red'>Vous devez entrer un code.</font>");
        this->show();
    }
}

void RoomSelection::on_buttonBox_rejected()
{

}
