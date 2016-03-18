#ifndef CONFIGWINDOW_H
#define CONFIGWINDOW_H

#include <QMainWindow>

namespace Ui {
class ConfigWindow;
}

class ConfigWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit ConfigWindow(QWidget *parent = 0);
    ~ConfigWindow();

signals:
    // signal to handle the temp has changed
    void returnToMain();

private slots:
    void on_AccueilBtn_clicked();

private:
    Ui::ConfigWindow *ui;
};

#endif // CONFIGWINDOW_H
