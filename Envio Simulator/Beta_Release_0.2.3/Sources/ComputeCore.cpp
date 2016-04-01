// Created by Ilyes Abd-Lillah 
// 01.02.2015 - 22.14

#include "ComputeCore.hh"

ComputeCore::ComputeCore()
{
	this->_tempIntValue = 0.f;
}

ComputeCore::~ComputeCore()
{
}

const double ComputeCore::getTempInt() const
{
	return (this->_tempIntValue);
}