/********************************************************************************
** Form generated from reading UI file 'opacWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_OPACWINDOW_H
#define UI_OPACWINDOW_H

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

class Ui_OpacWindow
{
public:
    QWidget *centralwidget;
    QWidget *gridLayoutWidget;
    QGridLayout *gridLayout;
    QHBoxLayout *horizontalLayoutBtn1;
    QPushButton *AccueilBtn;
    QPushButton *TempEditBtn;
    QPushButton *LumEditBtn;
    QLabel *LumFixLabel;
    QSlider *OpacHorizontalSlider;
    QHBoxLayout *horizontalLayoutBtn2;
    QPushButton *PlanningEditBtn;
    QPushButton *ConfigEditBtn;
    QLabel *LumLabel;

    void setupUi(QMainWindow *OpacWindow)
    {
        if (OpacWindow->objectName().isEmpty())
            OpacWindow->setObjectName(QStringLiteral("OpacWindow"));
        OpacWindow->resize(320, 240);
        OpacWindow->setStyleSheet(QStringLiteral(""));
        centralwidget = new QWidget(OpacWindow);
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
"font-family:\"Segoe UI\", sans-serif;\n"
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
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn1->addWidget(AccueilBtn);

        TempEditBtn = new QPushButton(gridLayoutWidget);
        TempEditBtn->setObjectName(QStringLiteral("TempEditBtn"));
        TempEditBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	background: #D9534F;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"	outline: 0;\n"
"	border: 0;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	background: #b71c1c;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"	outline: 0;\n"
"	border: 0;\n"
"}"));

        horizontalLayoutBtn1->addWidget(TempEditBtn);

        LumEditBtn = new QPushButton(gridLayoutWidget);
        LumEditBtn->setObjectName(QStringLiteral("LumEditBtn"));
        LumEditBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
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
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #245680;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn1->addWidget(LumEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn1, 0, 1, 1, 1);

        LumFixLabel = new QLabel(gridLayoutWidget);
        LumFixLabel->setObjectName(QStringLiteral("LumFixLabel"));
        LumFixLabel->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;\n"
"\n"
""));

        gridLayout->addWidget(LumFixLabel, 2, 1, 1, 1);

        OpacHorizontalSlider = new QSlider(gridLayoutWidget);
        OpacHorizontalSlider->setObjectName(QStringLiteral("OpacHorizontalSlider"));
        OpacHorizontalSlider->setMinimum(0);
        OpacHorizontalSlider->setMaximum(100);
        OpacHorizontalSlider->setSingleStep(1);
        OpacHorizontalSlider->setPageStep(1);
        OpacHorizontalSlider->setValue(70);
        OpacHorizontalSlider->setSliderPosition(70);
        OpacHorizontalSlider->setOrientation(Qt::Horizontal);

        gridLayout->addWidget(OpacHorizontalSlider, 4, 1, 1, 1);

        horizontalLayoutBtn2 = new QHBoxLayout();
        horizontalLayoutBtn2->setObjectName(QStringLiteral("horizontalLayoutBtn2"));
        PlanningEditBtn = new QPushButton(gridLayoutWidget);
        PlanningEditBtn->setObjectName(QStringLiteral("PlanningEditBtn"));
        PlanningEditBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
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
"font-family:\"Segoe UI\", sans-serif;\n"
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
"font-family:\"Segoe UI\", sans-serif;\n"
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
"font-family:\"Segoe UI\", sans-serif;\n"
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

        LumLabel = new QLabel(gridLayoutWidget);
        LumLabel->setObjectName(QStringLiteral("LumLabel"));
        LumLabel->setStyleSheet(QStringLiteral("font-family:\"Segoe UI\", sans-serif;"));

        gridLayout->addWidget(LumLabel, 3, 1, 1, 1);

        OpacWindow->setCentralWidget(centralwidget);

        retranslateUi(OpacWindow);

        QMetaObject::connectSlotsByName(OpacWindow);
    } // setupUi

    void retranslateUi(QMainWindow *OpacWindow)
    {
        OpacWindow->setWindowTitle(QApplication::translate("OpacWindow", "Envio - Thermostat", 0));
        AccueilBtn->setText(QApplication::translate("OpacWindow", "Accueil", 0));
        TempEditBtn->setText(QApplication::translate("OpacWindow", "Temp\303\251rature", 0));
        LumEditBtn->setText(QApplication::translate("OpacWindow", "Lumi\303\250res", 0));
        LumFixLabel->setText(QApplication::translate("OpacWindow", "Opacit\303\251", 0));
        PlanningEditBtn->setText(QApplication::translate("OpacWindow", "Planning", 0));
        ConfigEditBtn->setText(QApplication::translate("OpacWindow", "Configuration", 0));
        LumLabel->setText(QApplication::translate("OpacWindow", "TextLabel", 0));
    } // retranslateUi

};

namespace Ui {
    class OpacWindow: public Ui_OpacWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_OPACWINDOW_H
