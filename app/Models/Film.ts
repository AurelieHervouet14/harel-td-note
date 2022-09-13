import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Film extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public titre: string;

  @column()
  public description: string;

  @column()
  public duree: number;

  @column()
  public realisateur: string;

  @column()
  public anneeSortie: number;

  @column()
  public genre: string;

  @column()
  public photo: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
