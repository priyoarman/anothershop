/** Shopper profile saved in this browser (there are no user accounts on the server). */

const STORAGE_KEY = "profile";

export const EMPTY_PROFILE = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...EMPTY_PROFILE, ...saved };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

export function clearProfile() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable; nothing to clear.
  }
}
