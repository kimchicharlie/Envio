/********************************************************************************
** Form generated from reading UI file 'planningWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_PLANNINGWINDOW_H
#define UI_PLANNINGWINDOW_H

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
#include <QtWidgets/QTableView>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_PlanningWindow
{
public:
    QWidget *centralwidget;
    QWidget *gridLayoutWidget;
    QGridLayout *gridLayout;
    QHBoxLayout *horizontalLayout;
    QPushButton *AccueilBtn;
    QLabel *DateLabel;
    QPushButton *AddModeButton;
    QHBoxLayout *horizontalLayout_2;
    QPushButton *PrevButton;
    QPushButton *NextButton;
    QTableView *tableView;

    void setupUi(QMainWindow *PlanningWindow)
    {
        if (PlanningWindow->objectName().isEmpty())
            PlanningWindow->setObjectName(QStringLiteral("PlanningWindow"));
        PlanningWindow->resize(320, 240);
        PlanningWindow->setStyleSheet(QStringLiteral(""));
        centralwidget = new QWidget(PlanningWindow);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        gridLayoutWidget = new QWidget(centralwidget);
        gridLayoutWidget->setObjectName(QStringLiteral("gridLayoutWidget"));
        gridLayoutWidget->setGeometry(QRect(0, 0, 322, 241));
        gridLayout = new QGridLayout(gridLayoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        AccueilBtn = new QPushButton(gridLayoutWidget);
        AccueilBtn->setObjectName(QStringLiteral("AccueilBtn"));

        horizontalLayout->addWidget(AccueilBtn);


        gridLayout->addLayout(horizontalLayout, 0, 0, 1, 1);

        DateLabel = new QLabel(gridLayoutWidget);
        DateLabel->setObjectName(QStringLiteral("DateLabel"));
        DateLabel->setAlignment(Qt::AlignCenter);

        gridLayout->addWidget(DateLabel, 4, 0, 1, 1);

        AddModeButton = new QPushButton(gridLayoutWidget);
        AddModeButton->setObjectName(QStringLiteral("AddModeButton"));

        gridLayout->addWidget(AddModeButton, 6, 0, 1, 1);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        PrevButton = new QPushButton(gridLayoutWidget);
        PrevButton->setObjectName(QStringLiteral("PrevButton"));

        horizontalLayout_2->addWidget(PrevButton);

        NextButton = new QPushButton(gridLayoutWidget);
        NextButton->setObjectName(QStringLiteral("NextButton"));

        horizontalLayout_2->addWidget(NextButton);


        gridLayout->addLayout(horizontalLayout_2, 3, 0, 1, 1);

        tableView = new QTableView(gridLayoutWidget);
        tableView->setObjectName(QStringLiteral("tableView"));

        gridLayout->addWidget(tableView, 5, 0, 1, 1);

        PlanningWindow->setCentralWidget(centralwidget);

        retranslateUi(PlanningWindow);

        QMetaObject::connectSlotsByName(PlanningWindow);
    } // setupUi

    void retranslateUi(QMainWindow *PlanningWindow)
    {
        PlanningWindow->setWindowTitle(QApplication::translate("PlanningWindow", "Envio - Thermostat", 0));
        AccueilBtn->setText(QApplication::translate("PlanningWindow", "Accueil", 0));
        DateLabel->setText(QApplication::translate("PlanningWindow", "TextLabel", 0));
        AddModeButton->setText(QApplication::translate("PlanningWindow", "Ajouter Mode", 0));
        PrevButton->setText(QApplication::translate("PlanningWindow", "Pr\303\251c\303\251dent", 0));
        NextButton->setText(QApplication::translate("PlanningWindow", "Suivant", 0));
    } // retranslateUi

};

namespace Ui {
    class PlanningWindow: public Ui_PlanningWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_PLANNINGWINDOW_H
