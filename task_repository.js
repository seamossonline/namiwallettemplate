// task_repository.js

class TaskRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          isComplete INTEGER DEFAULT 0,
          projectId INTEGER,
          ds_serverName_ TEXT,
          ds_roleName_ TEXT,
          ds_accessType TEXT,
          ds_accessIdentifier TEXT,
          ds_scanHours TEXT,
          gateNotes TEXT,
          gateActive BOOL,
          domainLimiter TEXT,
          pageRegex TEXT,  
          CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
            REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`
        return this.dao.run(sql)
    }

    create(name, description, isComplete, projectId, ds_serverName) {
        return this.dao.run(
            `INSERT INTO tasks (name, description, isComplete, projectId, ds_serverName)
            VALUES (?, ?, ?, ?, ?)`,
            [name, description, isComplete, projectId, ds_serverName]) // Seamoss: this may need to be extended for the Naptcha attributes above. I added ds_serverName to start testing.
    }

    update(task) { // Seamoss: extend Naptcha attributes
        const { id, name, description, isComplete, projectId, ds_serverName } = task
        return this.dao.run(
            `UPDATE tasks
          SET name = ?,
            description = ?,
            isComplete = ?,
            projectId = ?,
            ds_serverName = ?
          WHERE id = ?`,
            [name, description, isComplete, projectId, id, ds_serverName]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM tasks WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM tasks WHERE id = ?`,
            [id])
    }
}

module.exports = TaskRepository;