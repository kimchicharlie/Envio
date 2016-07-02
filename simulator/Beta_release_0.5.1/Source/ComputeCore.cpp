// Created by Ilyes Abd-Lillah 
// 01.04.2016 - 22.14

#include "ComputeCore.hh"

ComputeCore::ComputeCore()
{
}

ComputeCore::~ComputeCore()
{
}

void ComputeCore::getJsonResponse(std::wstring s)
{
	std::string ss1(s.begin(), s.end());
	this->_jsonResponse = ss1;
}
