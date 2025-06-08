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
import CreatedQuestions from "./components/CreatedQuestions";
import Assignments from "./components/Assignments";
import PreviouslyAssignedUsers from "./components/PreviouslyAssignedUsers";
import UserEventSection from "./components/UserEventSection";
import UserPlaylist from "./components/UserPlaylist";
import UserPlaylistQuestion from "./components/UserPlaylistQuestion";
import CreateUserPlaylist from "./components/CreateUserPlaylist";
import CreateProblem from "./components/CreateProblem";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser)

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
            <Route
              path="/profile"
              element={authUser && authUser?.role !=="ORGANIZATION" ? <Profile /> : <Navigate to={"/"} />}
            />
            <Route
              path="/solved-problems"
              element={authUser && authUser?.role !=="ORGANIZATION" ? <SolvedProblems /> : <Navigate to={"/"} />}
            />
            <Route
              path="/playlist"
              element={authUser && authUser?.role !=="ORGANIZATION" ? <UserPlaylist /> : <Navigate to={"/"} />}
            />
            <Route
              path="/create-playlist"
              element={authUser && authUser?.role !=="ORGANIZATION" ? <CreateUserPlaylist /> : <Navigate to={"/"} />}
            />
            <Route
              path="/playlist/problems/:playlistId"
              element={authUser && authUser?.role !=="ORGANIZATION" ? <UserPlaylistQuestion /> : <Navigate to={"/"} />}
            />

            <Route
              path="/assigned-event/:assignmentId"
              element={authUser && authUser?.role !=="ORGANIZATION"? <UserEventSection /> : <Navigate to={"/"} />}
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
                path="/create-problem"
                element={authUser && authUser?.role !=="USER"? <CreateProblem /> : <Navigate to={"/"} />}
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
                  <CreateUserPlaylist />
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
            <Route
              path="/all-previously-assigned-users"
              element={
                authUser && authUser?.role === "ORGANIZATION" ? (
                  <PreviouslyAssignedUsers />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/all-created-questions"
              element={
                authUser && authUser?.role === "ORGANIZATION" ? (
                  <CreatedQuestions />
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
