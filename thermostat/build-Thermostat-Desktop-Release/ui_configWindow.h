/********************************************************************************
** Form generated from reading UI file 'configWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CONFIGWINDOW_H
#define UI_CONFIGWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QListView>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ConfigWindow
{
public:
    QWidget *centralwidget;
    QWidget *gridLayoutWidget;
    QGridLayout *gridLayout;
    QHBoxLayout *horizontalLayout;
    QHBoxLayout *horizontalLayout_2;
    QPushButton *AccueilBtn;
    QListView *listView;
    QHBoxLayout *horizontalLayout_3;
    QPushButton *TempDispButton;
    QPushButton *HourDispButton;
    QLabel *msgLabel;

    void setupUi(QMainWindow *ConfigWindow)
    {
        if (ConfigWindow->objectName().isEmpty())
            ConfigWindow->setObjectName(QStringLiteral("ConfigWindow"));
        ConfigWindow->resize(320, 240);
        centralwidget = new QWidget(ConfigWindow);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        gridLayoutWidget = new QWidget(centralwidget);
        gridLayoutWidget->setObjectName(QStringLiteral("gridLayoutWidget"));
        gridLayoutWidget->setGeometry(QRect(0, 0, 321, 241));
        gridLayout = new QGridLayout(gridLayoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
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

        horizontalLayout_2->addWidget(AccueilBtn);


        horizontalLayout->addLayout(horizontalLayout_2);


        gridLayout->addLayout(horizontalLayout, 0, 0, 1, 1);

        listView = new QListView(gridLayoutWidget);
        listView->setObjectName(QStringLiteral("listView"));
        listView->setStyleSheet(QLatin1String("QListView {\n"
"	background: #f2f2f2;\n"
"	font-family: \"Montserrat\", sans-serif;\n"
"    show-decoration-selected: 1; \n"
"}\n"
"\n"
"QListView::item:alternate {\n"
"    background: #EEEEEE;\n"
"}\n"
"\n"
"QListView::item:selected {\n"
"    border: 1px solid #6a6ea9;\n"
"}\n"
"\n"
"QListView::item:selected:!active {\n"
"    background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 1,\n"
"                                stop: 0 #ABAFE5, stop: 1 #8588B2);\n"
"}\n"
"\n"
"QListView::item:selected:active {\n"
"    background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 1,\n"
"                                stop: 0 #4cae4c, stop: 1 #265726);\n"
"}\n"
"\n"
"QListView::item:hover {\n"
"    background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 1,\n"
"                                stop: 0 #5cb85c, stop: 1 #449d44);\n"
"}\n"
"\n"
"/*\n"
"QListView\n"
"{\n"
"font-family: \"Montserrat\", sans-serif;\n"
"background: #f2f2f2;\n"
"box-sizing: border-box;\n"
"font-size: 12px;\n"
"}\n"
"\n"
"QListView::item\n"
"{\n"
"    padding-l"
                        "eft:10px;\n"
"    width:80px;\n"
"    height:20px;\n"
"    color: #5a5a5a;\n"
"    border-bottom :1px solid #f0f0f0;\n"
"	font-size: 12px;\n"
"}\n"
"*/"));

        gridLayout->addWidget(listView, 6, 0, 1, 1);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        TempDispButton = new QPushButton(gridLayoutWidget);
        TempDispButton->setObjectName(QStringLiteral("TempDispButton"));
        TempDispButton->setStyleSheet(QLatin1String("QPushButton\n"
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

        horizontalLayout_3->addWidget(TempDispButton);

        HourDispButton = new QPushButton(gridLayoutWidget);
        HourDispButton->setObjectName(QStringLiteral("HourDispButton"));
        HourDispButton->setStyleSheet(QLatin1String("QPushButton\n"
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

        horizontalLayout_3->addWidget(HourDispButton);


        gridLayout->addLayout(horizontalLayout_3, 3, 0, 1, 1);

        msgLabel = new QLabel(gridLayoutWidget);
        msgLabel->setObjectName(QStringLiteral("msgLabel"));
        msgLabel->setStyleSheet(QLatin1String("font-family: \"Montserrat\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"width: 100%;\n"
"border: 0;\n"
"padding: 5px;\n"
"color: #4d4d4d;\n"
"font-size: 12px;\n"
""));

        gridLayout->addWidget(msgLabel, 4, 0, 1, 1);

        ConfigWindow->setCentralWidget(centralwidget);

        retranslateUi(ConfigWindow);

        QMetaObject::connectSlotsByName(ConfigWindow);
    } // setupUi

    void retranslateUi(QMainWindow *ConfigWindow)
    {
        ConfigWindow->setWindowTitle(QApplication::translate("ConfigWindow", "Envio - Thermostat", 0));
        AccueilBtn->setText(QApplication::translate("ConfigWindow", "Accueil", 0));
        TempDispButton->setText(QApplication::translate("ConfigWindow", "\302\260F", 0));
        HourDispButton->setText(QApplication::translate("ConfigWindow", "12h", 0));
        msgLabel->setText(QApplication::translate("ConfigWindow", "TextLabel", 0));
    } // retranslateUi

};

namespace Ui {
    class ConfigWindow: public Ui_ConfigWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CONFIGWINDOW_H
