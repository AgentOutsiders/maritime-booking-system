using System;
using System.IO;
using System.Collections.Generic;
using Newtonsoft.Json;

class appReservation
{
    // --- Structures de données ---
    // Ces structures servent à organiser les informations du programme

    struct structReservation
    {
        public int idLiaison;
        public string nom, heure, horodatage, date;
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

    // --- Programme Principal ---
    static void Main()
    {
        structReservation reservation;

        // On lance le menu et on récupère le choix de l'utilisateur
        int menuVal = menu();

        // Si l'utilisateur choisit 1 (Aller simple) ou 2 (Aller-Retour)
        if (menuVal == 1 || menuVal == 2)
        {
            reservation = new structReservation();

            // 1. Récupération des infos de base (Nom et Trajet)
            reservation.nom = nomReservation();
            reservation.idLiaison = liaison();

            // 2. Gestion de la date de l'aller
            int dateNonFormatee = date();
            reservation.date = $"2025-11-{dateNonFormatee:00}";

            // 3. Gestion de l'heure via le fichier JSON des horaires
            reservation.heure = heure(horaire(reservation.idLiaison, dateNonFormatee));

            // 4. Gestion des passagers
            List<structPassagers> listePassagers;
            listePassagers = new List<structPassagers>();
            funcPassagers(listePassagers);

            // 5. Gestion des véhicules
            List<structVehicules> listeVehicules;
            listeVehicules = new List<structVehicules>();
            funcVehicules(listeVehicules);

            // 6. Ajout de la date et l'heure actuelle (horodatage de la commande)
            reservation.horodatage = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

            // --- Gestion spécifique pour l'Aller-Retour ---
            if (menuVal == 2)
            {
                Console.WriteLine("Vous avez choisi une réservation aller-retour. Nous allons maintenant saisir les informations pour le retour.");
                
                // On crée la réservation retour en copiant les infos de base
                structReservation reservation2 = reservation;

                // Calcul automatique du trajet inverse (ex: si 1 -> devient 2)
                reservation2.idLiaison = reservation.idLiaison % 2 == 0 ? reservation.idLiaison - 1 : reservation.idLiaison + 1;

                // Saisie de la date et l'heure pour le retour
                dateNonFormatee = date();
                reservation2.date = $"2025-11-{dateNonFormatee:00}";
                reservation2.heure = heure(horaire(reservation2.idLiaison, dateNonFormatee));

                // 7. Affichage du récapitulatif complet (Aller + Retour)
                affichage(reservation, listePassagers, listeVehicules, reservation2);
                
                // 8. Sauvegarde des deux trajets dans le fichier
                genererFichierJson(reservation, listePassagers, listeVehicules, reservation2);
            }
            // --- Gestion pour l'Aller Simple ---
            else
            {
                // 7. Affichage du récapitulatif simple
                affichage(reservation, listePassagers, listeVehicules);
                
                // 8. Sauvegarde du trajet unique dans le fichier
                genererFichierJson(reservation, listePassagers, listeVehicules);
            }
        }
        else
        {
            // L'utilisateur a choisi de quitter (Option 3)
            return;
        }
    }

    // --- Fonctions d'affichage et de saisie ---

