import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { neon } from "@neondatabase/serverless";
const client = neon(process.env.DATABASE_URL);

const admin = {
  userName: "Admin",
  email: "mdarif@gmail.com",
  password: await bcrypt.hash("admin123", 10),
  role: "admin",
};
console.log(`admin`, admin);

await client`
    INSERT INTO users (username, email, password, role)
    VALUES ( ${admin.userName}, ${admin.email}, ${admin.password}, ${admin.role})
    RETURNING (id, username, email, role);
`;
console.log("Admin created!!");
process.exit();
