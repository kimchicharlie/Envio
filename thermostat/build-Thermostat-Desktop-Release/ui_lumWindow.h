/********************************************************************************
** Form generated from reading UI file 'lumWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_LUMWINDOW_H
#define UI_LUMWINDOW_H

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

class Ui_LumWindow
{
public:
    QWidget *centralwidget;
    QWidget *gridLayoutWidget;
    QGridLayout *gridLayout;
    QHBoxLayout *horizontalLayoutBtn1;
    QPushButton *AccueilBtn;
    QPushButton *TempEditBtn;
    QPushButton *OpacEditBtn;
    QLabel *LumFixLabel;
    QSlider *LumHorizontalSlider;
    QHBoxLayout *horizontalLayoutBtn2;
    QPushButton *PlanningEditBtn;
    QPushButton *ConfigEditBtn;
    QLabel *LumLabel;

    void setupUi(QMainWindow *LumWindow)
    {
        if (LumWindow->objectName().isEmpty())
            LumWindow->setObjectName(QStringLiteral("LumWindow"));
        LumWindow->resize(320, 240);
        LumWindow->setStyleSheet(QStringLiteral(""));
        centralwidget = new QWidget(LumWindow);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        gridLayoutWidget = new QWidget(centralwidget);
        gridLayoutWidget->setObjectName(QStringLiteral("gridLayoutWidget"));
        gridLayoutWidget->setGeometry(QRect(-1, 0, 321, 241));
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
"	outline: 0;\n"
"	background: #d9534f;\n"
"	width: 100%;\n"
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
"	background: #c9302c;\n"
"	width: 100%;\n"
"	border: 0;\n"
"	padding: 10px;\n"
"	color: #FFFFFF;\n"
"	font-size: 12px;\n"
"}"));

        horizontalLayoutBtn1->addWidget(TempEditBtn);

        OpacEditBtn = new QPushButton(gridLayoutWidget);
        OpacEditBtn->setObjectName(QStringLiteral("OpacEditBtn"));

        horizontalLayoutBtn1->addWidget(OpacEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn1, 0, 1, 1, 1);

        LumFixLabel = new QLabel(gridLayoutWidget);
        LumFixLabel->setObjectName(QStringLiteral("LumFixLabel"));
        LumFixLabel->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
" text-transform: uppercase;\n"
" outline: 0; \n"
"width: 100%; \n"
"border: 0;\n"
" padding: 10px;\n"
"color: #4d4d4d;\n"
"font-size: 14px;"));

        gridLayout->addWidget(LumFixLabel, 2, 1, 1, 1);

        LumHorizontalSlider = new QSlider(gridLayoutWidget);
        LumHorizontalSlider->setObjectName(QStringLiteral("LumHorizontalSlider"));
        LumHorizontalSlider->setStyleSheet(QLatin1String("QSlider::groove:horizontal {\n"
"border: 1px solid #bbb;\n"
"background: white;\n"
"height: 10px;\n"
"border-radius: 4px;\n"
"}\n"
"\n"
"QSlider::sub-page:horizontal {\n"
"background: qlineargradient(x1: 0, y1: 0,    x2: 0, y2: 1,\n"
"    stop: 0 #00CCCC, stop: 1 #008C8C);\n"
"background: qlineargradient(x1: 0, y1: 0.2, x2: 1, y2: 1,\n"
"    stop: 0 #00CCCC, stop: 1 #008C8C);\n"
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
        LumHorizontalSlider->setMinimum(0);
        LumHorizontalSlider->setMaximum(100);
        LumHorizontalSlider->setSingleStep(1);
        LumHorizontalSlider->setPageStep(1);
        LumHorizontalSlider->setValue(70);
        LumHorizontalSlider->setSliderPosition(70);
        LumHorizontalSlider->setOrientation(Qt::Horizontal);

        gridLayout->addWidget(LumHorizontalSlider, 4, 1, 1, 1);

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
        LumLabel->setStyleSheet(QStringLiteral("font-family:\"Segoe UI\", sans-serif;text-transform: uppercase; outline: 0; width: 100%; border: 0; padding: 10px;color: #0288d1;font-size: 48px;"));

        gridLayout->addWidget(LumLabel, 3, 1, 1, 1);

        LumWindow->setCentralWidget(centralwidget);

        retranslateUi(LumWindow);

        QMetaObject::connectSlotsByName(LumWindow);
    } // setupUi

    void retranslateUi(QMainWindow *LumWindow)
    {
        LumWindow->setWindowTitle(QApplication::translate("LumWindow", "Envio - Thermostat", 0));
        AccueilBtn->setText(QApplication::translate("LumWindow", "Accueil", 0));
        TempEditBtn->setText(QApplication::translate("LumWindow", "Temp\303\251rature", 0));
        OpacEditBtn->setText(QApplication::translate("LumWindow", "Vitres", 0));
        LumFixLabel->setText(QApplication::translate("LumWindow", "Lumi\303\250re", 0));
        PlanningEditBtn->setText(QApplication::translate("LumWindow", "Planning", 0));
        ConfigEditBtn->setText(QApplication::translate("LumWindow", "Configuration", 0));
        LumLabel->setText(QApplication::translate("LumWindow", "TextLabel", 0));
    } // retranslateUi

};

namespace Ui {
    class LumWindow: public Ui_LumWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_LUMWINDOW_H