    // Affiche le logo et le menu principal
    static int menu()
    {
        int reponse;

        // Affichage du logo ASCII
        Console.WriteLine("                                  TTTTTTTTTTTTTTTTTTT                                                \n                             TTTTTTTTTTTTTTTTTTTTTTTTTTTU                                           \n                         TTTTTT        TTTTTTTTTTTTTTTTTTTTT                     HG          H      \n                             HHHHHHHHI         TTTTTTTTTTTTTTT                  HHHH       HHHH     \n                      HHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTTT                HHHHH  HHHHHH      \n                  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI      TTTTTTTTTTTT              HHHHHH HHHHHH      \n               HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHI       TTTTTTTTTTT             IHII HHHHH       \n            HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH      TTTTTTTTTTTTT         TT    HH        \n         HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHII      TTTTTTTTTTTTTTTTTT HI  HHHHH      \n       HHHHHHHHHHH                   HHHHHHHHHHHHHHHHHHHHHHHHHHH         TTTTTS    HII   HHHHHHH    \n      HHHHHH                                HHHHHHHHHHHHHHHHHHHHHHHHIH          HHHH       HHHHHH   \n    HHH                                          HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH                  \n  HH                                                   HHHHHHHHHHHHHHHHHHHHHHH                      \n                                                              HHIHHHHIIH                            \n                      BB                                                                            \n                CCCCCCBBCCCCCC                CCC               CCCCCCB        CCCCCCCB             \n             CCCCB         CCC               CCCCC                 CCCCC         CCC                \n            CCCC            CC              CCCCCC                 CCCCCC        BCC                \n           CCCC                            BCC BCCC                CC CCCCC       CC                \n           CCCC                            CCC  CCCC               CC   CCCCC     CC                \n           CCCC                           CCC   CCCC               CC     CCCC    CC                \n           CCCC                           CCCCCCCCCCC              CC      BCCCC  CC                \n           BCCCB                         CC      BCCC              CC        CCCCBCC                \n            CCCCB           CCC         CCC       CCCC             CC         BCCCCC                \n              CCCCC        CCC         CCC         CCCC            CCB          CCCC                \n                 CCCCCCCCCCCC        CCCCCCC     CCCCCCCCB      CCCCCCCCB         CC                \n                                                                                                    \n                                                                                                    \n                                                                                                    \n           BCBCCCBBCCBBCCCCBCCBCCCB CBCCCCCCCCCCCCCCCCCCCB BBBBBBCBBCCCBCCBBBBBBBBCBCBC             \n           BCDCCBCDDCCCCCCCCCDCCCCBCBBCDCCDDCDDCDDDDDDDCD  CCCCC CCBCCCCBCCCBBBCBBCCCDD             \n");
        Console.WriteLine("1.\tTapez \"1\" pour prendre une nouvelle réservation aller");
        Console.WriteLine("2.\tTapez \"2\" pour prendre une nouvelle réservation aller-retour");
        Console.WriteLine("3.\tTapez \"3\" pour quitter");

        // Boucle pour forcer une réponse valide (1, 2 ou 3)
        do
        {
            int.TryParse(Console.ReadLine(), out reponse);

            if (reponse == 1)
            {
                return 1;
            }
            else if (reponse == 2)
            {
                return 2;
            }
            else if (reponse == 3)
            {
                return 0;
            }
            else
            {
                Console.WriteLine("Veuillez taper une des 3 options.");
            }
        } while (true);
    }

    // Demande le nom de la réservation
    static string nomReservation()
    {
        Console.WriteLine("Veuillez saisir le nom de la réservation.");
        return Console.ReadLine();
    }

    // Demande de choisir la liaison (trajet)
    static int liaison()
    {
        int idLiaison;

        Console.WriteLine("Sélectionnez une liaison");
        Console.WriteLine("1.\tLorient - Groix");
        Console.WriteLine("2.\tGroix - Lorient");
        Console.WriteLine("3.\tQuiberon - Le Palais");
        Console.WriteLine("4.\tLe Palais - Quiberon");

        do
        {
            int.TryParse(Console.ReadLine(), out idLiaison);

            if (!(idLiaison == 1 || idLiaison == 2 || idLiaison == 3 || idLiaison == 4))
            {
                Console.WriteLine("Veuillez taper une des 4 options.");
            }
        } while (!(idLiaison == 1 || idLiaison == 2 || idLiaison == 3 || idLiaison == 4));
        return idLiaison;
    }

    // Demande la date (jour du mois)
    static int date()
    {
        int date;
        Console.WriteLine("Merci d'indiquer une date");

        do
        {
            int.TryParse(Console.ReadLine(), out date);

            if (date > 30 || date < 1)
            {
                Console.WriteLine("Il semble y avoir une erreur dans la date indiquée.");
            }
        } while (date > 30 || date < 1);
        return date;
    }

    // Charge les horaires depuis un fichier JSON externe
    static List<string> horaire(int idLiaison, int date)
    {
        string json = File.ReadAllText("horaires.json");
        var donne = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, List<string>>>>(json);
        // Récupère la liste des heures selon la liaison et la date
        return donne[idLiaison.ToString()][date.ToString()];
    }

