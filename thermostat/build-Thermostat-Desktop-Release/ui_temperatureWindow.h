/********************************************************************************
** Form generated from reading UI file 'temperatureWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
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
        AccueilBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn1->addWidget(AccueilBtn);

        LumEditBtn = new QPushButton(gridLayoutWidget);
        LumEditBtn->setObjectName(QStringLiteral("LumEditBtn"));
        LumEditBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #286090;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #245680;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn1->addWidget(LumEditBtn);

        OpacEditBtn = new QPushButton(gridLayoutWidget);
        OpacEditBtn->setObjectName(QStringLiteral("OpacEditBtn"));

        horizontalLayoutBtn1->addWidget(OpacEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn1, 0, 1, 1, 1);

        TempFixLabel = new QLabel(gridLayoutWidget);
        TempFixLabel->setObjectName(QStringLiteral("TempFixLabel"));
        TempFixLabel->setStyleSheet(QLatin1String("font-family: \"Montserrat\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;"));

        gridLayout->addWidget(TempFixLabel, 2, 1, 1, 1);

        TempHorizontalSlider = new QSlider(gridLayoutWidget);
        TempHorizontalSlider->setObjectName(QStringLiteral("TempHorizontalSlider"));
        TempHorizontalSlider->setStyleSheet(QLatin1String("QSlider::groove:horizontal {\n"
"border: 1px solid #bbb;\n"
"background: white;\n"
"height: 10px;\n"
"border-radius: 4px;\n"
"}\n"
"\n"
"QSlider::sub-page:horizontal {\n"
"background: qlineargradient(x1: 0, y1: 0,    x2: 0, y2: 1,\n"
"    stop: 0 #FF8F20, stop: 1 #FF2020);\n"
"background: qlineargradient(x1: 0, y1: 0.2, x2: 1, y2: 1,\n"
"    stop: 0 #FF8F20, stop: 1 #FF2020);\n"
"border: 1px solid #777;\n"
"height: 10px;\n"
"border-radius: 4px;\n"
"}\n"
"\n"
"QSlider::add-page:horizontal {\n"
"background: #fff;\n"
"border: 1px solid #777;\n"
"height: 10px;\n"
"border-radius: 4px;\n"
"}\n"
"\n"
"QSlider::handle:horizontal {\n"
"background: qlineargradient(x1:0, y1:0, x2:1, y2:1,\n"
"    stop:0 #eee, stop:1 #ccc);\n"
"border: 1px solid #777;\n"
"width: 13px;\n"
"margin-top: -2px;\n"
"margin-bottom: -2px;\n"
"border-radius: 4px;\n"
"}\n"
"\n"
"QSlider::handle:horizontal:hover {\n"
"background: qlineargradient(x1:0, y1:0, x2:1, y2:1,\n"
"    stop:0 #fff, stop:1 #ddd);\n"
"border: 1px solid #444;\n"
"border-radius:"
                        " 4px;\n"
"}\n"
"\n"
"QSlider::sub-page:horizontal:disabled {\n"
"background: #bbb;\n"
"border-color: #999;\n"
"}\n"
"\n"
"QSlider::add-page:horizontal:disabled {\n"
"background: #eee;\n"
"border-color: #999;\n"
"}\n"
"\n"
"QSlider::handle:horizontal:disabled {\n"
"background: #eee;\n"
"border: 1px solid #aaa;\n"
"border-radius: 4px;\n"
"}"));
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
        PlanningEditBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn2->addWidget(PlanningEditBtn);

        ConfigEditBtn = new QPushButton(gridLayoutWidget);
        ConfigEditBtn->setObjectName(QStringLiteral("ConfigEditBtn"));
        ConfigEditBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"	font-family:\"Montserrat\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn2->addWidget(ConfigEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn2, 1, 1, 1, 1);

        TempLabel = new QLabel(gridLayoutWidget);
        TempLabel->setObjectName(QStringLiteral("TempLabel"));
        TempLabel->setStyleSheet(QLatin1String("font-family: \"Montserrat\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #b71c1c;\n"
"font-size: 12px;"));

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
