-- 1. Tabelle senza dipendenze (Lookup tables)
CREATE TABLE IF NOT EXISTS LOCALITA (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    via TEXT,
    citta TEXT NOT NULL,
    longitudine REAL,
    latitudine REAL
);

CREATE TABLE IF NOT EXISTS FOTOGRAFI (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT
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
    sottotitolo TEXT,
    descrizione TEXT,
    link_prenotazione TEXT,
    localita_id INTEGER NOT NULL,
    FOREIGN KEY (localita_id) REFERENCES LOCALITA(id)
);

CREATE TABLE IF NOT EXISTS RASSEGNE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data TEXT NOT NULL,
    videoYT TEXT, -- Link al video YouTube
    sottotitolo TEXT,
    descrizione TEXT,
    localita_id INTEGER NOT NULL,
    FOREIGN KEY (localita_id) REFERENCES LOCALITA(id)
);

CREATE TABLE IF NOT EXISTS ALBUM (
    id TEXT PRIMARY KEY,
    rassegna_id INTEGER NOT NULL,
    FOREIGN KEY (rassegna_id) REFERENCES RASSEGNE(id)
);

CREATE TABLE IF NOT EXISTS FOTOGRAFI_ALBUM (
    id_fotografo INTEGER NOT NULL,
    id_album TEXT NOT NULL,
    PRIMARY KEY (id_fotografo, id_album),
    FOREIGN KEY (id_fotografo) REFERENCES FOTOGRAFI(id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (id_album) REFERENCES ALBUM(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- 3. Tabelle dipendenti da Rassegne
CREATE TABLE IF NOT EXISTS MATERIALI_PUBBLICITARI (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rassegna_id INTEGER NOT NULL, -- può essere programmata o già svolta
    nome TEXT NOT NULL,
    contenuto TEXT NOT NULL,
    altezza INTEGER,
    larghezza INTEGER
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