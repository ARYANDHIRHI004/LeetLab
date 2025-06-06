import { useState } from "react";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import { useAuthStore } from "./Store/useAuthStore";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProblemPage from "./pages/ProblemPage";
import Profile from "./components/Profile";
import SolvedProblems from "./components/SolvedProblems";
import OrganizationDashboard from "./pages/OrganizationDashboardPage";
import Events from "./components/Events";
import CreatePlaylist from "./components/CreatePlaylist";
import Assignments from "./components/assignments";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                !authUser ? (
                  <WelcomePage />
                ) : authUser?.role !== "ORGANIZATION" ? (
                  <HomePage />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
            />
            {/* <Route path='/add-problem' element = {authUser? <AppProblem/>:<Navigate to={"/"}/>}/> */}
            <Route
              path="/profile"
              element={authUser && authUser?.role ==="USER" ? <Profile /> : <Navigate to={"/"} />}
            />
            <Route
              path="/solved-problems"
              element={authUser && authUser?.role ==="USER" ? <SolvedProblems /> : <Navigate to={"/"} />}
            />
            <Route
              path="/dashboard"
              element={
                authUser && authUser?.role === "ORGANIZATION" ? (
                  <OrganizationDashboard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/previous-event"
              element={
                authUser && authUser?.role === "ORGANIZATION" ? (
                  <Events />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/create-event"
              element={
                authUser && authUser?.role === "ORGANIZATION" ? (
                  <CreatePlaylist />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/create-assignments"
              element={
                authUser && authUser?.role === "ORGANIZATION" ? (
                  <Assignments />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
          </Route>

          <Route
            path="/problem/:id"
            element={!authUser ? <Navigate to={"/login"} /> : <ProblemPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
