import { Sponsor } from "@/domain/entities/Sponsor";
import { SponsorDTO } from "../dto/SponsorDTO";

export class SponsorMapper {
  public static toDTO(sponsor: Sponsor): SponsorDTO {
    const { nome, logo } = sponsor
    return { nome, logo }
  }
}