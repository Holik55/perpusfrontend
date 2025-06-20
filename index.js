document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const query = document.getElementById('searchInput').value.trim();
  if (!query) return alert('Masukkan kata kunci pencarian!');

  try {
    const res = await fetch(`http://localhost:3000/api/books/search?query=${encodeURIComponent(query)}`);
    const books = await res.json();

    renderResults(books, query);
  } catch (error) {
    console.error('Gagal memuat hasil pencarian:', error);
    alert('Terjadi kesalahan saat mencari buku');
  }
});

function renderResults(books, query) {
  const overlay = document.querySelector('.overlay');

  overlay.innerHTML = `
    <h1>Hasil Pencarian</h1>
    <h4 class="mb-4">"${query}" - Ditemukan ${books.length} buku</h4>

    ${books.length === 0
      ? '<p class="text-muted">Tidak ada buku yang cocok.</p>'
      : `
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              
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