    // Affiche les heures disponibles et demande à l'utilisateur de choisir
    static string heure(List<string> horaire)
    {
        int selection;
        int compteur = 0;
        Console.WriteLine("Merci d'indiquer un horaire");

        foreach (string element in horaire)
        {
            compteur = compteur + 1;
            Console.WriteLine(compteur + ".\t" + element);
        }

        do
        {
            // CORRECTION ICI
            int.TryParse(Console.ReadLine(), out selection);

            if (selection > horaire.Count || selection < 1)
            {
                Console.WriteLine("Il semble y avoir une erreur dans la date indiquée."); 
            }
        } while (selection > horaire.Count || selection < 1);

        return horaire[selection - 1];
    }

    // Gère la saisie des passagers (âge, catégorie, noms)
    static void funcPassagers(List<structPassagers> list)
    {
        int reponse, age, nbPassagers;

        do
        {
            Console.WriteLine("Merci d'indiquer le nombre de passagers.");
            // CORRECTION 1
            int.TryParse(Console.ReadLine(), out nbPassagers);

            if (nbPassagers <= 0)
            {
                Console.WriteLine("Il semble y avoir une erreur dans le nombre de passagers indiqué.");
            }
        } while (nbPassagers <= 0);

        // Boucle pour remplir les infos de chaque passager
        for (int i = 0; i < nbPassagers; i++)
        {
            structPassagers passagerTemp;
            passagerTemp = new structPassagers();

            // Vérifie si c'est un animal ou un humain
            do
            {
                Console.WriteLine("Merci d'indiquer s'il s'agit d'un animal de compagnie");
                Console.WriteLine("1.\tTapez \"1\" oui");
                Console.WriteLine("2.\tTapez \"2\" non");
                int.TryParse(Console.ReadLine(), out reponse);

                if (!(reponse == 1 || reponse == 2))
                {
                    Console.WriteLine("Veuillez taper une des 2 options.");
                }
            } while (!(reponse == 1 || reponse == 2));

            // Si ce n'est pas un animal, on demande l'âge pour la catégorie
            if (reponse == 2)
            {
                do
                {
                    Console.WriteLine("Merci d'indiquer l'âge du passager numéro " + (i + 1));
                    int.TryParse(Console.ReadLine(), out age);

                    if (age < 0)
                    {
                        Console.WriteLine("Il semble y avoir une erreur dans l'âge donné");
                    }
                } while (age < 0);

                // Attribution du code catégorie selon l'âge
                if (age >= 26) { passagerTemp.codeCategorie = "adu26p"; }
                else if (age >= 18) { passagerTemp.codeCategorie = "jeu1825"; }
                else if (age >= 4) { passagerTemp.codeCategorie = "enf417"; }
                else { passagerTemp.codeCategorie = "bebe"; }
            }
            else
            {
                passagerTemp.codeCategorie = "ancomp";
            }

            // Saisie du nom et prénom
            do
            {
                Console.WriteLine("Merci d'indiquer le nom du passager numéro " + (i + 1));
                passagerTemp.nom = Console.ReadLine();
                if (passagerTemp.nom == "")
                {
                    Console.WriteLine("Il semble y avoir une erreur dans le nom donné");
                }
            } while (passagerTemp.nom == "");

            do
            {
                Console.WriteLine("Merci d'indiquer le prénom du passager numéro " + (i + 1));
                passagerTemp.prenom = Console.ReadLine();
                if (passagerTemp.prenom == "")
                {
                    Console.WriteLine("Il semble y avoir une erreur dans le prénom donné");
                }
            } while (passagerTemp.prenom == "");

            // Ajout à la liste principale
            list.Add(passagerTemp);
        }
    }

