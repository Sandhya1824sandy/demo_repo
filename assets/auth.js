// User Auth Logic using localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('mm_users') || '{}');
}
function setUsers(users) {
  localStorage.setItem('mm_users', JSON.stringify(users));
}
function getCurrentUser() {
  return localStorage.getItem('mm_current_user');
}
function setCurrentUser(username) {
  if(username) localStorage.setItem('mm_current_user', username);
  else localStorage.removeItem('mm_current_user');
}
// Register
const regForm = document.getElementById('registerForm');
if(regForm){
  if(getCurrentUser()){
    // If already logged in, redirect to homepage
    window.location.href = 'index.html';
  } else {
    regForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('regUsername').value.trim();
      const password = document.getElementById('regPassword').value;
      const mobile = document.getElementById('regMobile').value.trim();
      const users = getUsers();
      if(users[username]){
        showPopup('User already exists!');
        return;
      }
      if(!/^\d{10}$/.test(mobile)){
        showPopup('Enter a valid 10-digit mobile number!');
        return;
      }
      users[username] = { password, mobile };
      setUsers(users);
      // Do NOT setCurrentUser here
      showPopup('Registration successful! Redirecting to login...');
      setTimeout(()=>window.location.href='login.html', 1500);
    });
  }
}
// Login
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const users = getUsers();
    if(!users[username] || users[username].password !== password){
      showPopup('Invalid username or password!');
      return;
    }
    setCurrentUser(username);
    showPopup('Login successful! Redirecting...');
    setTimeout(()=>window.location.href='index.html', 1500);
  });
}
// Navigation & Logout
window.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  const logoutBtn = document.getElementById('logoutBtn');
  if(user){
    if(logoutBtn) logoutBtn.style.display = 'inline-block';
    if(logoutBtn){
      logoutBtn.onclick = () => {
        setCurrentUser(null);
        showPopup('Logged out successfully!');
        setTimeout(()=>window.location.href='profile.html', 1200);
      };
    }
  } else {
    if(logoutBtn) logoutBtn.style.display = 'none';
  }
});