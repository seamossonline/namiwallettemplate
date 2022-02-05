// project_repository.js
class ProjectRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        dHandle_ TEXT, 
        profileAddress_ TEXT,
        walletLabel_ TEXT,
        walletNote_ TEXT,
        accountStatus_ TEXT,
        lastPaid_ DATE,
        payTier_ INTEGER,
        accountExpiry_ DATE)`
        return this.dao.run(sql)
    }

    create(name) { //Seamoss: must add attributes starting with bases: dHandle_, profileAddress_, walletLabel_, walletNote_
        return this.dao.run(
            'INSERT INTO projects (name) VALUES (?)',
            [name])
    }

    update(project) {
        const { id, name, dHandle_, profileAddress_, walletLabel_, walletNote_ } = project
        return this.dao.run(
            `UPDATE projects SET name = ? WHERE id = ?`, // SEamoss: suspect will have to add similar lines here for the other attributes
            [name, id, dHandle_, profileAddress_, walletLabel_, walletNote_]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM projects WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM projects WHERE id = ?`,
            [id])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM projects`)
    }

    getTasks(projectId) {
        return this.dao.all(
            `SELECT * FROM tasks WHERE projectId = ?`,
            [projectId])
    }
}

// Seamoss: I've intentionally left out the payment attributes from the normal update(project) class. 

module.exports = ProjectRepository;