import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

/**
 * Ensures that the current page is accessed by an authenticated user with the required permissions.
 * Returns an object containing auth context once the user is authorised.
 *
 * @param {Object} options
 * @param {import('firebase/app').FirebaseApp} [options.app] - Optional Firebase app instance.
 * @param {import('firebase/auth').Auth} [options.auth] - Optional Firebase auth instance.
 * @param {import('firebase/firestore').Firestore} [options.db] - Optional Firestore instance.
 * @param {string[]} [options.requiredAny=[]] - Permission codes that grant read access (any match).
 * @param {string[]} [options.writeCodes=[]] - Permission codes that grant write access (any match).
 * @param {string} [options.loginPage="adminpanellogin.html"] - Redirect target when user is unauthenticated.
 * @param {string} [options.unauthorisedPage="adminpanellogin.html"] - Redirect when user lacks permissions.
 * @param {string} [options.pageName=""] - Optional page name for alert messages.
 * @param {boolean} [options.redirectOnPasswordReset=false] - If true, redirect when password change required.
 * @returns {Promise<{
 *   auth: import('firebase/auth').Auth,
 *   db: import('firebase/firestore').Firestore,
 *   user: import('firebase/auth').User,
 *   profileRef: import('firebase/firestore').QueryDocumentSnapshot | null,
 *   profile: any,
 *   permissions: string[],
 *   canWrite: boolean,
 *   requirePasswordChange: boolean
 * }>}
 */
export async function ensureAuth({
  app,
  auth,
  db,
  requiredAny = [],
  writeCodes = [],
  loginPage = "adminpanellogin.html",
  unauthorisedPage = "adminpanellogin.html",
  pageName = "",
  redirectOnPasswordReset = false,
} = {}) {
  const resolvedAuth = auth ?? getAuth(app);
  const resolvedDb = db ?? getFirestore(app);

  const user = await new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      resolvedAuth,
      (currentUser) => {
        unsubscribe();
        resolve(currentUser);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });

  if (!user) {
    redirectWithDelay(loginPage);
    throw new Error("UNAUTHENTICATED");
  }

  const usersQuery = query(
    collection(resolvedDb, "Users"),
    where("userEmail", "==", user.email),
    limit(1)
  );

  const snapshot = await getDocs(usersQuery);

  if (snapshot.empty) {
    await signOut(resolvedAuth);
    alert(
      "Kullanıcı kaydı bulunamadı. Lütfen sistem yöneticisi ile iletişime geçin."
    );
    redirectWithDelay(loginPage);
    throw new Error("PROFILE_NOT_FOUND");
  }

  const profileRef = snapshot.docs[0];
  const profile = profileRef.data();
  const permissions = Array.isArray(profile.userAuthority)
    ? profile.userAuthority
    : [];

  const hasGlobalRead = permissions.includes("1") || permissions.includes("1a");
  const hasAccess =
    hasGlobalRead ||
    requiredAny.length === 0 ||
    requiredAny.some((code) => permissions.includes(code));

  if (!hasAccess) {
    const message = pageName
      ? `${pageName} sayfasına erişim yetkiniz bulunmuyor.`
      : "Bu sayfaya erişim yetkiniz bulunmuyor.";
    alert(message);
    redirectWithDelay(unauthorisedPage);
    throw new Error("UNAUTHORISED");
  }

  const hasGlobalWrite = permissions.includes("1");
  const canWrite =
    hasGlobalWrite ||
    writeCodes.some((code) => permissions.includes(code));

  const requirePasswordChange = profile.passwordEdit === false;

  if (requirePasswordChange && redirectOnPasswordReset) {
    alert(
      "İlk girişiniz olduğu için şifrenizi değiştirmeniz gerekiyor. Lütfen giriş ekranından şifrenizi güncelleyin."
    );
    redirectWithDelay(loginPage);
    throw new Error("PASSWORD_CHANGE_REQUIRED");
  }

  return {
    auth: resolvedAuth,
    db: resolvedDb,
    user,
    profileRef,
    profile,
    permissions,
    canWrite,
    requirePasswordChange,
  };
}

/**
 * Writes an activity log entry to Firestore.
 *
 * @param {import('firebase/firestore').Firestore} db
 * @param {{
 *   userEmail: string;
 *   userName?: string;
 *   action: string;
 *   page: string;
 *   targetId?: string;
 *   targetType?: string;
 *   meta?: Record<string, any>;
 * }} payload
 */
export async function logActivity(db, payload) {
  if (!db || !payload) return;

  const logEntry = {
    ...payload,
    timestamp: Timestamp.now(),
  };

  try {
    await addDocSafe(collection(db, "activityLogs"), logEntry);
  } catch (error) {
    console.error("Aktivite kaydı yazılamadı:", error);
  }
}

async function addDocSafe(ref, data) {
  const { addDoc } = await import(
    "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
  );
  return addDoc(ref, data);
}

function redirectWithDelay(target) {
  setTimeout(() => {
    window.location.href = target;
  }, 500);
}

