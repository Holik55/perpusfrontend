document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://perpustakaan-production-969d.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password })
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = 'admin/dashboard.html';
    } else {
      alert(data.message || 'Login gagal');
    }

  } catch (error) {
    alert('Gagal terhubung ke server');
    console.error(error);
  }
});
