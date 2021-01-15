<template>
  <div class='container'>
    <input 
      v-model="filter" 
      type="text"
      placeholder="type word to filter.."
    >
    <table>
      <thead>
        <th>categories</th>
      </thead>
      <tr v-for="entry in filterCategories" v-bind:key='entry'>
        <td >
          {{ entry }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'MainPage',
  data() {
    return {
      categories: [],
      filter: '',
    };
  },
  methods: {
    async getCategories() {
      const res = await fetch('https://api.publicapis.org/categories');
      const categories = await res.json();
      this.categories = categories;
      console.log(categories)
    },
  },
  computed: {
    filterCategories() {
      const { filter } = this;
      if (filter === '') return this.categories;
      return this.categories.filter((entry) => {
        return entry.toLowerCase().includes(filter.toLowerCase());
      })
    }
  },
  mounted() {
    this.getCategories();
  },
}
</script>
<style scoped>

.container {
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  margin: auto;
}

input[type=text] {
  width: 70%;
  padding: 8px 16px;
  margin: 24px 0;
}

table, th {
  border: 2px solid #445566;
  width: 90%;
  margin: auto;
  padding: 8px;
  border-collapse: collapse;
  text-align: center;
}

table {
  margin-bottom: 40px;
}

td {
  border: 1px solid #69839e;
  padding: 8px;
}

thead {
  background: #445566;
  color: white;
  text-transform: uppercase;
}
</style>