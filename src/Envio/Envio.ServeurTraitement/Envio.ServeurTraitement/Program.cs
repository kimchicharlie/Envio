using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Envio.ServeurTraitement
{

    //refs
    //http://herve.silve.pagesperso-orange.fr/bilan_th.htm
    //http://ptaff.ca/soleil/?l1pays=France&l1etat=Haute-Garonne&l1ville=Toulouse&l2pays=&l2etat=&l1cityname=Toulouse%2C+Haute-Garonne%2C+France&l1ltd=43&l1ltm=37&l1lts=0&l1ltx=N&l1lgd=1&l1lgm=26&l1lgs=59&l1lgx=E&l1tz=1.0&l1dst=EU&l2cityname=&l2ltd=&l2ltm=&l2lts=&l2ltx=N&l2lgd=&l2lgm=&l2lgs=&l2lgx=E&l2tz=0&l2dst=&year=2015&month=03&day=20&lang=fr_CA&go=Voir+le+graphe%21
    class Program
    {
        private double curTemp;
        private double curOpac;
        private double curLum;
        private double wantLum;
        private double wantTemp;

        private double newClimVal;
        private double newLumVal;
        private double newOpacVal;

        private double glassArea;
        private double[] _factG;
        private double _u;
        private double _wattHFOD;

        public Program()
        {
            _factG = new double[4];
            _factG[0] = 0.42;
            _factG[1] = 0.14;
            _factG[2] = 0.09;
            _factG[3] = 0.05;
            _u = 0.7;
        }

        double  getWattHFOD()
        {
            return (_wattHFOD);
        }

        //get the height, depth and width of the room and compute
        void setWattHFOD()
        {
            //_wattHFOD = (H * l * L) / 3.6;
            _wattHFOD = 2.5 * 5.0 * 4.0 / 3.6;
        }


        void calcValForLum()
        {

        }

        void calcValForTemp()
        {

        }

        double	CalcEnergyGlass()
        {
            return (CalcLumEnergy() + CalcTempEnergy());
        }

        double	CalcTempEnergy()
        {
            return (this._u * this.glassArea *
                (this.GetExtTemp() - this.GetIntTemp()));
        }

        // get the ouside temperature
        double	GetExtTemp()
        {
            return (15.3);
        }

        // get the inside temperature
        double GetIntTemp()
        {
            return (20.5);
        }

        // return the wanted temperature
        double  GetWantedTemp()
        {
            return (20.5);
        }

        // get the irradiation in the database using the zone, the month and the orientation
        double getIrradiation()
        {
            return (114.2);
        }

        double CalcLumEnergy()
        {
            return (this.glassArea * this.getIrradiation()
                * this._factG[0]);
        }

        double CalcEnergy()
        {
            return (((this.GetIntTemp() - this.GetWantedTemp()) * this._wattHFOD) +
                this.CalcEnergyGlass());
        }


        static void Main(string[] args)
        {
        }
    }
}
