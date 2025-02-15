<template>
  <div class="item-list container py-4">
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <h2>Daftar Barang</h2>
      <button class="btn btn-primary" @click="showAddForm">Tambah Barang</button>
    </div>
    <div class="row">
      <ItemCard
        v-for="item in items"
        :key="item.kode"
        :item="item"
        @edit-item="editItem"
        @delete-item="deleteItem"
        class="col-md-4 mb-0"
      />
    </div>
    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import ItemCard from "./ItemCard.vue";
import Modal from "../../Modal.vue";
import ItemForm from "./ItemForm.vue";
import { EventBus } from "@/utils/eventBus";
import { useItemStore } from "../../../store/itemStore";

export default {
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },

  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false,
      searchQuery: "",
    };
  },

  computed: {
    items() {
      return this.itemStore.items;
    },
    filteredItems() {
      return this.items.filter((item) => {
        return (
          item.kode.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  methods: {
    showAddForm() {
      this.selectedItem = { kode: "", nama: "", deskripsi: "", stok: "" };
      this.isEdit = false;
      this.showForm = true;
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    handleSubmit(item) {
      if (item.kode && item.nama && item.deskripsi && item.stok !== null && !isNaN(item.stok)) {
        this.isEdit ? this.itemStore.updateItem(item) : this.itemStore.addItem(item);
        this.showForm = false;
      }
    },
    cancelEditForm() {
      this.showForm = false;
    },
    deleteItem(kode) {
      this.itemStore.deleteItem(kode);
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },

  mounted() {
    EventBus.on("search", this.handleSearch);
  },

  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },

  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
};
</script>

<style scoped>
.item-list {
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

.add-btn:hover {
  background-color: #5a37a0;
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

.edit-btn {
  background-color: #4caf50;
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

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

.item-list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header h2 {
  color: #4b3f6b;
  font-size: 24px;
}
</style>
