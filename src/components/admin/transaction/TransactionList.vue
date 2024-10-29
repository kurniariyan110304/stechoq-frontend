<template>
  <div class="transaction-list">
    <div class="header">
      <h2>Daftar Transaksi</h2>
      <button class="add-btn" @click="showAddTransactionForm">
        Tambah Transaksi
      </button>
    </div>

    <!-- Tampilkan form transaksi jika showForm true -->
    <TransactionForm
      v-if="showForm"
      :transaction="newTransaction"
      @submit="addTransaction"
      @cancel="hideAddTransactionForm"
    />

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Karyawan</th>
            <th>Nama Barang</th>
            <th>Jumlah Pinjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Status</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.kode">
            <td>{{ transaction.kode }}</td>
            <td>{{ transaction.namaKaryawan }}</td>
            <td>{{ transaction.namaBarang }}</td>
            <td>{{ transaction.jumlahPinjam }}</td>
            <td>{{ transaction.tanggalPinjam }}</td>
            <td>{{ transaction.tanggalKembali }}</td>
            <td>{{ transaction.status }}</td>
            <td class="action-buttons">
              <button
                class="verif-btn"
                @click="verifikasi(transaction)"
                :disabled="transaction.status === 'Returned'"
              >
                {{ transaction.status === "Returned" ? "Returned" : "Verifikasi" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TransactionForm from './TransactionForm.vue';

export default {
  components: { TransactionForm },
  data() {
    return {
      showForm: false, // Kontrol untuk tampilkan form transaksi
      newTransaction: {}, // Objek transaksi baru
      transactions: [
        {
          kode: 1,
          namaKaryawan: "Riyan",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 20,
          tanggalPinjam: "2024-8-10",
          tanggalKembali: "2024-8-17",
          status: "Borrowed",
        },
        {
          kode: 2,
          namaKaryawan: "Kurnia",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 10,
          tanggalPinjam: "2022-02-10",
          tanggalKembali: "2022-03-01",
          status: "Verified",
        },
      ],
    };
  },
  methods: {
    showAddTransactionForm() {
      this.newTransaction = {}; // Reset objek transaksi baru
      this.showForm = true;
    },
    hideAddTransactionForm() {
      this.showForm = false;
    },
    addTransaction(transaction) {
      transaction.kode = this.transactions.length + 1; // Berikan kode unik
      this.transactions.push(transaction); // Tambahkan ke daftar transaksi
      this.hideAddTransactionForm(); // Sembunyikan form setelah submit
    },
    verifikasi(transaction) {
      this.transactions = this.transactions.map((item) => {
        if (item.kode === transaction.kode) {
          item.status = "Returned";
        }
        return item;
      });
    },
  },
};
</script>
  
  <style scoped>
  .transaction-list {
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  h2 {
    color: #4b3f6b;
    font-size: 24px;
  }
  
  .add-btn {
    background-color: #754bc5;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
    vertical-align: middle;
  }
  
  th {
    background-color: #4b3f6b;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  tr:hover {
    background-color: #ddd;
  }
  
  button {
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .verif-btn {
    background-color: #4caf50;
    color: white;
  }
  
  .verif-btn:hover {
    background-color: #45a049;
  }
  
  .verif-btn[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  /* Media query untuk responsif */
  @media (max-width: 600px) {
    th,
    td {
      padding: 8px 10px;
    }
  
    .action-buttons {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
  
    .action-buttons button {
      margin: 5px 0;
    }
  }
  </style>
  