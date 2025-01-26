import bcrypt from "bcrypt";

const generateHash = async () => {
  const password = "simon3418";
  const saltRounds = 10; // Nivel de complejidad del hash
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
};

generateHash();
