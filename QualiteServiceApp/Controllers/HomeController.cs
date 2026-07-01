using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

namespace QualiteServiceApp.Controllers
{
    public class HomeController : Controller
    {
        // Action pour la page d'accueil
        public IActionResult Index()
        {
            return View();
        }

        // Action qui va lire le dossier et retourner la liste des images (en JSON)
        [HttpGet]
        public IActionResult GetImages()
        {
            string dossier = @"C:\ProjectsDev\Photos";

            if (!Directory.Exists(dossier))
            {
                return Json(new { success = false, message = "Le dossier n'existe pas." });
            }

            var fichiers = Directory.GetFiles(dossier)
                                    .Where(f => IsImageFile(f))
                                    .ToList();

            if (fichiers.Count == 0)
            {
                return Json(new { success = false, message = "Aucune photo détectée." });
            }

            // On retourne les noms de fichiers (ou chemins relatifs)
            var nomsFichiers = fichiers.Select(f => Path.GetFileName(f)).ToList();
            return Json(new { success = true, images = nomsFichiers });
        }

        // Méthode utilitaire pour vérifier l'extension
        private bool IsImageFile(string path)
        {
            string[] extensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" };
            string ext = Path.GetExtension(path).ToLower();
            return extensions.Contains(ext);
        }
    }
}