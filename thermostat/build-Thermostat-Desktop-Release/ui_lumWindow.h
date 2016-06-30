/********************************************************************************
** Form generated from reading UI file 'lumWindow.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
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
        gridLayoutWidget->setGeometry(QRect(9, 9, 301, 211));
        gridLayout = new QGridLayout(gridLayoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayoutBtn1 = new QHBoxLayout();
        horizontalLayoutBtn1->setObjectName(QStringLiteral("horizontalLayoutBtn1"));
        AccueilBtn = new QPushButton(gridLayoutWidget);
        AccueilBtn->setObjectName(QStringLiteral("AccueilBtn"));

        horizontalLayoutBtn1->addWidget(AccueilBtn);

        TempEditBtn = new QPushButton(gridLayoutWidget);
        TempEditBtn->setObjectName(QStringLiteral("TempEditBtn"));

        horizontalLayoutBtn1->addWidget(TempEditBtn);

        OpacEditBtn = new QPushButton(gridLayoutWidget);
        OpacEditBtn->setObjectName(QStringLiteral("OpacEditBtn"));

        horizontalLayoutBtn1->addWidget(OpacEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn1, 0, 1, 1, 1);

        LumFixLabel = new QLabel(gridLayoutWidget);
        LumFixLabel->setObjectName(QStringLiteral("LumFixLabel"));

        gridLayout->addWidget(LumFixLabel, 2, 1, 1, 1);

        LumHorizontalSlider = new QSlider(gridLayoutWidget);
        LumHorizontalSlider->setObjectName(QStringLiteral("LumHorizontalSlider"));
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

        horizontalLayoutBtn2->addWidget(PlanningEditBtn);

        ConfigEditBtn = new QPushButton(gridLayoutWidget);
        ConfigEditBtn->setObjectName(QStringLiteral("ConfigEditBtn"));

        horizontalLayoutBtn2->addWidget(ConfigEditBtn);


        gridLayout->addLayout(horizontalLayoutBtn2, 1, 1, 1, 1);

        LumLabel = new QLabel(gridLayoutWidget);
        LumLabel->setObjectName(QStringLiteral("LumLabel"));

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
