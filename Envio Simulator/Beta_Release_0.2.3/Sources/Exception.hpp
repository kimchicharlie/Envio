// Ilyes Abd-Lillah - EPITECH 3 --->
// Exception.hpp

#pragma once

#include <exception>
#include "CoreGraphical.h"

class Exception : public std::exception
{
public:
	Exception(std::string const & type) throw();
	virtual ~Exception() throw();

public:
	virtual const char	*what() const throw();

protected:
	std::string	msg;
};
