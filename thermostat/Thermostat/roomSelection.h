#ifndef ROOMSELECTION_H
#define ROOMSELECTION_H

#include <QDialog>
#include <QLabel>

namespace Ui {
class RoomSelection;
}

class RoomSelection : public QDialog
{
    Q_OBJECT

public:
    explicit RoomSelection(QWidget *parent, int index, QString pin);
    ~RoomSelection();

signals:
    void changeRoom(int);

public slots:
    void on_buttonBox_accepted();
    void on_buttonBox_rejected();

private:
    Ui::RoomSelection   *ui;
    QLabel              _errorLbl;
    QString             _pin;
    int                 _room;
};

#endif // ROOMSELECTION_H
