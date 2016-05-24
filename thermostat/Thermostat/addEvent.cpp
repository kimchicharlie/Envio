#include "addEvent.h"
#include "ui_addEvent.h"

AddEvent::AddEvent(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddEvent)
{
    ui->setupUi(this);
    _modeCbBox = ui->modeComboBox;
    _hourSpin = ui->hourStartSpin;
    _minSpin = ui->minStartSpin;
    _durSpin = ui->durationSpin;
    _errorLbl = ui->errorLbl;

    _modeCbBox->addItem("Présentation");
    _modeCbBox->addItem("Repos");
    _modeCbBox->addItem("Test");
    _modeCbBox->addItem("Fin de journée");
    _modeCbBox->addItem("Test2");
}

AddEvent::~AddEvent()
{
    delete ui;
}

// state = 0, the mode has been added to the planning of the current room.
// state = 1, another mode is set during this time.
void    AddEvent::stateRet(int state) {
    if (state == 1)
        _errorLbl->setText("Un autre mode est déjà présent sur la plage horaire sélectionnée.");
    else
        _errorLbl->setText("");
}

void AddEvent::on_validateBtn_clicked()
{
    int i = _modeCbBox->currentIndex();
    QString modeName = _modeCbBox->itemText(i);
    int hourStart = _hourSpin->value();
    int minStart = _minSpin->value();
    int duration = _durSpin->value();

    emit checkPlan(modeName, hourStart, minStart, duration);
}

void AddEvent::on_cancelBtn_clicked()
{
    _errorLbl->setText("");
    this->hide();
}
