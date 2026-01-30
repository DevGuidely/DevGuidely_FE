export function forceLogout() {
    localStorage.removeItem("accessToken");
}