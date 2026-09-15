import { RassegnaProgrammata } from "./RassegnaProgrammata"

export type Rassegna = Omit<RassegnaProgrammata, "link_prenotazione"> & {
  videoYT?: string,
  cover?: Foto
}