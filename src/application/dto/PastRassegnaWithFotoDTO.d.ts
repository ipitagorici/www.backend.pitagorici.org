import { Foto } from "../../domain/entities/Foto";
import { PastRassegnaDTO } from "./PastRassegnaDTO";

export type PastRassegnaWithFotoDTO = PastRassegnaDTO & { foto: Foto[] }