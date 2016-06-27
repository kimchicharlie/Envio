#pragma once

// Project created on 06/04/2016 Ilyes Abd-Lillah
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] OK
//             Unit test  [ ] None
//             Release    [ ] None

// Includes //

#include <math.h>
#include <iostream>
#include <iomanip>
#include "CoreGraphical.h"

// Class //

class ComputeCore : public CoreGraphical 
{
public:
	ComputeCore();
	virtual ~ComputeCore();
	void getJsonResponse(std::wstring s);
public:
	double ComputeTerm(double TransLum, double Lux);
	const double getTempInt() const;
public:
	std::string _jsonResponse;
};