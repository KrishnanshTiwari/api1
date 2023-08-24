const bcrypt = require('bcrypt');
const { auth } = require('../services/firebaseService');

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in Firebase with the hashed password
    const userRecord = await auth.createUser({
      email,
      password: hashedPassword,
    });

    // Set the custom claim with the hashed password
    await auth.setCustomUserClaims(userRecord.uid, { passwordHash: hashedPassword });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: "Unable to sign up", details: error.message });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user record from Firebase
    const userRecord = await auth.getUserByEmail(email);

    // Get the stored hashed password from the user record's custom claims
    const storedHashedPassword = userRecord.customClaims.passwordHash;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (passwordMatch) {
      // Password is valid, perform custom login logic
      res.status(200).json({ uid: userRecord.uid });
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }
  } catch (error) {
    res.status(401).json({ error: "Authentication failed", details: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await auth.signOut();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to logout", details: error.message });
  }
};

module.exports = { signUp, signIn, logout };
