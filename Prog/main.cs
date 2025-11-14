using System;
using System.IO;
class Ex
{
    static void Main()
    {
        int reponse;
        Console.WriteLine("                                  TTTTTTTTTTTTTTTTTTT                                                \n                             TTTTTTTTTTTTTTTTTTTTTTTTTTTU                                           \n                         TTTTTT        TTTTTTTTTTTTTTTTTTTTT                     HG          H      \n                             HHHHHHHHI         TTTTTTTTTTTTTTT                  HHHH       HHHH     \n                      HHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTTT                HHHHH  HHHHHH      \n                  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI      TTTTTTTTTTTT              HHHHHH HHHHHH      \n               HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI       TTTTTTTTTTT             IHII HHHHH       \n            HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTT         TT    HH        \n         HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHII      TTTTTTTTTTTTTTTTTT HI  HHHHH      \n       HHHHHHHHHHH                   HHHHHHHHHHHHHHHHHHHHHHHHHHH         TTTTTS    HII   HHHHHHH    \n      HHHHHH                                HHHHHHHHHHHHHHHHHHHHHHHHIH          HHHH       HHHHHH   \n    HHH                                          HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH                  \n  HH                                                   HHHHHHHHHHHHHHHHHHHHHHH                      \n                                                              HHIHHHHIIH                            \n                      BB                                                                            \n                CCCCCCBBCCCCCC                CCC               CCCCCCB        CCCCCCCB             \n             CCCCB         CCC               CCCCC                 CCCCC         CCC                \n            CCCC            CC              CCCCCC                 CCCCCC        BCC                \n           CCCC                            BCC BCCC                CC CCCCC       CC                \n           CCCC                            CCC  CCCC               CC   CCCCC     CC                \n           CCCC                           CCC   CCCC               CC     CCCC    CC                \n           CCCC                           CCCCCCCCCCC              CC      BCCCC  CC                \n           BCCCB                         CC      BCCC              CC        CCCCBCC                \n            CCCCB           CCC         CCC       CCCC             CC         BCCCCC                \n              CCCCC        CCC         CCC         CCCC            CCB          CCCC                \n                 CCCCCCCCCCCC        CCCCCCC     CCCCCCCCB      CCCCCCCCB         CC                \n                                                                                                    \n                                                                                                    \n                                                                                                    \n           BCBCCCBBCCBBCCCCBCCBCCCB CBCCCCCCCCCCCCCCCCCCCB BBBBBBCBBCCCBCCBBBBBBBBCBCBC             \n           BCDCCBCDDCCCCCCCCCDCCCCBCBBCDCCDDCDDCDDDDDDDCD  CCCCC CCBCCCCBCCCBBBCBBCCCDD             \n");  
        Console.WriteLine("1.\tTapper \"1\" pour prendre une nouvelle réservation");
        Console.WriteLine("2.\tTapper \"2\" pour quitter");
        reponse = int.Parse(Console.ReadLine());
        if(reponse == 1)
           {
            Console.WriteLine("Work in progress");
           }
        else if(reponse == 0)
            {
                return ;
            }
        
    }


    static void reservation()
    {
        if (File.Exists("Passagers.txt"))
        {
            
        }
    }

}