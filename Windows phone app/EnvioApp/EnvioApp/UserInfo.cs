using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnvioApp
{
    class UserInfo
    {
        public User user;
        public string guid { get; set; }
        override public string ToString() {
            return ("User: " + user._id + " - email: " + user.email + " - firsname: " + user.firstName +
                "lastName: " + user.lastName + " - pwd: " + user.password + " - organisation: " + user.organisation +
            "guid: " + guid + " - __v: " + user.__v);
        }
    }
}
