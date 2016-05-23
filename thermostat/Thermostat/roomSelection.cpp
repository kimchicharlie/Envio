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
            //change room
            return;
        else {
            ui->errorLbl->setText("Mauvais code.");
            this->show();
        }
    }
    else {
        ui->errorLbl->setText("Vous devez entrer un code.");
        this->show();
    }
}

void RoomSelection::on_buttonBox_rejected()
{

}
