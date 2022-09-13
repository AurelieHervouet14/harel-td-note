/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import HealthCheck from "@ioc:Adonis/Core/HealthCheck";
import Route from "@ioc:Adonis/Core/Route";

Route.get('/', 'FilmsController.index').as('index')

Route.group(() => {
  Route.get('/', 'FilmsController.index').as('index')
  Route.get('/:id/afficher', 'FilmsController.afficher').as('afficher')
  Route.get('/creer', 'FilmsController.creer').as('creer')
  Route.post('/save', 'FilmsController.save').as('save')
  Route.post('/:id/save', 'FilmsController.save').as('save.modifier')
  Route.get('/:id/modifier', 'FilmsController.modifier').as('modifier')
  Route.get('/:id/supprimer', 'FilmsController.supprimer').as('supprimer')
}).prefix('/films').as('films')


Route.get('health', async ({ response, view }) => {
  const report = await HealthCheck.getReport()

  console.log(report.healthy)
  
  return view.render('health', {
    health : report.healthy 
  }) 
})

