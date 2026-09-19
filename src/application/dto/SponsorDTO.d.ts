import { Sponsor } from "@/domain/entities/Sponsor";

export type SponsorDTO = Omit<Sponsor, "id">