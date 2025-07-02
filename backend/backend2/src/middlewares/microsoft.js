import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { config } from "dotenv";
import  User  from "../models/users.js"; // Asegúrate de que la ruta sea correcta
import { generateKeyPair, encryptData } from "../services/cryptoService.js"; // Ruta a tus funciones de cifrado

config();

passport.use(
  "auth-microsoft",
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      callbackURL: "http://localhost:3000/auth/microsoft/callback",
      scope: ["user.read"],
      authorizationURL: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`,
      tokenURL: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;

        if (!email.endsWith("@alumnos.uach.cl")) {
          return done(
            new Error("Solo los usuarios de la Universidad Austral de Chile pueden acceder."),
            null
          );
        }

        // Verificar si ya existe en la base de datos
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
          return done(null, existingUser); // Ya está registrado
        }

        // Generar claves
        const { publicKey, privateKey } = generateKeyPair();
        const { encryptedData: privateKeyEncrypted, iv: ivPriv } = encryptData(privateKey);

        // Crear usuario nuevo
        const newUser = await User.create({
          nombre: profile.displayName || email.split("@")[0],
          email: email,
          rol: "alumno",
          publicKey: publicKey,
          privateKey: privateKeyEncrypted,
          ivPriv: ivPriv,
          // Puedes dejar password null si no se usa login manual
          password: null,
        });

        return done(null, newUser); // Login exitoso con nuevo usuario creado
      } catch (err) {
        console.error("Error en autenticación Microsoft:", err);
        return done(err, null);
      }
    }
  )
);
