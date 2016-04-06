#include "mainwindow.h"
#include "temperatureWindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
//    TemperatureWindow wt;

    w.show();

    return a.exec();
}
