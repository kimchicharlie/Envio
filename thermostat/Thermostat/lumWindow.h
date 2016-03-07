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

signals:
    // signal to handle the temp has changed
    void lumChange(int lum);
    void returnToMain();

private slots:
    void on_TempHorizontalSlider_valueChanged(int value);

    void on_AccueilBtn_clicked();

private:
    Ui::LumWindow *ui;
    QPixmap                 *_logo;
    QSlider                 *_slider;
    QLabel                  *_label;
};

#endif // LUMWINDOW_H
