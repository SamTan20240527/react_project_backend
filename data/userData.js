//Part 12: Create user data

const pool = require('../database');

async function getUserByEmail(email) {
    if (!email || typeof email !== 'string') {
        throw new Error('Invalid email');
    }
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

async function createUser({ name, email, password, address }) {
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Invalid user data');
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert user data
        const [userResult] = await connection.query(
            `INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)`,
            [name, email, password, address]
        );
        const userId = userResult.insertId;

        await connection.commit();
        return userId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function updateUser(id, { name, email, password, address }) {
    if (!id || !email || !password || typeof id !== 'number' || typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Invalid user data');
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Update user data
        await connection.query(
            `UPDATE users SET name = ?, email = ?, password = ?, address = ? WHERE id = ?`,
            [name, email, password, address, id]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUser
};
