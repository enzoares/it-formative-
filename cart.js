
window.addToCart = (id, kategori) => {
    // Ambil data keranjang yang sudah ada di localStorage, jika belum ada buat array kosong
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Cari data produk berdasarkan ID dari database 'data' di script.js
    // Catatan: Pastikan variabel 'data' di script.js bersifat global/bisa diakses
    let item = data[kategori].find(x => x.id === id);

    if (item) {
        cart.push(item);
        // Simpan kembali ke localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.nama} telah ditambahkan ke keranjang!`);
    }
};

// 2. FUNGSI TAMPILKAN ISI KERANJANG
// Dipanggil otomatis saat halaman keranjang.html dibuka
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceDisplay = document.getElementById('total-price');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (!cartContainer) return; // Keluar jika bukan di halaman keranjang

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <p>Keranjang Anda masih kosong.</p>
                <br>
                <a href="foodmenu.html" style="color:#c9a96e; text-decoration:none;">Mulai Belanja</a>
            </div>`;
        totalPriceDisplay.innerText = "Total: Rp 0";
        return;
    }

    // Render daftar barang
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.harga;
        cartContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding:15px 0;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="${item.img}" style="width:60px; height:60px; object-fit:cover; border:1px solid #c9a96e;">
                    <div>
                        <h4 style="color:#c9a96e;">${item.nama}</h4>
                        <p style="font-size:12px; color:#bbb;">Rp ${item.harga.toLocaleString()}</p>
                    </div>
                </div>
                <button onclick="removeItem(${index})" style="background:transparent; color:#ff4d4d; border:1px solid #ff4d4d; padding:5px 10px; cursor:pointer; font-size:11px;">HAPUS</button>
            </div>
        `;
    });

    // Update Total Harga
    totalPriceDisplay.innerText = "Total Bayar: Rp " + total.toLocaleString();
}

// 3. FUNGSI HAPUS ITEM
window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Hapus 1 item berdasarkan urutannya
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh tampilan
};

// 4. FUNGSI CHECKOUT
window.checkout = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    alert("Pesanan Anda telah diterima! Chef kami sedang menyiapkannya.");
    localStorage.removeItem('cart'); // Kosongkan keranjang
    window.location.href = "index.html"; // Kembali ke beranda
};

// Jalankan fungsi tampilkan saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayCart);