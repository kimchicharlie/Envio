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
    QPushButton *AddModeButton;
    QTableView *tableView;
    QLabel *DateLabel;
    QHBoxLayout *horizontalLayout;
    QPushButton *AccueilBtn;
    QHBoxLayout *horizontalLayout_2;
    QPushButton *PrevButton;
    QPushButton *NextButton;

    void setupUi(QMainWindow *PlanningWindow)
    {
        if (PlanningWindow->objectName().isEmpty())
            PlanningWindow->setObjectName(QStringLiteral("PlanningWindow"));
        PlanningWindow->resize(320, 240);
        PlanningWindow->setStyleSheet(QLatin1String("Background: #232123;\n"
""));
        centralwidget = new QWidget(PlanningWindow);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        gridLayoutWidget = new QWidget(centralwidget);
        gridLayoutWidget->setObjectName(QStringLiteral("gridLayoutWidget"));
        gridLayoutWidget->setGeometry(QRect(10, 10, 301, 221));
        gridLayout = new QGridLayout(gridLayoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        AddModeButton = new QPushButton(gridLayoutWidget);
        AddModeButton->setObjectName(QStringLiteral("AddModeButton"));
        QFont font;
        font.setFamily(QStringLiteral("Segoe UI,sans-serif"));
        font.setBold(true);
        font.setWeight(75);
        AddModeButton->setFont(font);
        AddModeButton->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));

        gridLayout->addWidget(AddModeButton, 6, 0, 1, 1, Qt::AlignVCenter);

        tableView = new QTableView(gridLayoutWidget);
        tableView->setObjectName(QStringLiteral("tableView"));
        tableView->setStyleSheet(QLatin1String("QTableView {\n"
"	background: #444;\n"
"	font-family:\"Segoe UI\", sans-serif;\n"
"    show-decoration-selected: 1; \n"
"}\n"
"\n"
"QTableView::item:alternate {\n"
"    background: #EEEEEE;\n"
"}\n"
"\n"
"QTableView::item:selected {\n"
"    border: 1px solid #6a6ea9;\n"
"}\n"
"\n"
"QTableView::item:selected:!active {\n"
"    background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 1,\n"
"                                stop: 0 #8588B2, stop: 1 #ABAFE5);\n"
"}\n"
"\n"
"QTableView::item:selected:active {\n"
"    background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 1,\n"
"                                stop: 0 #265726, stop: 1 #4cae4c);\n"
"}\n"
"\n"
"QTableView::item:hover {\n"
"    background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 1,\n"
"                                stop: 0 #5cb85c, stop: 1 #449d44);\n"
"}\n"
"\n"
"/*\n"
"QTableView\n"
"{\n"
"font-family: \"Montserrat\", sans-serif;\n"
"background: #f2f2f2;\n"
"box-sizing: border-box;\n"
"font-size: 12px;\n"
"}\n"
"*/\n"
"QTableView::item\n"
"{\n"
"    paddi"
                        "ng-left:10px;\n"
"    width:80px;\n"
"    height:20px;\n"
"    color: #EEE;\n"
"    border-bottom :1px solid #f0f0f0;\n"
"	font-size: 12px;\n"
"}\n"
""));

        gridLayout->addWidget(tableView, 5, 0, 1, 1);

        DateLabel = new QLabel(gridLayoutWidget);
        DateLabel->setObjectName(QStringLiteral("DateLabel"));
        DateLabel->setFont(font);
        DateLabel->setStyleSheet(QLatin1String("font-family:\"Segoe UI\", sans-serif;\n"
"text-transform: uppercase;\n"
"outline: 0;\n"
"border: 0;\n"
"padding: 5px;\n"
"color: #AAA;\n"
"font-size: 12px;\n"
"\n"
""));
        DateLabel->setAlignment(Qt::AlignCenter);

        gridLayout->addWidget(DateLabel, 4, 0, 1, 1);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        AccueilBtn = new QPushButton(gridLayoutWidget);
        AccueilBtn->setObjectName(QStringLiteral("AccueilBtn"));
        AccueilBtn->setFont(font);
        AccueilBtn->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));

        horizontalLayout->addWidget(AccueilBtn);


        gridLayout->addLayout(horizontalLayout, 0, 0, 1, 1);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        PrevButton = new QPushButton(gridLayoutWidget);
        PrevButton->setObjectName(QStringLiteral("PrevButton"));
        PrevButton->setFont(font);
        PrevButton->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));

        horizontalLayout_2->addWidget(PrevButton);

        NextButton = new QPushButton(gridLayoutWidget);
        NextButton->setObjectName(QStringLiteral("NextButton"));
        NextButton->setFont(font);
        NextButton->setStyleSheet(QLatin1String("QPushButton\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #5cb85c;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}\n"
"\n"
"QPushButton:hover\n"
"{\n"
"font-family:\"Segoe UI\", sans-serif;\n"
"	text-transform: uppercase;\n"
"	outline: 0;\n"
"	background: #449d44;\n"
"	border: 0;\n"
"	padding: 7px;\n"
"	color: #FFFFFF;\n"
"	font-size: 14px;\n"
"	border-radius: 7px;\n"
"}"));

        horizontalLayout_2->addWidget(NextButton);


        gridLayout->addLayout(horizontalLayout_2, 3, 0, 1, 1);

        PlanningWindow->setCentralWidget(centralwidget);

        retranslateUi(PlanningWindow);

        QMetaObject::connectSlotsByName(PlanningWindow);
    } // setupUi

    void retranslateUi(QMainWindow *PlanningWindow)
    {
        PlanningWindow->setWindowTitle(QApplication::translate("PlanningWindow", "Envio - Thermostat", 0));
        AddModeButton->setText(QApplication::translate("PlanningWindow", "Ajouter Mode", 0));
        DateLabel->setText(QApplication::translate("PlanningWindow", "TextLabel", 0));
        AccueilBtn->setText(QApplication::translate("PlanningWindow", "Accueil", 0));
        PrevButton->setText(QApplication::translate("PlanningWindow", "Pr\303\251c\303\251dent", 0));
        NextButton->setText(QApplication::translate("PlanningWindow", "Suivant", 0));
    } // retranslateUi

};

namespace Ui {
    class PlanningWindow: public Ui_PlanningWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_PLANNINGWINDOW_H
