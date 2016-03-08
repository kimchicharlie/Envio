#ifndef OPACWINDOW_H
#define OPACWINDOW_H

#include <QMainWindow>
#include <QSlider>
#include <QLabel>

namespace Ui {
class OpacWindow;
}

class OpacWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit OpacWindow(QWidget *parent = 0);
    ~OpacWindow();

signals:
    // signal to handle the temp has changed
    void opacChange(int opac);
    void returnToMain();

private slots:
    void on_OpacHorizontalSlider_valueChanged(int value);

    void on_AccueilBtn_clicked();

private:
    Ui::OpacWindow          *ui;
    QPixmap                 *_logo;
    QSlider                 *_slider;
    QLabel                  *_label;
};

#endif // OPACWINDOW_H
