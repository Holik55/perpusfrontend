// Tambahkan algoritma Boyer-Moore
function boyerMoore(text, pattern) {
  const n = text.length;
  const m = pattern.length;

  const badChar = new Array(256).fill(-1);
  for (let i = 0; i < m; i++) {
    badChar[pattern.charCodeAt(i)] = i;
  }

  let s = 0;
  while (s <= (n - m)) {
    let j = m - 1;
    while (j >= 0 && pattern[j].toLowerCase() === text[s + j]?.toLowerCase()) {
      j--;
    }

    if (j < 0) {
      return s;
    } else {
      s += Math.max(1, j - badChar[text.charCodeAt(s + j)] || 0);
    }
  }
  return -1;
}

// Event listener pencarian
document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const query = document.getElementById('searchInput').value.trim();
  if (!query) return alert('Masukkan kata kunci pencarian!');

  try {
    // Ambil semua buku dari API
    const res = await fetch('http://localhost:3000/api/books');
    const books = await res.json();

    // Filter hasil berdasarkan pencocokan Boyer-Moore pada judul, pengarang, atau kategori
    const filtered = books.filter(book => {
      return (
        boyerMoore(book.title, query) !== -1 ||
        boyerMoore(book.pengarang, query) !== -1 ||
        boyerMoore(book.kategori, query) !== -1
      );
    });

    renderResults(filtered, query);
  } catch (error) {
    console.error('Gagal memuat hasil pencarian:', error);
    alert('Terjadi kesalahan saat mencari buku');
  }
});

function getDriveImageUrl(originalUrl) {
  const match = originalUrl.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return originalUrl; // fallback kalau bukan link Google Drive
}

function renderResults(books, query) {
  const overlay = document.querySelector('.overlay');

  overlay.innerHTML = `
    <h1>Hasil Pencarian</h1>
    <h4 class="mb-4">"${query}" - Ditemukan ${books.length} buku</h4>

    ${books.length === 0
      ? '<p class="text-muted">Tidak ada buku yang cocok.</p>'
      : `
      <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              <th>Cover</th>
              <th>Judul</th>
              <th>Pengarang</th>
              <th>Kategori</th>
              <th>Tahun</th>
              <th>Rak</th>
            </tr>
          </thead>
          <tbody>
            ${books.map(book => `
              <tr>
                <td><img src="${getDriveImageUrl(book.cover_image_url)}" alt="Cover" width="50"></td>
                <td>${book.title}</td>
                <td>${book.pengarang}</td>
                <td>${book.kategori}</td>
                <td>${book.thnterbit}</td>
                <td>${book.no_rak}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`}

    <button class="btn btn-secondary mt-4" onclick="location.reload()">🔙 Cari Lagi</button>
  `;
}