    // Gère la saisie des véhicules
    static void funcVehicules(List<structVehicules> list)
    {
        // Tableau de correspondance entre choix utilisateur et codes catégories
        string[] codesCategories = new string[]
        {
            "trot", "velo", "velelec", "cartand", "mobil",
            "moto", "cat1", "cat2", "cat3", "cat4", "camp"
        };
        int reponse;

        // Demande s'il y a des véhicules à enregistrer
        do
        {
            Console.WriteLine("Y a-t-il des véhicules ?");
            Console.WriteLine("1.\tTapez \"1\" oui");
            Console.WriteLine("2.\tTapez \"2\" non");

            int.TryParse(Console.ReadLine(), out reponse);

            if (!(reponse == 1 || reponse == 2))
            {
                Console.WriteLine("Veuillez taper une des 2 options.");
            }
        } while (!(reponse == 1 || reponse == 2));

        if (reponse == 1)
        {
            do
            {
                structVehicules vehiculesTemp;
                vehiculesTemp = new structVehicules();

                // Menu des types de véhicules
                do
                {
                    Console.WriteLine("0.\tTapez \"0\" Pas plus de véhicules");
                    Console.WriteLine("1.\tTapez \"1\" Trottinette électrique");
                    Console.WriteLine("2.\tTapez \"2\" Vélo ou remorque à vélo");
                    Console.WriteLine("3.\tTapez \"3\" Vélo électrique");
                    Console.WriteLine("4.\tTapez \"4\" Vélo cargo ou tandem");
                    Console.WriteLine("5.\tTapez \"5\" Deux-roues <= 125 cm3");
                    Console.WriteLine("6.\tTapez \"6\" Deux-roues > 125 cm3");
                    Console.WriteLine("7.\tTapez \"7\" Voiture moins de 4 m");
                    Console.WriteLine("8.\tTapez \"8\" Voiture de 4 m à 4.39 m");
                    Console.WriteLine("9.\tTapez \"9\" Voiture de 4.40 m à 4.79 m");
                    Console.WriteLine("10.\tTapez \"10\" Voiture 4.80 m et plus");
                    Console.WriteLine("11.\tTapez \"11\" Camping-car - véhicule plus de 2.10 de haut");
                    int.TryParse(Console.ReadLine(), out reponse);

                    if (!(reponse <= 11 && reponse >= 0))
                    {
                        Console.WriteLine("Il semble y avoir une erreur dans la catégorie sélectionnée.");
                    }
                } while (!(reponse <= 11 && reponse >= 0));

                // Si 0, on sort de la fonction
                if (reponse == 0)
                {
                    return;
                }
                else
                {
                    // Enregistrement de la catégorie et quantité
                    vehiculesTemp.codeCategorie = codesCategories[reponse - 1];
                    do
                    {
                        Console.WriteLine("Merci de saisir le nombre.");
                        int.TryParse(Console.ReadLine(), out reponse);

                        if (reponse < 0)
                        {
                            Console.WriteLine("Il semble y avoir une erreur dans le nombre indiqué.");
                        }
                    } while (reponse < 0);

                    vehiculesTemp.quantite = reponse;
                    list.Add(vehiculesTemp);
                }
            } while (reponse != 0);
        }
    }

