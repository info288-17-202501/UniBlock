import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { config } from "dotenv";

config();

passport.use(
  "auth-microsoft",
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      //clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/microsoft/callback",
      scope: ["user.read"],
      authorizationURL: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`,
      tokenURL: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
    },
    function (accessToken, refreshToken, profile, done) {
      // Verifica que el dominio del correo electrónico sea 'alumnos.uach.cl'
      const email = profile.emails[0].value;
      if (email.endsWith("@alumnos.uach.cl")) {
        return done(null, profile); // Autenticación exitosa
      } else {
        return done(
          new Error(
            "Solo los usuarios de la Universidad Austral de Chile pueden acceder."
          ),
          null
        );
      }
    }
  )
);
