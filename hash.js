import bcrypt from "bcrypt";

const generateHash = async () => {
  const password = "simon3418";
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
};

generateHash();
