// userSeeder.ts

import mongoose from 'mongoose';
import UserModel from '../models/users.model';
import { DB_URI } from '../enviroments/app.enviroment';

async function seedAdminUser() {
  try {
    if (!DB_URI) {
      console.log('\x1b[31m', 'No database URI provided', '\x1b[0m');
      return;
    }

    await mongoose.connect(DB_URI);

    const adminData = {
      username: 'Admin Root',
      email: 'root@test.io',
      password: '12345678',
      role: 'ADMIN',
    };

    const adminUser = await UserModel.create(adminData);
    console.log('Usuario administrador creado con éxito:', adminUser);
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Ejecutar la función para crear el usuario administrador
seedAdminUser();
