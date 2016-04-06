#ifndef LUMWINDOW_H
#define LUMWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QSlider>

namespace Ui {
class LumWindow;
}

class LumWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit LumWindow(QWidget *parent = 0);
    ~LumWindow();
    void setSliderVal(int val);

signals:
    // signal to handle the temp has changed
    void lumChange(int lum);
    void returnToMain();
    void goToTemp();
    void goToOpac();

private slots:

    void on_LumHorizontalSlider_valueChanged(int value);
    void on_AccueilBtn_clicked();
    void on_TempEditBtn_clicked();
    void on_OpacEditBtn_clicked();

private:
    Ui::LumWindow *ui;
    QPixmap                 *_logo;
    QSlider                 *_slider;
    QLabel                  *_label;
};

#endif // LUMWINDOW_H
