using System.IO;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Ajout des services MVC
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Servir les fichiers statiques du projet (wwwroot)
app.UseStaticFiles();

// Servir les images depuis le dossier externe C:\ProjectsDev\Photos
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(@"C:\ProjectsDev\Photos")),
    RequestPath = "/images"
});

// Routing MVC
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();