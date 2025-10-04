import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { countries } from "../utils/countries.js"; // country + currency list

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    currency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if country change -> set currency automatically
    if (name === "country") {
      const selectedCountry = countries.find((c) => c.name === value);
      setForm({
        ...form,
        country: value,
        currency: selectedCountry ? selectedCountry.currency : "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = signup(form.name, form.email, form.password);
    if (success) navigate("/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Country */}
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Country</option>
          {countries.map((c, idx) => (
            <option key={idx} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Currency (auto filled, read only) */}
        <input
          type="text"
          placeholder="Currency"
          name="currency"
          value={form.currency}
          className="w-full border px-3 py-2 rounded bg-gray-100"
          readOnly
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

