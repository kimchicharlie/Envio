#pragma once

// Project created on 06/02/2015 by Maxime Reynié & Ilyes Abd-Lillah
// [ENVIO_001] Alpha test [x] OK
// ----------- Beta test  [x] None
//             Unit test  [ ] None
//             Release    [ ] None

// Includes //

#include <math.h>
#include <iostream>
#include <iomanip>

// Class //

class ComputeCore {
public:
	ComputeCore();
	virtual ~ComputeCore();
public:
	double ComputeTerm(double TransLum, double Lux);
	const double getTempInt() const;
public:
	double _tempIntValue;
};

//