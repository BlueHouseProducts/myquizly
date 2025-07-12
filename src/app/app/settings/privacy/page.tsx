"use client";

import React, { useState, useEffect } from "react";
import { Account, Client } from "appwrite";
import { Settings } from "lucide-react";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function PrivacySettingsPage() {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    account.get()
      .then((user) => setEmail(user.email))
      .catch(() => setMessage("Please log in to access privacy settings."));
  }, []);

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500); // reload after 1.5 seconds so user sees message
  };

  const updateEmail = async () => {
    try {
      await account.updateEmail(newEmail, password);
      setMessage("Verification email sent to new email address.");
      setNewEmail("");
      setPassword("");
      reloadPage();
    } catch (error: any) {
      setMessage(error.message || "Error updating email.");
    }
  };

  const updatePassword = async () => {
    try {
      await account.updatePassword(password, newPassword);
      setMessage("Password updated successfully.");
      setPassword("");
      setNewPassword("");
      reloadPage();
    } catch (error: any) {
      setMessage(error.message || "Error updating password.");
    }
  };

  const logoutAllSessions = async () => {
    try {
      await account.deleteSessions();
      setMessage("Logged out of all other sessions.");
      reloadPage();
    } catch (error: any) {
      setMessage(error.message || "Error logging out of other sessions.");
    }
  };

  return (
    <><nav className="w-fit ml-4 mb-2 mt-4 bg-blue-500/20 py-2 px-4 rounded-xl"><Settings /></nav>
    <div className="max-w-md p-6 mt-2">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Privacy Settings
      </h2>

      {/* Update Email */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Update Email
        </h3>
        <p className="mb-2 text-gray-600 dark:text-gray-400">
          Current Email: <span className="font-mono">{email}</span>
        </p>
        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
        />
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
        />
        <button
          onClick={updateEmail}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Update Email
        </button>
      </section>

      <hr className="my-6 border-gray-300 dark:border-zinc-700" />

      {/* Update Password */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Update Password
        </h3>
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
        />
        <button
          onClick={updatePassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </section>

      <hr className="my-6 border-gray-300 dark:border-zinc-700" />

      {/* Logout Other Sessions */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Logout of Other Sessions
        </h3>
        <button
          onClick={logoutAllSessions}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout All Other Sessions
        </button>
      </section>

      {/* Message */}
      {message && (
        <p className="mt-6 text-green-600 dark:text-green-400 font-medium text-center">
          {message}
        </p>
      )}
    </div></>
  );
}
