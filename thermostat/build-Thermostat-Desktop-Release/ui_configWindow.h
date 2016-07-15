/********************************************************************************
** Form generated from reading UI file 'configWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
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
        gridLayoutWidget->setGeometry(QRect(0, 0, 311, 231));
        gridLayout = new QGridLayout(gridLayoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        AccueilBtn = new QPushButton(gridLayoutWidget);
        AccueilBtn->setObjectName(QStringLiteral("AccueilBtn"));

        horizontalLayout_2->addWidget(AccueilBtn);


        horizontalLayout->addLayout(horizontalLayout_2);


        gridLayout->addLayout(horizontalLayout, 0, 0, 1, 1);

        listView = new QListView(gridLayoutWidget);
        listView->setObjectName(QStringLiteral("listView"));

        gridLayout->addWidget(listView, 6, 0, 1, 1);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        TempDispButton = new QPushButton(gridLayoutWidget);
        TempDispButton->setObjectName(QStringLiteral("TempDispButton"));

        horizontalLayout_3->addWidget(TempDispButton);

        HourDispButton = new QPushButton(gridLayoutWidget);
        HourDispButton->setObjectName(QStringLiteral("HourDispButton"));

        horizontalLayout_3->addWidget(HourDispButton);


        gridLayout->addLayout(horizontalLayout_3, 3, 0, 1, 1);

        msgLabel = new QLabel(gridLayoutWidget);
        msgLabel->setObjectName(QStringLiteral("msgLabel"));

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
