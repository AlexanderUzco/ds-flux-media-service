# ds-flux-media-service

# Express + Typescript + MongoDB

## Variables de Entorno

### Configuración de la Base de Datos

- **PORT:** Puerto en el que se ejecutará el servidor (por ejemplo, 3000).
- **DB_URI:** URI de conexión a la base de datos.
- **JWT_SECRET:** Secreto utilizado para firmar y verificar los tokens JWT.
- **SALT_ROUNDS_PASSWORD:** Número de rondas de sal utilizado para cifrar las contraseñas (por ejemplo, 10).

### Configuración del Correo Electrónico

- **EMAIL_HOST:** Host SMTP para enviar correos electrónicos (por ejemplo, smtp.gmail.com).
- **EMAIL_PORT:** Puerto SMTP para enviar correos electrónicos (por ejemplo, 587).
- **EMAIL_PASSWORD:** Contraseña del correo electrónico desde el que se enviarán los correos electrónicos.
- **EMAIL_USER:** Usuario del correo electrónico desde el que se enviarán los correos electrónicos.

## Generar Secrets

Para generar un secreto `JWT_SECRET` utilizando OpenSSL y codificarlo en base64, puedes ejecutar el siguiente comando en tu terminal:

```bash
openssl rand -base64 32
```

## Correr Localmente

Una vez que hayas configurado las variables de entorno en un archivo `.env`, puedes seguir estos pasos para ejecutar la aplicación localmente:

1. **Configurar Variables de Entorno**: Asegúrate de tener configuradas las variables de entorno necesarias en un archivo `.env`. Puedes encontrar un ejemplo de las variables requeridas en el archivo `.env.example`.

2. **Ejecutar el Seeder para Crear el Usuario Root**: Utiliza el siguiente comando para ejecutar el seeder y crear el usuario root con permisos de administrador:

   ```bash
   npm run seed:admin
   ```

   Esto creará un usuario root con las siguientes credenciales:

   - Email: root@test.io
   - Contraseña: 12345678

3. **Acceder a las Funciones de Autenticación**: Una vez que el seeder haya creado el usuario root, podrás utilizar estas credenciales para acceder a todas las funciones de autenticación de la aplicación.

Ahora estás listo para trabajar con la autenticación en tu aplicación localmente.
