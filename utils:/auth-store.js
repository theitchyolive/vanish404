import { create } from "zustand";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseApp } from "./firebase-config";
import { toast } from "sonner";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Forces account selection each time
});

export const useAuthStore = create((set) => ({
  user: null,
  isSetupComplete: false,
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      set({ user: userCredential.user, isSetupComplete: userDoc.exists() && userDoc.data().setupComplete });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  },
  loginWithGoogle: async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          setupComplete: false,
          displayName: userCredential.user.displayName || "Rider",
        });
      }
      set({ user: userCredential.user, isSetupComplete: userDoc.exists() && userDoc.data().setupComplete });
      toast.success("Logged in with Google!");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  },
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { email, setupComplete: false });
      set({ user: userCredential.user, isSetupComplete: false });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isSetupComplete: false });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  },
  completeSetup: async (data) => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), { ...data, setupComplete: true }, { merge: true });
      set({ isSetupComplete: true });
      toast.success("Setup completed!");
    } catch (error) {
      toast.error("Setup failed: " + error.message);
    }
  },
}));

export const initializeAuth = () => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      useAuthStore.setState({ user, isSetupComplete: userDoc.exists() && userDoc.data().setupComplete });
    } else {
      useAuthStore.setState({ user: null, isSetupComplete: false });
    }
  });
};