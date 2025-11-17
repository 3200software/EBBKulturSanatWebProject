const MESSAGE_PERMISSION_CODES = ["1", "1a", "2", "2a"];
const GLOBAL_READ_CODES = new Set(["1", "1a"]);
const ALERT_MESSAGE = "Bu sayfaya erişim yetkiniz bulunmuyor.";

function hasPageAccess(userPermissions = [], requiredAny = []) {
  if (!requiredAny || requiredAny.length === 0) {
    return true;
  }

  const perms = Array.isArray(userPermissions) ? userPermissions : [];
  if (perms.some((code) => GLOBAL_READ_CODES.has(code))) {
    return true;
  }

  return requiredAny.some((code) => perms.includes(code));
}

/**
 * Toggles visibility of the global "Mesajlar" link inside admin offcanvas menus.
 * Call this after ensureAuth resolves so that permissions are available.
 *
 * @param {string[]} permissions - User authority codes.
 * @returns {boolean} Whether the link is visible for the current user.
 */
export function updateMessagesLinkVisibility(permissions = []) {
  const allowed = hasPageAccess(permissions, MESSAGE_PERMISSION_CODES);

  const links = document.querySelectorAll(".messages-link");
  links.forEach((link) => {
    if (!link) return;
    link.style.display = allowed ? "" : "none";
    link.dataset.visible = allowed ? "true" : "false";
  });

  return allowed;
}

/**
 * Attaches click guards to navigation links so users without permissions
 * see an alert instead of navigating to pages they cannot access.
 *
 * Usage: call after ensureAuth, optional custom alert message.
 *
 * @param {string[]} permissions
 * @param {{alertMessage?: string}} options
 */
export function enforceLinkPermissions(
  permissions = [],
  { alertMessage = ALERT_MESSAGE } = {}
) {
  const links = document.querySelectorAll("[data-required-permissions]");
  if (!links.length) return;

  links.forEach((link) => {
    if (!link || link.dataset.permissionGuard === "true") return;

    const requiredPerms = (link.dataset.requiredPermissions || "")
      .split(",")
      .map((code) => code.trim())
      .filter(Boolean);

    const allowed = hasPageAccess(permissions, requiredPerms);
    if (!allowed) {
      link.classList.add("text-muted");
      link.style.cursor = "not-allowed";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        alert(alertMessage);
      });
    }

    link.dataset.permissionGuard = "true";
  });
}

export { MESSAGE_PERMISSION_CODES };

