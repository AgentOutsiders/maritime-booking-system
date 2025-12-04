using System;
using System.IO;
using System.Collections.Generic;
using Newtonsoft.Json;



class appReservation
{

    struct structReservation
    {
        public int idLiaison, date;
        public string nom, heure, horodatage;
    }

    struct structPassagers
    {
        public string nom, prenom, codeCategorie;
    }

    struct structVehicules
    {
        public string codeCategorie;
        public int quantite;
    }


    static void Main()
    {
        structReservation reservation;

        if (menu())
        {

            reservation = new structReservation();

            reservation.nom = nomReservation();

            reservation.idLiaison = liaison();


            reservation.date = date();


            reservation.heure = heure(horaire(reservation.idLiaison, reservation.date));

            List<structPassagers> listePassagers;
            listePassagers = new List<structPassagers>();
            funcPassagers(listePassagers);
            
            List<structVehicules> listeVehicules;
            listeVehicules = new List<structVehicules>();
            funcVehicules(listeVehicules);

            reservation.horodatage = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

            affichage(reservation, listePassagers, listeVehicules);

            genererFichierJson(reservation, listePassagers, listeVehicules);
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

    static string nomReservation()
    {
        Console.WriteLine("Veuiller saisir le nom de la reservation.");
        return Console.ReadLine();
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
        string json = File.ReadAllText("horaires.json");
        var donne = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, List<string>>>>(json);
        return donne[idLiaison.ToString()][date.ToString()];
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


    static void funcPassagers(List<structPassagers> list)
    {
        int reponse, age, nbPassagers;
        do
        {
            Console.WriteLine("Merci d'indiquer le nombre de passagers.");
            nbPassagers = int.Parse(Console.ReadLine());
            if(nbPassagers <= 0)
            {
                Console.WriteLine("Il semble y avoir une erreur dans le nombres de passagers indiqué.");
            }
        }while(nbPassagers <= 0);

        for(int i = 0; i < nbPassagers; i++)
        {
            structPassagers passagerTemp;
            passagerTemp = new structPassagers();
            do
            {
                Console.WriteLine("Merci d'indiquer s'il s'agit d'un animal de compagnie");
                Console.WriteLine("1.\tTapper \"1\" oui");
                Console.WriteLine("2.\tTapper \"2\" non");
                reponse = int.Parse(Console.ReadLine());
                if(!(reponse == 1 || reponse == 2))
                {
                    Console.WriteLine("Veuiller tapper une des 2 options.");
                }
            }while(!(reponse == 1 || reponse == 2));
            if(reponse == 2)
            {
                do
                {
                    Console.WriteLine("Merci d'indiquer l'age du passager numero "+(i+1));
                    age = int.Parse(Console.ReadLine());
                    if(age < 0)
                    {
                        Console.WriteLine("Ile semble y avoir une erreur dans l'age donné");
                    }
                }while(age < 0);
                if(age >= 26)
                {
                    passagerTemp.codeCategorie = "adu26p";
                }
                else if(age >= 18)
                {
                    passagerTemp.codeCategorie = "jeu1825";
                }
                
                else if(age >= 4)
                {
                    passagerTemp.codeCategorie = "enf417";
                }
                
                else
                {
                    passagerTemp.codeCategorie = "bebe";
                }
            }
            else
            {
                passagerTemp.codeCategorie = "ancomp";
            }




            do
            { 
                Console.WriteLine("Merci d'indiquer le nom du passager numero "+(i+1));
                passagerTemp.nom = Console.ReadLine();
                if(passagerTemp.nom == "")
                {
                    Console.WriteLine("Ile semble y avoir une erreur dans le nom donné");
                }
            }while(passagerTemp.nom == "");
            do
            {
                Console.WriteLine("Merci d'indiquer le prenom du passager numero "+(i+1));
                passagerTemp.prenom = Console.ReadLine();
                if(passagerTemp.prenom == "")
                {
                    Console.WriteLine("Ile semble y avoir une erreur dans le prenom donné");
                }
            }while(passagerTemp.prenom == "");
            list.Add(passagerTemp);
            
        }

        
    }

    static void funcVehicules(List<structVehicules> list)
    {
        string[] codesCategories = new string[]
        {
            "trot",     // 1. Trottinette
            "velo",     // 2. Vélo
            "velelec",  // 3. Vélo électrique
            "cartand",  // 4. Vélo cargo
            "mobil",    // 5. Deux-roues <= 125
            "moto",     // 6. Deux-roues > 125
            "cat1",     // 7. Voiture < 4m
            "cat2",     // 8. Voiture 4m à 4.39m
            "cat3",     // 9. Voiture 4.40m à 4.79m
            "cat4",     // 10. Voiture > 4.80m
            "camp"      // 11. Camping-car
        };
        int reponse;
        do
        {
            Console.WriteLine("Y a t'il des véhicules ?");
            Console.WriteLine("1.\tTapper \"1\" oui");
            Console.WriteLine("2.\tTapper \"2\" non");

            reponse = int.Parse(Console.ReadLine());
            if(!(reponse == 1 || reponse == 2))
            {
                Console.WriteLine("Veuiller tapper une des 2 options.");
            }
        }while(!(reponse == 1 || reponse == 2));
        if(reponse == 1)
        {
            do
            {
                structVehicules vehiculesTemp;
                vehiculesTemp = new structVehicules();
                
                do
                {
                    Console.WriteLine("0.\tTapper \"0\" Pas plus de véhicules");
                    Console.WriteLine("1.\tTapper \"1\" Trottinette électrique");
                    Console.WriteLine("2.\tTapper \"2\" Vélo ou remorque à vélo");
                    Console.WriteLine("3.\tTapper \"3\" Vélo électrique");
                    Console.WriteLine("4.\tTapper \"4\" Vélo cargo ou tandem");
                    Console.WriteLine("5.\tTapper \"5\" Deux-roues <= 125 cm3");
                    Console.WriteLine("6.\tTapper \"6\" Deux-roues > 125 cm3");
                    Console.WriteLine("7.\tTapper \"7\" Voiture moins de 4 m");
                    Console.WriteLine("8.\tTapper \"8\" Voiture de 4 m à 4.39 m");
                    Console.WriteLine("9.\tTapper \"9\" Voiture de 4.40 m à 4.79 m");
                    Console.WriteLine("10.\tTapper \"10\" Voiture 4.80 m et plus");
                    Console.WriteLine("11.\tTapper \"11\" Camping-car - véhicule plus de 2.10 de haut");
                    reponse = int.Parse(Console.ReadLine());

                    if(!(reponse <= 11 && reponse >= 0))
                    {
                        Console.WriteLine("Il semble y avoir une erreur dans la categorie selectionnée.");
                    }
                }while(!(reponse <= 11 && reponse >= 0));

                if(reponse == 0)
                {
                    return;
                }

                else
                {
                    vehiculesTemp.codeCategorie = codesCategories[reponse-1];
                    do
                    {
                        Console.WriteLine("Merci de Saisir le nombre.");
                        reponse = int.Parse(Console.ReadLine());
                        if(reponse < 0)
                        {
                            Console.WriteLine("Il semble y avoir une erreur dans le nombre indiqué.");
                        }
                    } while (reponse < 0);
                    vehiculesTemp.quantite = reponse;
                    list.Add(vehiculesTemp);
                }
            }while(reponse != 0);
        }
    }


    static void affichage(structReservation reservation, List<structPassagers> listePassagers, List<structVehicules> listeVehicules)
    {

        Dictionary<string, double[]> tarifsPassagers = new Dictionary<string, double[]>
        {
            // Structure : { "Code", new double[] { Prix Groix, Prix Belle-Ile } }
            { "adu26p",  new double[] { 18.75, 18.80 } },
            { "jeu1825", new double[] { 13.80, 14.10 } },
            { "enf417",  new double[] { 11.25, 11.65 } },
            { "bebe",    new double[] { 0.0, 0.0 } },    // 0.0 pour gratuit
            { "ancomp",  new double[] { 3.35, 3.35 } }
        };

        Dictionary<string, double[]> tarifsVehicules = new Dictionary<string, double[]>
        {
            // Structure : { "Code", new double[] { Prix Groix, Prix Belle-Ile } }
            { "trot",    new double[] { 4.70, 4.70 } },
            { "velo",    new double[] { 8.20, 8.20 } },
            { "velelec", new double[] { 11.00, 11.00 } },
            { "cartand", new double[] { 16.45, 16.45 } },
            { "mobil",   new double[] { 23.10, 23.35 } },
            { "moto",    new double[] { 66.05, 66.40 } },
            { "cat1",    new double[] { 96.05, 98.50 } },
            { "cat2",    new double[] { 114.80, 117.20 } },
            { "cat3",    new double[] { 174.45, 176.90 } },
            { "cat4",    new double[] { 210.90, 213.35 } },
            { "camp",    new double[] { 330.20, 332.70 } }
        };
        double prix = 0;

        Console.WriteLine("########################################");
        Console.WriteLine("       RÉCAPITULATIF DE RÉSERVATION      ");
        Console.WriteLine("########################################\n");

        // --- 1. Informations du trajet ---

        // On transforme le numéro de liaison en texte pour que l'utilisateur comprenne
        string nomLiaison = "";
        switch (reservation.idLiaison)
        {
            case 1: nomLiaison = "Lorient - Groix"; break;
            case 2: nomLiaison = "Groix - Lorient"; break;
            case 3: nomLiaison = "Quiberon - Le Palais"; break;
            case 4: nomLiaison = "Le Palais - Quiberon"; break;
            default: nomLiaison = "Trajet inconnu"; break;
        }

        Console.WriteLine("Date de réservation : " + reservation.horodatage);
        Console.WriteLine("Trajet : " + nomLiaison);
        Console.WriteLine("Départ le 2025-11-" + reservation.date.ToString("D2"));

        // --- 2. Liste des passagers ---

        Console.WriteLine("\n--- PASSAGERS (" + listePassagers.Count + ") ---");

        // On boucle sur la liste pour afficher chaque passager
        foreach (structPassagers p in listePassagers)
        {
            Console.WriteLine(" - " + p.prenom + " " + p.nom + " (Code : " + p.codeCategorie + ")");
            prix = prix + tarifsPassagers[p.codeCategorie][(int)(reservation.idLiaison / 2)];
        }

        // --- 3. Liste des véhicules ---

        Console.WriteLine("\n--- VÉHICULES ---");

        if (listeVehicules.Count == 0)
        {
            Console.WriteLine(" Aucun véhicule.");
        }
        else
        {
            // On boucle sur la liste des véhicules
            foreach (structVehicules v in listeVehicules)
            {
                Console.WriteLine(" - " + v.quantite + " x " + v.codeCategorie);
                prix = prix + tarifsVehicules[v.codeCategorie][(int)(reservation.idLiaison / 2)] * v.quantite;
            }
        }
        Console.WriteLine(prix);

        Console.WriteLine("\n########################################");
        Console.WriteLine("Merci pour votre réservation !");
        Console.ReadKey(); // Attend que l'utilisateur appuie sur une touche avant de finir
    }

    static void genererFichierJson(structReservation res, List<structPassagers> passagers, List<structVehicules> vehicules)
{
    // 1. On formate la date pour qu'elle ressemble à "2025-11-01"
    // On suppose que l'année est 2025 et le mois 11 (Novembre) selon ton exemple
    string dateFormatee = $"2025-11-{res.date:00}"; // :00 permet d'avoir "01" au lieu de "1"

    // 2. On construit la structure EXACTE du JSON demandé
    // On crée un tableau [] contenant un objet anonyme new { ... }
    var donneesExport = new object[]
    {
        new 
        {
            reservation = res,
            passagers = passagers, // Ta liste de structs matche déjà le JSON
            vehicules = vehicules  // Ta liste de vehicules matche aussi
        }
    };

    // 3. Sérialisation
    string jsonFinal = JsonConvert.SerializeObject(donneesExport, Formatting.Indented);

    // 4. Création d'un nom de fichier unique
    // On nettoie le nom pour éviter les caractères interdits dans les noms de fichiers
    string nomFichier = $"reservation_{res.nom}_{DateTime.Now:yyyyMMdd_HHmmss}.json";
    nomFichier = nomFichier.Replace(" ", "_"); // Remplace les espaces par des _

    // 5. Écriture
    File.WriteAllText(nomFichier, jsonFinal);
    Console.WriteLine($"\n[Succès] Fichier de sauvegarde créé : {nomFichier}");
}

    
}