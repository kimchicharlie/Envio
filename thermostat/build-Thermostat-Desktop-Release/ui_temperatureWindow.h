/********************************************************************************
** Form generated from reading UI file 'temperatureWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_TEMPERATUREWINDOW_H
#define UI_TEMPERATUREWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSlider>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_TemperatureWindow
{
public:
    QWidget *centralwidget;
    QWidget *gridLayoutWidget;
    QGridLayout *gridLayout;
    QHBoxLayout *horizontalLayoutBtn1;
    QPushButton *AccueilBtn;
    QPushButton *LumEditBtn;
    QPushButton *OpacEditBtn;
    QLabel *TempFixLabel;
    QSlider *TempHorizontalSlider;
    QHBoxLayout *horizontalLayoutBtn2;
    QPushButton *PlanningEditBtn;
    QPushButton *ConfigEditBtn;
    QLabel *TempLabel;

    void setupUi(QMainWindow *TemperatureWindow)
    {
        if (TemperatureWindow->objectName().isEmpty())
            TemperatureWindow->setObjectName(QStringLiteral("TemperatureWindow"));
        TemperatureWindow->resize(320, 240);
        TemperatureWindow->setStyleSheet(QStringLiteral(""));
        centralwidget = new QWidget(TemperatureWindow);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        gridLayoutWidget = new QWidget(centralwidget);
        gridLayoutWidget->setObjectName(QStringLiteral("gridLayoutWidget"));
        gridLayoutWidget->setGeometry(QRect(9, 9, 301, 221));
        gridLayout = new QGridLayout(gridLayoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayoutBtn1 = new QHBoxLayout();
        horizontalLayoutBtn1->setObjectName(QStringLiteral("horizontalLayoutBtn1"));
        AccueilBtn = new QPushButton(gridLayoutWidget);
        AccueilBtn->setObjectName(QStringLiteral("AccueilBtn"));

        horizontalLayoutBtn1->addWidget(AccueilBtn);

        LumEditBtn = new QPushButton(gridLayoutWidget);
        LumEditBtn->setObjectName(QStringLiteral("LumEditBtn"));

        horizontalLayoutBtn1->addWidget(LumEditBtn);

        OpacEditBtn = new QPushButton(gridLayoutWidget);
        OpacEditBtn->setObjectName(QStringLiteral("OpacEditBtn"));

        horizontalLayoutBtn1->addWidget(OpacEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn1, 0, 1, 1, 1);

        TempFixLabel = new QLabel(gridLayoutWidget);
        TempFixLabel->setObjectName(QStringLiteral("TempFixLabel"));

        gridLayout->addWidget(TempFixLabel, 2, 1, 1, 1);

        TempHorizontalSlider = new QSlider(gridLayoutWidget);
        TempHorizontalSlider->setObjectName(QStringLiteral("TempHorizontalSlider"));
        TempHorizontalSlider->setMinimum(160);
        TempHorizontalSlider->setMaximum(400);
        TempHorizontalSlider->setSingleStep(5);
        TempHorizontalSlider->setPageStep(5);
        TempHorizontalSlider->setSliderPosition(200);
        TempHorizontalSlider->setOrientation(Qt::Horizontal);

        gridLayout->addWidget(TempHorizontalSlider, 4, 1, 1, 1);

        horizontalLayoutBtn2 = new QHBoxLayout();
        horizontalLayoutBtn2->setObjectName(QStringLiteral("horizontalLayoutBtn2"));
        PlanningEditBtn = new QPushButton(gridLayoutWidget);
        PlanningEditBtn->setObjectName(QStringLiteral("PlanningEditBtn"));

        horizontalLayoutBtn2->addWidget(PlanningEditBtn);

        ConfigEditBtn = new QPushButton(gridLayoutWidget);
        ConfigEditBtn->setObjectName(QStringLiteral("ConfigEditBtn"));

        horizontalLayoutBtn2->addWidget(ConfigEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn2, 1, 1, 1, 1);

        TempLabel = new QLabel(gridLayoutWidget);
        TempLabel->setObjectName(QStringLiteral("TempLabel"));

        gridLayout->addWidget(TempLabel, 3, 1, 1, 1);

        TemperatureWindow->setCentralWidget(centralwidget);

        retranslateUi(TemperatureWindow);

        QMetaObject::connectSlotsByName(TemperatureWindow);
    } // setupUi

    void retranslateUi(QMainWindow *TemperatureWindow)
    {
        TemperatureWindow->setWindowTitle(QApplication::translate("TemperatureWindow", "Envio - Thermostat", 0));
        AccueilBtn->setText(QApplication::translate("TemperatureWindow", "Accueil", 0));
        LumEditBtn->setText(QApplication::translate("TemperatureWindow", "Lumiere", 0));
        OpacEditBtn->setText(QApplication::translate("TemperatureWindow", "Vitres", 0));
        TempFixLabel->setText(QApplication::translate("TemperatureWindow", "Temperature", 0));
        PlanningEditBtn->setText(QApplication::translate("TemperatureWindow", "Planning", 0));
        ConfigEditBtn->setText(QApplication::translate("TemperatureWindow", "Configuration", 0));
        TempLabel->setText(QApplication::translate("TemperatureWindow", "TextLabel", 0));
    } // retranslateUi

};

namespace Ui {
    class TemperatureWindow: public Ui_TemperatureWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_TEMPERATUREWINDOW_H
