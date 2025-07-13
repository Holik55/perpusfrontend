document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://perpustakaan-production-f0df.up.railway.app/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Pendaftaran berhasil! Silakan login.');
      window.location.href = 'login.html';
    } else {
      alert(data.error || 'Gagal mendaftar');
    }

  } catch (error) {
    alert('Gagal terhubung ke server');
    console.error(error);
  }
});
