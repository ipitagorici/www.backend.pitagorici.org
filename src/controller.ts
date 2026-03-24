import Database from "better-sqlite3";
import path from "node:path";

// --- INTERFACCE ---

export interface RassegnaRow {
    id: number;
    nome: string;
    data: string;
    videoYT: string | null;
    descrizione: string | null;
    localita_id: number;
    localita_nome?: string;
    localita_citta?: string;
}

// Interfacce per l'inserimento/aggiornamento (senza ID, che è autoincrementale)
export interface LocalitaInput {
    nome: string;
    citta: string;
    via: string | null;
    longitudine: number | null;
    latitudine: number | null;
}

export interface RassegnaInput {
    nome: string;
    data: string;
    videoYT: string | null;
    descrizione: string | null;
    localita_id: number;
}

export interface ArticoloInput {
    data_pubblicazione: string;
    estratto: string;
    link: string;
    testata_id: number;
    rassegna_id: number;
}

// --- CONTROLLER ---

export class Controller {
    private _db: Database.Database;

    constructor () {
        this._db = new Database(path.resolve('storage', 'database.db'));
        this._db.pragma('foreign_keys = ON'); // Fondamentale per far rispettare i vincoli
    }

    // ==========================================
    // READ (Lettura)
    // ==========================================

    getRassegne() {
        const stmt = this._db.prepare(`
            SELECT 
                r.*, 
                l.nome as localita_nome, 
                l.citta as localita_citta 
            FROM RASSEGNE r
            JOIN LOCALITA l ON r.localita_id = l.id
            ORDER BY r.data DESC
        `);
        return stmt.all() as RassegnaRow[];
    }

    getRassegnaByID(id: number | string) {
        const stmt = this._db.prepare(`
            SELECT 
                r.*, 
                l.nome as localita_nome, 
                l.via as localita_via,
                l.citta as localita_citta,
                l.longitudine,
                l.latitudine
            FROM RASSEGNE r
            JOIN LOCALITA l ON r.localita_id = l.id
            WHERE r.id = ?
        `);
        return stmt.get(id) || null;
    }

    getRassegnaByIDWithPhotos(id: number | string) {
        const rassegna: any = this.getRassegnaByID(id);
        
        if (!rassegna) return null;

        const stmtFoto = this._db.prepare(`
            SELECT id, contenuto, larghezza, altezza 
            FROM FOTO 
            WHERE rassegna_id = ?
        `);
        const foto = stmtFoto.all(id);

        return {
            ...rassegna,
            foto: foto
        };
    }

    getArticoliForRassegna(id: number | string) {
        const stmt = this._db.prepare(`
            SELECT 
                a.id, a.data_pubblicazione, a.estratto, a.link,
                t.nome as testata_nome, 
                t.icona as testata_icona
            FROM ARTICOLI a
            JOIN TESTATE_GIORNALISTICHE t ON a.testata_id = t.id
            WHERE a.rassegna_id = ?
            ORDER BY a.data_pubblicazione DESC
        `);
        return stmt.all(id);
    }

    getAllArticoli() {
        const stmt = this._db.prepare(`
            SELECT 
                a.id, a.data_pubblicazione, a.estratto, a.link,
                t.nome as testata_nome, 
                r.nome as rassegna_nome
            FROM ARTICOLI a
            JOIN TESTATE_GIORNALISTICHE t ON a.testata_id = t.id
            JOIN RASSEGNE r ON a.rassegna_id = r.id
            ORDER BY a.data_pubblicazione DESC
        `);
        return stmt.all();
    }

    // ==========================================
    // CREATE (Inserimento)
    // ==========================================

    insertLocalita(localita: LocalitaInput): number | bigint {
        const stmt = this._db.prepare(`
            INSERT INTO LOCALITA (nome, citta, via, longitudine, latitudine)
            VALUES (@nome, @citta, @via, @longitudine, @latitudine)
        `);
        const info = stmt.run(localita);
        return info.lastInsertRowid;
    }

    insertRassegna(rassegna: RassegnaInput): number | bigint {
        const stmt = this._db.prepare(`
            INSERT INTO RASSEGNE (nome, data, videoYT, descrizione, localita_id)
            VALUES (@nome, @data, @videoYT, @descrizione, @localita_id)
        `);
        const info = stmt.run(rassegna);
        return info.lastInsertRowid; // Ritorna l'ID della nuova rassegna creata
    }

    insertArticolo(articolo: ArticoloInput): number | bigint {
        const stmt = this._db.prepare(`
            INSERT INTO ARTICOLI (data_pubblicazione, estratto, link, testata_id, rassegna_id)
            VALUES (@data_pubblicazione, @estratto, @link, @testata_id, @rassegna_id)
        `);
        const info = stmt.run(articolo);
        return info.lastInsertRowid;
    }

    // ==========================================
    // UPDATE (Aggiornamento)
    // ==========================================

    updateRassegna(id: number | string, rassegna: RassegnaInput): boolean {
        const stmt = this._db.prepare(`
            UPDATE RASSEGNE 
            SET nome = @nome, 
                data = @data, 
                videoYT = @videoYT, 
                descrizione = @descrizione, 
                localita_id = @localita_id
            WHERE id = @id
        `);
        // Passiamo l'id insieme all'oggetto per i parametri nominati
        const info = stmt.run({ ...rassegna, id });
        return info.changes > 0; // true se ha effettivamente modificato un record
    }

    updateArticolo(id: number | string, articolo: ArticoloInput): boolean {
        const stmt = this._db.prepare(`
            UPDATE ARTICOLI 
            SET data_pubblicazione = @data_pubblicazione, 
                estratto = @estratto, 
                link = @link, 
                testata_id = @testata_id, 
                rassegna_id = @rassegna_id
            WHERE id = @id
        `);
        const info = stmt.run({ ...articolo, id });
        return info.changes > 0;
    }

    // ==========================================
    // DELETE (Cancellazione)
    // ==========================================

    deleteRassegna(id: number | string): boolean {
        const stmt = this._db.prepare(`DELETE FROM RASSEGNE WHERE id = ?`);
        const info = stmt.run(id);
        return info.changes > 0;
    }

    deleteArticolo(id: number | string): boolean {
        const stmt = this._db.prepare(`DELETE FROM ARTICOLI WHERE id = ?`);
        const info = stmt.run(id);
        return info.changes > 0;
    }

    deleteLocalita(id: number | string): boolean {
        const stmt = this._db.prepare(`DELETE FROM LOCALITA WHERE id = ?`);
        const info = stmt.run(id);
        return info.changes > 0;
    }

    // ==========================================
    // UTILS
    // ==========================================

    getHealth() {
        return "Working!";
    }
}

export const controller: Controller = new Controller();