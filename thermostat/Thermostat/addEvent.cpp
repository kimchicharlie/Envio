#include "addEvent.h"
#include "ui_addEvent.h"

AddEvent::AddEvent(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddEvent)
{
    ui->setupUi(this);
    _hourSpin = ui->hourStartSpin;
    _minSpin = ui->minStartSpin;
    _durSpin = ui->durationSpin;
    _errorLbl = ui->errorLbl;
}

AddEvent::~AddEvent()
{
    delete ui;
}

// state = 0, the mode has been added to the planning of the current room.
// state = 1, another mode is set during this time.
void    AddEvent::stateRet() {
    _errorLbl->setText("Un autre mode est déjà présent sur la plage horaire sélectionnée.");
}

void AddEvent::on_validateBtn_clicked()
{
    int hourStart = _hourSpin->value();
    int minStart = _minSpin->value();
    int duration = _durSpin->value();

    emit checkPlan(hourStart, minStart, duration);
}

void AddEvent::on_cancelBtn_clicked()
{
    _errorLbl->setText("");
    this->hide();
}
