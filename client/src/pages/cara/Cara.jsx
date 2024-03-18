import React from 'react'
import "./Cara.scss"
import { Link } from 'react-router-dom'

const Cara = () => {
  return (
    <div className='cara'>
      <div className="container">
        <div className="tentang">
          <h1>Tentang Pasar Game</h1>
          <div className="content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae architecto culpa, esse earum dicta officiis? Harum aut sapiente error quis accusamus animi doloribus optio quaerat nam iure. Ex, deleniti harum.</p>
          </div>
        </div>
        <div className="ketentuan">
          <h1>Ketentuan Pasar Game</h1>
          <div className="list">
            <ol>
              <li>Transaksi menggunakan middleman website Pasar Game <strong>Hanya menggunakan group chat Website Pasar Game.</strong></li>
              <li>Trasaksi yang dilakukan diluar website Pasar Game tidak menjadi tanggung jawab dari website Pasar Game</li>
              <li>Terdapat biaya transaksi di website Pasar Game. Biaya disesuaikan dengan nominal transaksi </li>
            </ol>
          </div>
          <div className="alur">
            <h1>Alur Transaksi </h1>
            <div className="list">
              <ol>
              <li>Penjual dan Pembeli sepakat untuk bertransaksi di website Pasar Game.</li>
              <li>Pembeli menekan tombol Pesan Sekarang pada halaman detail akun yang akan dibeli untuk melakukan order.</li>
              <li>Penjual mengkonfirmasi order yang dilakukan oleh pembeli pada halaman Orders.</li>
              <li>Admin Pasar Game akan membuat group chat dari order yang telah terkonfirmassi.</li>
              <li>Admin mengirim form transaksi pada group chat.</li>
              <li>Penjual dan Pembeli mengisi form transaksi pada group chat.</li>
              <li>Admin mengirim nomor rekening atau e-wallet Pasar Game untuk pembeli mengirimkan dana sebesar yang tertera pada form yang diisi.</li>
              <li>Pembeli mengirim dana transaksi ke rekening Pasar Game dan mengirimkan bukti transaksi ke email Pasar Game.</li>
              <li>Admin mengkonfirmasi dana yang telah dikirim oleh pembeli.</li>
              <li>Setelah dana pembelian terkonfirmasi, admin memberikan instruksi kepada penjual untuk mengirim detail informasi akun kepada pembeli melalui pesan pribadi, email, whatsapp, facebook, dll</li>
              <li>Pembeli kemudian mengamankan dan mengganti informasi akun. Tips untuk mengamankan akun dapat dilihat pada 
                 <Link className='link' to="/tips"><span> Tips Amankan Akun</span></Link>
              </li>
              <li>Setelah akun aman, pembeli mengkonfirmasi pada group chat untuk meneruskan dana ke penjual.</li>
              <li>Admin meminta nomor rekening atau e-wallet penjual untuk meneruskan dana.</li>
              <li>Penjual mengirim nomor rekening atau e-wallet ke group chat. Pastikan nomor sudah benar, admin tidak bertanggung jawab apabila salah kirim karna kesalahan pengguna.</li>
              <li>Admin memproses pengiriman dana ke penjual</li>
              <li>Penjual mengkonfirmasi dana telah masuk.</li>
              <li>Transaksi selesai, pembeli menandai bahwa order telah selesai dengan menekan tombol Selesaikan Pesanan pada halaman Orders, dan peenjual menandai iklan sebagai Terjual pada halaman Iklan Saya.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cara