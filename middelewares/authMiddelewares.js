const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

module.exports.requireAuthUser = (req, res, next) => {
  // Récupérez le token des cookies
  const token = req.cookies["this is token"];
  console.log("jwt", token);

  if (token) {
    // Vérifiez le token
    jwt.verify(token, "net work", async (err, decoded) => {
      if (err) {
        // En cas d'erreur lors de la vérification du token
        res.status(401).json({ message: "erreur token" });
      } else {
        // Utilisez le token décodé pour récupérer l'utilisateur
        console.log("decodedToken", decoded);
        console.log("decodedToken id ", decoded.id);

        try {
          // Recherchez l'utilisateur par son ID
          const user = await userModel.findById(decoded.id);
          if (user) {
            // Stockez l'utilisateur dans la session ou la requête
            console.log("user", user);
            req.session.user = user;
            next(); // Passez au middleware ou au routeur suivant
          } else {
            // Si l'utilisateur n'est pas trouvé
            res.status(404).json({ message: "User not found" });
          }
        } catch (err) {
          // Gérez les erreurs de base de données
          res.status(500).json({ message: err.message });
        }
      }
    });
  } else {
    // Si aucun token n'est trouvé dans les cookies
    res.status(401).json({ message: "pas de token" });
  }
};
