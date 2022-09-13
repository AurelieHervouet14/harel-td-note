import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";

import Film from "App/Models/Film";

export default class FilmsController {
  public async index({ view }) {
    const films = await Film.all();

    return view.render("films/index", {
      films: films,
    });
  }

  public async creer({ view, response }) {
    return view.render("films/creer");
  }

  public async afficher({ params, view }: HttpContextContract) {
    const film = await Film.find(params.id);

    return view.render("films/afficher", {
      film: film,
    });
  }

  public async modifier({ response, view, params }: HttpContextContract) {
    const film = await Film.find(params.id);

    return view.render("films/modifier", {
      film: film,
    });
  }

  public async supprimer({ response, params }: HttpContextContract) {
    const film = await Film.find(params.id);
    if (film) {
      await film.delete();

      if (film.$isDeleted)
      {
        return response.redirect("/films");
      }
      else { 
        return response.json("Une erreur c'est produite");
      }
    }
    return response.redirect("/films");
  }

  public async save({ request, response, params }) {
    const photoImage = request.file("photo");
    console.log(request.body().photo);
    let fileName = "";

    if (photoImage) {
      await photoImage.move(Application.publicPath("photo"), {
        overwrite: true,
      });
      fileName = photoImage.fileName;
    }

    if (params.id) {
      const film = await Film.find(params.id);
      if (film) {
        film.titre = request.body().titre;
        film.description = request.body().description;
        film.duree = request.body().duree;
        film.realisateur = request.body().realisateur;
        film.anneeSortie = request.body().anneeSortie;
        film.genre = request.body().genre;
        film.photo = fileName;
        film.save();
      }
    } else {
      const film = new Film();

      film.titre = request.body().titre; 
      film.description = request.body().description;
      film.duree = request.body().duree;
      film.realisateur = request.body().realisateur;
      film.anneeSortie = request.body().anneeSortie;
      film.genre = request.body().genre;
      film.photo = fileName;

      await film.save();
    }
    return response.redirect("/films");
   }
}
