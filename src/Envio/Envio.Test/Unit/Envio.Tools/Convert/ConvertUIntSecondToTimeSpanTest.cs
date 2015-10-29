using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Envio.Test.Unit.Envio.Tools.Convert
{
    [TestClass]
    public class ConvertUIntSecondToTimeSpanTest
    {
        bool CompareTimeSpan(TimeSpan first, TimeSpan second)
        {
            if (first.Days != second.Days)
                return false;
            if (first.Hours != second.Hours)
                return false;
            if (first.Minutes != second.Minutes)
                return false;
            if (first.Seconds != second.Seconds)
                return false;
            if (first.Milliseconds != second.Milliseconds)
                return false;
            return true;
        }

        [TestMethod()]
        public void ConvertUIntSecondToTimeSpan0d0h0m30s0msSuccess()
        {
            uint seconds = 30;
            var compare = new TimeSpan(0, 0, 0, 30, 0);

            var tmp = global::Envio.Tools.Convert.ConvertUIntSecondToTimeSpan(seconds);
            Assert.IsTrue(this.CompareTimeSpan(compare, tmp), "Convertion fail");
        }

        [TestMethod()]
        public void ConvertUIntSecondToTimeSpan0d0h1m0s0msSuccess()
        {
            uint seconds = 60;
            var compare = new TimeSpan(0, 0, 1, 0, 0);

            var tmp = global::Envio.Tools.Convert.ConvertUIntSecondToTimeSpan(seconds);
            Assert.IsTrue(this.CompareTimeSpan(compare, tmp), "Convertion fail");
        }

        [TestMethod()]
        public void ConvertUIntSecondToTimeSpan0d0h1m30s0msSuccess()
        {
            uint seconds = 90;
            var compare = new TimeSpan(0, 0, 1, 30, 0);

            var tmp = global::Envio.Tools.Convert.ConvertUIntSecondToTimeSpan(seconds);
            Assert.IsTrue(this.CompareTimeSpan(compare, tmp), "Convertion fail");
        }

        [TestMethod()]
        public void ConvertUIntSecondToTimeSpan0d1h0m0s0msSuccess()
        {
            uint seconds = 3600;
            var compare = new TimeSpan(0, 1, 0, 0, 0);

            var tmp = global::Envio.Tools.Convert.ConvertUIntSecondToTimeSpan(seconds);
            Assert.IsTrue(this.CompareTimeSpan(compare, tmp), "Convertion fail");
        }

        [TestMethod()]
        public void ConvertUIntSecondToTimeSpan1d0h0m0s0msSuccess()
        {
            uint seconds = 3600*24;
            var compare = new TimeSpan(1, 0, 0, 0, 0);

            var tmp = global::Envio.Tools.Convert.ConvertUIntSecondToTimeSpan(seconds);
            Assert.IsTrue(this.CompareTimeSpan(compare, tmp), "Convertion fail");
        }

        [TestMethod()]
        public void ConvertUIntSecondToTimeSpan0d2h17m48s0msSuccess()
        {
            uint seconds = 8268;
            var compare = new TimeSpan(0, 2, 17, 48, 0);

            var tmp = global::Envio.Tools.Convert.ConvertUIntSecondToTimeSpan(seconds);
            Assert.IsTrue(this.CompareTimeSpan(compare, tmp), "Convertion fail");
        }

    }
}
