export type RassegnaProgrammata = {
  id: number,
  nome: string,
  data: Date,
  descrizione?: string
  localita_id: number,
  link_prenotazione?: string,
}