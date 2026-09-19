export type RassegnaProgrammata = {
  id: number,
  nome: string,
  sottotitolo: string,
  data: string,
  ora?: string,
  descrizione?: string
  localita_id: number,
  link_prenotazione?: string,
}