-- 1. Tabelle senza dipendenze (Lookup tables)
CREATE TABLE IF NOT EXISTS LOCALITA (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    via TEXT,
    citta TEXT NOT NULL,
    longitudine REAL,
    latitudine REAL
);

CREATE TABLE IF NOT EXISTS TESTATE_GIORNALISTICHE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    icona TEXT -- URL o percorso file dell'icona
);

-- 2. Tabelle con dipendenze semplici
CREATE TABLE IF NOT EXISTS RASSEGNE_PROGRAMMATE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data TEXT NOT NULL, -- SQLite usa stringhe ISO8601 per le date
    descrizione TEXT,
    localita_id INTEGER NOT NULL,
    FOREIGN KEY (localita_id) REFERENCES LOCALITA(id)
);

CREATE TABLE IF NOT EXISTS RASSEGNE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data TEXT NOT NULL,
    videoYT TEXT, -- Link al video YouTube
    descrizione TEXT,
    localita_id INTEGER NOT NULL,
    FOREIGN KEY (localita_id) REFERENCES LOCALITA(id)
);

-- 3. Tabelle dipendenti da Rassegne
CREATE TABLE IF NOT EXISTS MATERIALI_PUBBLICITARI (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rassegna_programmata_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    altezza INTEGER,
    larghezza INTEGER,
    FOREIGN KEY (rassegna_programmata_id) REFERENCES RASSEGNE_PROGRAMMATE(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FOTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rassegna_id INTEGER NOT NULL,
    contenuto BLOB, -- O TEXT se memorizzi l'URL/Path dell'immagine
    larghezza INTEGER,
    altezza INTEGER,
    FOREIGN KEY (rassegna_id) REFERENCES RASSEGNE(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ARTICOLI (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rassegna_id INTEGER NOT NULL,
    testata_id INTEGER NOT NULL,
    data_pubblicazione TEXT,
    estratto TEXT,
    link TEXT,
    FOREIGN KEY (rassegna_id) REFERENCES RASSEGNE(id) ON DELETE CASCADE,
    FOREIGN KEY (testata_id) REFERENCES TESTATE_GIORNALISTICHE(id)
);