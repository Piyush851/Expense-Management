// src/services/authService.js
// Simple localStorage-backed mock. Replace with axios calls when backend ready.

const USERS_KEY = "mock_users_v1";
const COMPANY_KEY = "mock_company_v1";

const currencyMap = {
  India: "INR",
  USA: "USD",
  UK: "GBP",
  Germany: "EUR",
  Default: "USD",
};

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function readCompany() {
  return JSON.parse(localStorage.getItem(COMPANY_KEY) || "null");
}
function writeCompany(company) {
  localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
}

export async function signupService({ companyName, country, username, password }) {
  // If first time, create company & admin
  let company = readCompany();
  if (!company) {
    company = {
      id: Date.now(),
      name: companyName,
      country,
      currency: currencyMap[country] || currencyMap.Default,
      createdAt: new Date().toISOString(),
    };
    writeCompany(company);
  }
  const users = readUsers();
  // create admin user
  const existing = users.find((u) => u.username === username);
  if (existing) throw new Error("Username already exists");
  const newUser = {
    id: Date.now(),
    username,
    password,
    role: "admin",
    companyId: company.id,
    managerId: null,
  };
  users.push(newUser);
  writeUsers(users);
  return {
    token: "mock-token-" + Date.now(),
    user: { username: newUser.username, role: newUser.role, token: "mock-token", company },
  };
}

export async function loginService({ username, password }) {
  const users = readUsers();
  const u = users.find((x) => x.username === username && x.password === password);
  if (!u) throw new Error("Invalid credentials");
  const company = readCompany();
  return {
    token: "mock-token-" + Date.now(),
    user: { username: u.username, role: u.role, token: "mock-token", company, userId: u.id },
  };
}
