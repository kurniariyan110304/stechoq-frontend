<template>
  <div id="app">
    <Header
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />
    <div class="app-content">
      <Sidebar
        :currentRole="currentRole"
        :isSidebarVisible="isSidebarVisible"
        @showComponent="navigateTo"
      />
      <div class="main-content" :class="{ expanded: isSidebarVisible }">
        <component
          :is="currentView"
          :currentComponent="currentComponent"
          v-if="currentRole === 'admin'"
          @add-user="handleAddUser"
          @edit-user="handleEditUser"
          @delete-user="handleDeleteUser"
          @add-item="handleAddItem"
          @edit-item="handleEditItem"
          @delete-item="handleDeleteItem"
        />

        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/dashboard/Header.vue";
import Sidebar from "./components/dashboard/Sidebar.vue";
import AdminViews from "./views/AdminViews.vue";
import UserViews from "./views/UserViews.vue";

export default {
  components: {
    Header,
    Sidebar,
    AdminViews,
    UserViews,
  },
  data() {
    return {
      currentRole: this.$route.name || "admin",
      isSidebarVisible: true,
      searchTerm: "",
      currentComponent: null,
    };
  },

  watch: {
    '$route.name'(newRole) {
      this.currentRole = newRole;
    }
  },
  computed: {
    currentView() {
      return this.currentRole === "admin" ? AdminViews : UserViews;
    },
  },

  methods: {
    updateRole(role) {
      this.currentRole = role;
      this.navigateTo("items");
    },

    navigateTo(component) {
      this.currentComponent = component;
      this.$router.push({name: this.currentRole, params: {component}});
    },

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },

    handleSearch(newQuery) {
      console.log("Search term:", newQuery);
      if (this.currentRole === "admin") {
        console.log("Search in admin items");
      } else if (this.currentRole === "user") {
        console.log("Search in user items");
      }
    },

    mounted() {
    EventBus.on("search", this.handleSearch);
  },

  },


};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #4b3f6b;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #4b3f6b;
}

.app-content {
  display: flex;
  flex-grow: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font: 1em sans-serif;
  height: calc(100vh - 60px);
  margin-top: 60px;
  background-color: #4b3f6b;
}

.main-content {
  flex-grow: 1;
  transition: margin-left 0.3s ease;
}

.main-content.expanded {
  margin-left: 200px;
}

.app-content.noHeader {
  margin-top: 0;
  height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    margin-top: 180px;
  }

  .app-content.noHeader {
    margin-top: 0;
    height: calc(100vh - 60px);
  }
}
</style>