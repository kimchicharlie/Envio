/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

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
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QWidget *gridLayoutWidget;
    QGridLayout *gridLayout_2;
    QHBoxLayout *horizontalLayout_2;
    QLabel *TempLabel;
    QLabel *LumLabel;
    QLabel *OpacLabel;
    QHBoxLayout *horizontalLayout;
    QPushButton *TempEditButton;
    QPushButton *LumEditButton;
    QPushButton *OpacEditButton;
    QHBoxLayout *horizontalLayout_4;
    QLabel *tempTxtlabel;
    QLabel *LumTxtLabel;
    QLabel *opacTxtLabel;
    QHBoxLayout *horizontalLayout_3;
    QPushButton *PlanningEditButton;
    QPushButton *ConfigEditButton;
    QHBoxLayout *horizontalLayout_5;
    QLabel *DateLabel;
    QLabel *roomLabel;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(320, 240);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        gridLayoutWidget = new QWidget(centralWidget);
        gridLayoutWidget->setObjectName(QStringLiteral("gridLayoutWidget"));
        gridLayoutWidget->setGeometry(QRect(10, 10, 301, 211));
        gridLayout_2 = new QGridLayout(gridLayoutWidget);
        gridLayout_2->setSpacing(6);
        gridLayout_2->setContentsMargins(11, 11, 11, 11);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        gridLayout_2->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        TempLabel = new QLabel(gridLayoutWidget);
        TempLabel->setObjectName(QStringLiteral("TempLabel"));
        TempLabel->setAlignment(Qt::AlignCenter);

        horizontalLayout_2->addWidget(TempLabel);

        LumLabel = new QLabel(gridLayoutWidget);
        LumLabel->setObjectName(QStringLiteral("LumLabel"));
        LumLabel->setAlignment(Qt::AlignCenter);

        horizontalLayout_2->addWidget(LumLabel);

        OpacLabel = new QLabel(gridLayoutWidget);
        OpacLabel->setObjectName(QStringLiteral("OpacLabel"));
        OpacLabel->setAlignment(Qt::AlignCenter);

        horizontalLayout_2->addWidget(OpacLabel);


        gridLayout_2->addLayout(horizontalLayout_2, 5, 0, 1, 1);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        TempEditButton = new QPushButton(gridLayoutWidget);
        TempEditButton->setObjectName(QStringLiteral("TempEditButton"));

        horizontalLayout->addWidget(TempEditButton);

        LumEditButton = new QPushButton(gridLayoutWidget);
        LumEditButton->setObjectName(QStringLiteral("LumEditButton"));

        horizontalLayout->addWidget(LumEditButton);

        OpacEditButton = new QPushButton(gridLayoutWidget);
        OpacEditButton->setObjectName(QStringLiteral("OpacEditButton"));

        horizontalLayout->addWidget(OpacEditButton);


        gridLayout_2->addLayout(horizontalLayout, 0, 0, 1, 1);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setSpacing(6);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        tempTxtlabel = new QLabel(gridLayoutWidget);
        tempTxtlabel->setObjectName(QStringLiteral("tempTxtlabel"));
        tempTxtlabel->setAlignment(Qt::AlignCenter);

        horizontalLayout_4->addWidget(tempTxtlabel);

        LumTxtLabel = new QLabel(gridLayoutWidget);
        LumTxtLabel->setObjectName(QStringLiteral("LumTxtLabel"));
        LumTxtLabel->setAlignment(Qt::AlignCenter);

        horizontalLayout_4->addWidget(LumTxtLabel);

        opacTxtLabel = new QLabel(gridLayoutWidget);
        opacTxtLabel->setObjectName(QStringLiteral("opacTxtLabel"));
        opacTxtLabel->setAlignment(Qt::AlignCenter);

        horizontalLayout_4->addWidget(opacTxtLabel);


        gridLayout_2->addLayout(horizontalLayout_4, 4, 0, 1, 1);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setSpacing(6);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        PlanningEditButton = new QPushButton(gridLayoutWidget);
        PlanningEditButton->setObjectName(QStringLiteral("PlanningEditButton"));

        horizontalLayout_3->addWidget(PlanningEditButton);

        ConfigEditButton = new QPushButton(gridLayoutWidget);
        ConfigEditButton->setObjectName(QStringLiteral("ConfigEditButton"));

        horizontalLayout_3->addWidget(ConfigEditButton);


        gridLayout_2->addLayout(horizontalLayout_3, 1, 0, 1, 1);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(6);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        DateLabel = new QLabel(gridLayoutWidget);
        DateLabel->setObjectName(QStringLiteral("DateLabel"));
        DateLabel->setMaximumSize(QSize(16777215, 50));

        horizontalLayout_5->addWidget(DateLabel);

        roomLabel = new QLabel(gridLayoutWidget);
        roomLabel->setObjectName(QStringLiteral("roomLabel"));

        horizontalLayout_5->addWidget(roomLabel);


        gridLayout_2->addLayout(horizontalLayout_5, 2, 0, 1, 1);

        MainWindow->setCentralWidget(centralWidget);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "Envio - Thermostat", 0));
        TempLabel->setText(QString());
        LumLabel->setText(QString());
        OpacLabel->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        TempEditButton->setText(QApplication::translate("MainWindow", "Temp\303\251rature", 0));
        LumEditButton->setText(QApplication::translate("MainWindow", "Luminosit\303\251", 0));
        OpacEditButton->setText(QApplication::translate("MainWindow", "Vitres", 0));
        tempTxtlabel->setText(QApplication::translate("MainWindow", "Temp\303\251rature", 0));
        LumTxtLabel->setText(QApplication::translate("MainWindow", "Luminosit\303\251", 0));
        opacTxtLabel->setText(QApplication::translate("MainWindow", "Opacit\303\251", 0));
        PlanningEditButton->setText(QApplication::translate("MainWindow", "Planning", 0));
        ConfigEditButton->setText(QApplication::translate("MainWindow", "Configuration", 0));
        DateLabel->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        roomLabel->setText(QApplication::translate("MainWindow", "TextLabel", 0));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
