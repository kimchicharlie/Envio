#ifndef ADDEVENT_H
#define ADDEVENT_H

#include <QDialog>
#include <QSpinBox>
#include <QComboBox>
#include <QLabel>

namespace Ui {
class AddEvent;
}

class AddEvent : public QDialog
{
    Q_OBJECT

public:
    explicit AddEvent(QWidget *parent = 0);
    ~AddEvent();


private slots:
    void    stateRet(int state);
    void    on_validateBtn_clicked();
    void    on_cancelBtn_clicked();

signals:
    void    checkPlan(QString modeName, int hour, int min, int dur);

private:
    Ui::AddEvent *ui;
    QComboBox    *_modeCbBox;
    QSpinBox     *_hourSpin;
    QSpinBox     *_minSpin;
    QSpinBox     *_durSpin;
    QLabel       *_errorLbl;
};

#endif // ADDEVENT_H