    // Affiche le récapitulatif final et calcule le prix (gère l'aller et le retour optionnel)
    static void affichage(structReservation reservation, List<structPassagers> listePassagers, List<structVehicules> listeVehicules, structReservation? reservation2 = null)
    {
        // --- Configuration des tarifs ---
        // Index 0 = Liaisons Groix (1 et 2)
        // Index 1 = Liaisons Belle-Île (3 et 4)
        Dictionary<string, double[]> tarifsPassagers = new Dictionary<string, double[]>
        {
            { "adu26p",  new double[] { 18.75, 18.80 } },
            { "jeu1825", new double[] { 13.80, 14.10 } },
            { "enf417",  new double[] { 11.25, 11.65 } },
            { "bebe",    new double[] { 0.0, 0.0 } },
            { "ancomp",  new double[] { 3.35, 3.35 } }
        };

        Dictionary<string, double[]> tarifsVehicules = new Dictionary<string, double[]>
        {
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

        Console.Clear();
        Console.WriteLine("########################################");
        Console.WriteLine("       RÉCAPITULATIF DE RÉSERVATION      ");
        Console.WriteLine("########################################\n");

        // 1. Détermination de l'index du tarif (Unique pour l'aller et le retour)
        // Si l'ID est 1 ou 2, c'est l'index 0. Sinon (3 ou 4), c'est l'index 1.
        int indexTarif = (reservation.idLiaison <= 2) ? 0 : 1;

        // 2. Affichage Aller
        Console.WriteLine("--- TRAJET ALLER ---");
        afficherDetailsTrajet(reservation);

        // Calcul du prix d'un trajet simple
        double prixTrajetSimple = calculerPrix(listePassagers, listeVehicules, indexTarif, tarifsPassagers, tarifsVehicules);
        double prixTotal = prixTrajetSimple;

        // 3. Gestion du Retour (si applicable)
        if (reservation2 != null)
        {
            Console.WriteLine("\n--- TRAJET RETOUR ---");
            afficherDetailsTrajet(reservation2.Value);

            // Puisque le tarif aller = tarif retour, on ajoute le même montant
            prixTotal += prixTrajetSimple;
        }

        // 4. Détails et Total
        Console.WriteLine("\n--- DÉTAILS ---");
        Console.WriteLine($"Passagers : {listePassagers.Count}");
        foreach (structPassagers p in listePassagers)
        {
            Console.WriteLine($" - {p.prenom} {p.nom} ({p.codeCategorie})");
        }

        if (listeVehicules.Count > 0)
        {
            Console.WriteLine("Véhicules :");
            foreach (structVehicules v in listeVehicules)
            {
                Console.WriteLine($" - {v.quantite} x {v.codeCategorie}");
            }
        }
        else
        {
            Console.WriteLine("Aucun véhicule.");
        }

        Console.WriteLine("\n########################################");
        Console.WriteLine($" TOTAL À PAYER : {prixTotal:F2} €");
        Console.WriteLine("########################################");
        Console.WriteLine("Merci pour votre réservation !");
        Console.ReadKey();
    }

    // Affiche les infos d'une liaison spécifique proprement
    static void afficherDetailsTrajet(structReservation res)
    {
        string nomLiaison = "";
        switch (res.idLiaison)
        {
            case 1: nomLiaison = "Lorient - Groix"; break;
            case 2: nomLiaison = "Groix - Lorient"; break;
            case 3: nomLiaison = "Quiberon - Le Palais"; break;
            case 4: nomLiaison = "Le Palais - Quiberon"; break;
        }
        Console.WriteLine($"Trajet : {nomLiaison}");
        Console.WriteLine($"Départ le : {res.date} à {res.heure}");
    }

    // Calcule le prix pour un trajet simple
    static double calculerPrix(List<structPassagers> passagers, List<structVehicules> vehicules, int indexTarif, Dictionary<string, double[]> tarifsP, Dictionary<string, double[]> tarifsV)
    {
        double sousTotal = 0;

        foreach (structPassagers p in passagers)
        {
            sousTotal += tarifsP[p.codeCategorie][indexTarif];
        }

        foreach (structVehicules v in vehicules)
        {
            sousTotal += tarifsV[v.codeCategorie][indexTarif] * v.quantite;
        }

        return sousTotal;
    }

    // Sauvegarde les données en format JSON (soit un objet unique, soit une liste si aller-retour)
    static void genererFichierJson(structReservation res, List<structPassagers> passagers, List<structVehicules> vehicules, structReservation? res2 = null)
    {
        object donneesExport;
        
        // Si on a un retour, on crée un tableau avec 2 réservations
        if (res2 != null)
        {
            donneesExport = new[] // tableau d'objets anonymes
            {
                new 
                {
                    reservation = res,
                    passagers = passagers,
                    vehicules = vehicules
                },
                new 
                {
                    reservation = res2.Value,
                    passagers = passagers,
                    vehicules = vehicules
                }
            };
        }
        // Sinon, on crée un tableau d'un seul objet anonyme
        else
        {
            donneesExport = new[]
            {
                new 
                {
                    reservation = res,
                    passagers = passagers,
                    vehicules = vehicules
                },
            };
        }

        // Conversion en texte JSON
        string jsonFinal = JsonConvert.SerializeObject(donneesExport);

        // Génération du nom de fichier unique avec l'heure
        string nomFichier = $"reservation_{res.nom}_{DateTime.Now:yyyyMMdd_HHmmss}.json";
        nomFichier = nomFichier.Replace(" ", "_");

        // Ecriture du fichier sur le disque
        File.WriteAllText(nomFichier, jsonFinal);
        Console.WriteLine($"\n[Succès] Fichier de sauvegarde créé : {nomFichier}");
    }
}