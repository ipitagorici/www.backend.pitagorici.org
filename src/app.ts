import 'dotenv/config'
import { controller } from "./controller"
import express from 'express'

const app = express();

// Middleware fondamentale per parsare il JSON nel body delle richieste
app.use(express.json());

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req, res) => {    
    res.status(200).send({ status: controller.getHealth() });
});

// ==========================================
// RASSEGNE
// ==========================================

// GET - Tutte le rassegne
app.get('/api/rassegne', (req, res) => {
    try {
        const rassegne = controller.getRassegne();
        res.status(200).json(rassegne);
    } catch (error) {
        res.status(500).json({ error: "Errore durante il recupero delle rassegne" });
    }
});

// GET - Singola rassegna (base)
app.get('/api/rassegne/:id', (req, res) => {
    try {
        const rassegna = controller.getRassegnaByID(req.params.id);
        if (!rassegna) return res.status(404).json({ error: "Rassegna non trovata" });
        res.status(200).json(rassegna);
    } catch (error) {
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// GET - Singola rassegna + Foto
app.get('/api/rassegne/:id/foto', (req, res) => {
    try {
        const rassegna = controller.getRassegnaByIDWithPhotos(req.params.id);
        if (!rassegna) return res.status(404).json({ error: "Rassegna non trovata" });
        res.status(200).json(rassegna);
    } catch (error) {
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// GET - Articoli di una specifica rassegna
app.get('/api/rassegne/:id/articoli', (req, res) => {
    try {
        const articoli = controller.getArticoliForRassegna(req.params.id);
        res.status(200).json(articoli);
    } catch (error) {
        res.status(500).json({ error: "Errore durante il recupero degli articoli" });
    }
});

// POST - Crea nuova rassegna
app.post('/api/rassegne', (req, res) => {
    try {
        const newId = controller.insertRassegna(req.body);
        res.status(201).json({ id: newId, message: "Rassegna creata con successo" });
    } catch (error) {
        res.status(400).json({ error: "Errore nella creazione della rassegna. Controlla i dati inviati." });
    }
});

// PUT - Aggiorna rassegna esistente
app.put('/api/rassegne/:id', (req, res) => {
    try {
        const success = controller.updateRassegna(req.params.id, req.body);
        if (!success) return res.status(404).json({ error: "Rassegna non trovata" });
        res.status(200).json({ message: "Rassegna aggiornata con successo" });
    } catch (error) {
        res.status(400).json({ error: "Errore durante l'aggiornamento. Controlla i dati." });
    }
});

// DELETE - Elimina rassegna
app.delete('/api/rassegne/:id', (req, res) => {
    try {
        const success = controller.deleteRassegna(req.params.id);
        if (!success) return res.status(404).json({ error: "Rassegna non trovata" });
        res.status(200).json({ message: "Rassegna eliminata con successo" });
    } catch (error) {
        // Potrebbe fallire a causa di vincoli (es. ci sono articoli o foto collegati)
        res.status(400).json({ error: "Impossibile eliminare la rassegna. Potrebbe avere elementi collegati." });
    }
});

// ==========================================
// ARTICOLI
// ==========================================

// GET - Tutti gli articoli
app.get('/api/articoli', (req, res) => {
    try {
        const articoli = controller.getAllArticoli();
        res.status(200).json(articoli);
    } catch (error) {
        res.status(500).json({ error: "Errore durante il recupero degli articoli" });
    }
});

// POST - Crea nuovo articolo
app.post('/api/articoli', (req, res) => {
    try {
        const newId = controller.insertArticolo(req.body);
        res.status(201).json({ id: newId, message: "Articolo creato con successo" });
    } catch (error) {
        res.status(400).json({ error: "Errore nella creazione dell'articolo" });
    }
});

// PUT - Aggiorna articolo esistente
app.put('/api/articoli/:id', (req, res) => {
    try {
        const success = controller.updateArticolo(req.params.id, req.body);
        if (!success) return res.status(404).json({ error: "Articolo non trovato" });
        res.status(200).json({ message: "Articolo aggiornato con successo" });
    } catch (error) {
        res.status(400).json({ error: "Errore durante l'aggiornamento" });
    }
});

// DELETE - Elimina articolo
app.delete('/api/articoli/:id', (req, res) => {
    try {
        const success = controller.deleteArticolo(req.params.id);
        if (!success) return res.status(404).json({ error: "Articolo non trovato" });
        res.status(200).json({ message: "Articolo eliminato" });
    } catch (error) {
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// ==========================================
// LOCALITÀ
// ==========================================

// POST - Crea nuova località
app.post('/api/localita', (req, res) => {
    try {
        const newId = controller.insertLocalita(req.body);
        res.status(201).json({ id: newId, message: "Località creata con successo" });
    } catch (error) {
        res.status(400).json({ error: "Errore nella creazione della località" });
    }
});

// DELETE - Elimina località
app.delete('/api/localita/:id', (req, res) => {
    try {
        const success = controller.deleteLocalita(req.params.id);
        if (!success) return res.status(404).json({ error: "Località non trovata" });
        res.status(200).json({ message: "Località eliminata" });
    } catch (error) {
        res.status(400).json({ error: "Impossibile eliminare la località. Potrebbero esserci rassegne collegate." });
    }
});

// ==========================================
// SERVER START
// ==========================================

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
});