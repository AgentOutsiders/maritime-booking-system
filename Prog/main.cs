using System;
using System.IO;
class Ex
{
    struct reserv
    {
        public int idLiaison;
        public string nom, date, heure, horodatage;
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
        int reponse;
        Console.WriteLine("                                  TTTTTTTTTTTTTTTTTTT                                                \n                             TTTTTTTTTTTTTTTTTTTTTTTTTTTU                                           \n                         TTTTTT        TTTTTTTTTTTTTTTTTTTTT                     HG          H      \n                             HHHHHHHHI         TTTTTTTTTTTTTTT                  HHHH       HHHH     \n                      HHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTTT                HHHHH  HHHHHH      \n                  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI      TTTTTTTTTTTT              HHHHHH HHHHHH      \n               HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI       TTTTTTTTTTT             IHII HHHHH       \n            HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTT         TT    HH        \n         HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHII      TTTTTTTTTTTTTTTTTT HI  HHHHH      \n       HHHHHHHHHHH                   HHHHHHHHHHHHHHHHHHHHHHHHHHH         TTTTTS    HII   HHHHHHH    \n      HHHHHH                                HHHHHHHHHHHHHHHHHHHHHHHHIH          HHHH       HHHHHH   \n    HHH                                          HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH                  \n  HH                                                   HHHHHHHHHHHHHHHHHHHHHHH                      \n                                                              HHIHHHHIIH                            \n                      BB                                                                            \n                CCCCCCBBCCCCCC                CCC               CCCCCCB        CCCCCCCB             \n             CCCCB         CCC               CCCCC                 CCCCC         CCC                \n            CCCC            CC              CCCCCC                 CCCCCC        BCC                \n           CCCC                            BCC BCCC                CC CCCCC       CC                \n           CCCC                            CCC  CCCC               CC   CCCCC     CC                \n           CCCC                           CCC   CCCC               CC     CCCC    CC                \n           CCCC                           CCCCCCCCCCC              CC      BCCCC  CC                \n           BCCCB                         CC      BCCC              CC        CCCCBCC                \n            CCCCB           CCC         CCC       CCCC             CC         BCCCCC                \n              CCCCC        CCC         CCC         CCCC            CCB          CCCC                \n                 CCCCCCCCCCCC        CCCCCCC     CCCCCCCCB      CCCCCCCCB         CC                \n                                                                                                    \n                                                                                                    \n                                                                                                    \n           BCBCCCBBCCBBCCCCBCCBCCCB CBCCCCCCCCCCCCCCCCCCCB BBBBBBCBBCCCBCCBBBBBBBBCBCBC             \n           BCDCCBCDDCCCCCCCCCDCCCCBCBBCDCCDDCDDCDDDDDDDCD  CCCCC CCBCCCCBCCCBBBCBBCCCDD             \n");  
        Console.WriteLine("1.\tTapper \"1\" pour prendre une nouvelle réservation");
        Console.WriteLine("2.\tTapper \"2\" pour quitter");
        do
        {    
            reponse = int.Parse(Console.ReadLine());
            if(reponse == 1)
               {
                Console.WriteLine("Work in progress");
                reservation();
               }
            else if(reponse == 2)
                {
                    return ;
                }
            else
            {
                Console.WriteLine("Veuiller tapper une des 2 options.");
            }
        } while(reponse != 1);
        
    }


    static void reservation()
    {
        if (File.Exists("passagers.json"))
        { 
            reserv = new reserv();
            string[] horaireId1Special = {"09:45", "12:15", "17:00", "19:30"};
            string[] horaireId1 = {"08:05", "11:00", "13:45", "16:15", "18:45"};

            string[] horaireId2Special = {"08:30", "11:00", "15:45", "18:15"};
            string[] horaireId2 = {"06:50", "09:30", "12:30", "15:00", "17:30"};

            string[] horaireid3Special = {"08:30", "11:00", "15:45", "18:15"};
            string[] horaireId3 = {"06:50", "09:30", "12:30", "15:00", "17:30"};

            string[] horaireid4Special = {"08:30", "11:00", "15:45", "18:15"};
            string[] horaireId4 = {"06:50", "09:30", "12:30", "15:00", "17:30"};

            FileStream fs = new FileStream("passagers.json", FileMode.Append, FileAccess.Write);
            StreamWriter passagers = new StreamWriter(fs);

            Console.WriteLine("Selectionner une liaison");
            Console.WriteLine("1.\tLorient – Groix");
            Console.WriteLine("2.\tGroix – Lorient");
            Console.WriteLine("3.\tQuiberon – Le Palais");
            Console.WriteLine("4.\tLe Palais – Quiberon");

            do
            {
                reserv.idLiaison = int.Parse(Console.ReadLine());
                if(!(idLiaison == 1 || idLiaison == 2 || idLiaison == 3 || idLiaison == 4))
                {
                    Console.WriteLine("Veuiller tapper une des 4 options.");
                }
            } while(!(idLiaison == 1 || idLiaison == 2 || idLiaison == 3 || idLiaison == 4));



            Console.WriteLine("Merci d'indiquer une date");
            do
            {
                date = int.Parse(Console.ReadLine());
                if(date > 30 || date < 1)
                {
                    Console.WriteLine("Il semble y avoir une erreur dans la date indiqué.");
                }
            } while(date > 30 || date < 1);

            if(date == 1 || date == 11 || date%7 == 2)
            {
                Console.WriteLine("Selectionner une horaire");
                Console.WriteLine("1.\t9:45");
                Console.WriteLine("1.\t12:15&");
                Console.WriteLine("1.\tLorient – Groix");
                Console.WriteLine("1.\tLorient – Groix");
            }
        }
    }

}