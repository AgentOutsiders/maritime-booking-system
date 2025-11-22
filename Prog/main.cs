using System;
using System.IO;
using System.Collections.Generic;



class appReservation
{

    struct structReservation
    {
        public int idLiaison, date;
        public string nom, heure, horodatage;
    }

    struct passagers
    {
        public string nom, prenom, codeCategorie;
    }

    struct vehicules
    {
        public string codeCategorie;
        public int quantite;
    }

    List<passagers> listePassagers;
    List<vehicules> listeVehicules;


    static void Main()
    {
        structReservation reservation;

        if (menu())
        {
            reservation = new structReservation();
            

            reservation.idLiaison = liaison();


            reservation.date = date();

            reservation.heure = heure(horaire(reservation.idLiaison, reservation.date));
            
            



        }

        else
        {
            return;
        }
    }


    static bool menu()
    {
        int reponse;

        Console.WriteLine("                                  TTTTTTTTTTTTTTTTTTT                                                \n                             TTTTTTTTTTTTTTTTTTTTTTTTTTTU                                           \n                         TTTTTT        TTTTTTTTTTTTTTTTTTTTT                     HG          H      \n                             HHHHHHHHI         TTTTTTTTTTTTTTT                  HHHH       HHHH     \n                      HHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTTT                HHHHH  HHHHHH      \n                  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI      TTTTTTTTTTTT              HHHHHH HHHHHH      \n               HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI       TTTTTTTTTTT             IHII HHHHH       \n            HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTT         TT    HH        \n         HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHII      TTTTTTTTTTTTTTTTTT HI  HHHHH      \n       HHHHHHHHHHH                   HHHHHHHHHHHHHHHHHHHHHHHHHHH         TTTTTS    HII   HHHHHHH    \n      HHHHHH                                HHHHHHHHHHHHHHHHHHHHHHHHIH          HHHH       HHHHHH   \n    HHH                                          HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH                  \n  HH                                                   HHHHHHHHHHHHHHHHHHHHHHH                      \n                                                              HHIHHHHIIH                            \n                      BB                                                                            \n                CCCCCCBBCCCCCC                CCC               CCCCCCB        CCCCCCCB             \n             CCCCB         CCC               CCCCC                 CCCCC         CCC                \n            CCCC            CC              CCCCCC                 CCCCCC        BCC                \n           CCCC                            BCC BCCC                CC CCCCC       CC                \n           CCCC                            CCC  CCCC               CC   CCCCC     CC                \n           CCCC                           CCC   CCCC               CC     CCCC    CC                \n           CCCC                           CCCCCCCCCCC              CC      BCCCC  CC                \n           BCCCB                         CC      BCCC              CC        CCCCBCC                \n            CCCCB           CCC         CCC       CCCC             CC         BCCCCC                \n              CCCCC        CCC         CCC         CCCC            CCB          CCCC                \n                 CCCCCCCCCCCC        CCCCCCC     CCCCCCCCB      CCCCCCCCB         CC                \n                                                                                                    \n                                                                                                    \n                                                                                                    \n           BCBCCCBBCCBBCCCCBCCBCCCB CBCCCCCCCCCCCCCCCCCCCB BBBBBBCBBCCCBCCBBBBBBBBCBCBC             \n           BCDCCBCDDCCCCCCCCCDCCCCBCBBCDCCDDCDDCDDDDDDDCD  CCCCC CCBCCCCBCCCBBBCBBCCCDD             \n");  
        Console.WriteLine("1.\tTapper \"1\" pour prendre une nouvelle réservation");
        Console.WriteLine("2.\tTapper \"2\" pour quitter");

        do
        {    
            reponse = int.Parse(Console.ReadLine());
            if(reponse == 1)
               {
                return true;
               }
            else if(reponse == 2)
                {
                    return false;
                }
            else
            {
                Console.WriteLine("Veuiller tapper une des 2 options.");
            }
        } while(reponse != 1);
        return false;
    }


    static int liaison()
    {
        int idLiaison;

        Console.WriteLine("Selectionner une liaison");
        Console.WriteLine("1.\tLorient - Groix");
        Console.WriteLine("2.\tGroix - Lorient");
        Console.WriteLine("3.\tQuiberon - Le Palais");
        Console.WriteLine("4.\tLe Palais - Quiberon");

        do
        {
            idLiaison = int.Parse(Console.ReadLine());
            if(!(idLiaison == 1 || idLiaison == 2 || idLiaison == 3 || idLiaison == 4))
            {
                Console.WriteLine("Veuiller tapper une des 4 options.");
            }
        } while(!(idLiaison == 1 || idLiaison == 2 || idLiaison == 3 || idLiaison == 4));
        return idLiaison;
    }


    static int date()
    {
        int date;

        Console.WriteLine("Merci d'indiquer une date");

        do
            {
                date = int.Parse(Console.ReadLine());
                if(date > 30 || date < 1)
                {
                    Console.WriteLine("Il semble y avoir une erreur dans la date indiqué.");
                }
            } while(date > 30 || date < 1);
            return date;
    }



    static List<string> horaire(int idLiaison, int date)
    {

        switch(idLiaison)
        {
            case 1:
            {
                List<string> tabHoraire1 = new List<string> {"08:05", "11:00", "13:45", "16:15", "18:45"};

                if(date == 1 || date == 11 || date%7 == 2)
                {
                    return new List<string> { "09:45", "12:15", "17:00", "19:30" };
                }

                else if(date == 13)
                {
                    tabHoraire1.Remove("16:15");
                    return tabHoraire1;
                }

                else
                {
                    return tabHoraire1;
                }
            }

            case 2:
            {
                List<string> tabHoraire2 = new List<string> { "06:50", "09:30", "12:30", "15:00", "17:30" };
                if(date == 1 || date == 11 || date%7 == 2)
                {
                    return new List<string> { "08:30", "11:00", "15:45", "18:15" };
                }

                else if(date == 13)
                {
                    tabHoraire2.Remove("09:30");
                    return tabHoraire2;
                }

                else
                {
                    return tabHoraire2;
                }
            }
        }
        return new List<string> {};
    }


    
    static string heure(List<string> horaire)
    {
        int selection;
        int compteur = 0;
        Console.WriteLine("Merci d'indiquer une horaire");
        foreach(string element in horaire)
        {
            compteur = compteur + 1;
            Console.WriteLine(compteur+".\t"+element);
        }
        do
            {
                selection = int.Parse(Console.ReadLine());
                if(selection > horaire.Count || selection < 1)
                {
                    Console.WriteLine("Il semble y avoir une erreur dans la date indiqué.");
                }
            } while(selection > horaire.Count || selection < 1);
            return horaire[selection-1];
    }

    
}