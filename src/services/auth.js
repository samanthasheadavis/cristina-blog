import { auth } from "./firebase";

// Sign Up
export const CreateUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Sign In
export const SignInWithEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);
};

// Sign out
export const SignOut = () => {
  auth.signOut();
};

// Password Reset
export const PasswordReset = email => {
  auth.sendPasswordResetEmail(email);
};

// Password Change
export const PasswordUpdate = password => {
  auth.currentUser.updatePassword(password);
};
