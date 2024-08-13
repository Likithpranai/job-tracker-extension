import { db, auth } from "../Firebase/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function createUser(userData, jobApplicationData) {
  try {
    const usersRef = collection(db, "users");
    const newUserDoc = await addDoc(usersRef, userData);
    const jobApplicationsRef = collection(
      db,
      "users",
      newUserDoc.id,
      "jobApplications"
    );
    await addDoc(jobApplicationsRef, jobApplicationData);
    console.log("User and job application added successfully!");
  } catch (error) {
    console.error("Error adding user or job application:", error);
  }
}

export async function getUsers(condition) {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where(condition.field, condition.operator, condition.value)
    );
    const querySnapshot = await getDocs(q);
    const users = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const userData = doc.data();
        const jobApplicationsRef = collection(
          db,
          "users",
          doc.id,
          "jobApplications"
        );
        const jobApplicationsSnapshot = await getDocs(jobApplicationsRef);
        const jobApplications = jobApplicationsSnapshot.docs.map((appDoc) =>
          appDoc.data()
        );
        return { ...userData, jobApplications };
      })
    );
    return users;
  } catch (error) {
    console.error("Error fetching users and job applications:", error);
    return [];
  }
}
