#include "Exception.hpp"

Exception::Exception(const std::string & type) throw() : msg(type)
{
}

Exception::~Exception() throw()
{
}

const char	*Exception::what() const throw()
{
	return (this->msg.data());
}