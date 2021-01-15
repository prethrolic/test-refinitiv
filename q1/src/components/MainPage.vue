<template>
  <div class='container'>
    <div id='col-1'>
      <input
        v-model="numberInput"
        v-on:change="change"
        type="number"
        placeholder = "input an integer"
      />
    </div>
    <div id='col-2'>
      <select v-model="selectedFunc">
        <option disabled value="">please select a function</option>
        <option>isPrime</option>
        <option>isFibonacci</option>
      </select>
    </div>
    <div id='col-3'>
      <div v-if="loading">computing..</div>
      <div v-else v-html="result" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainPage',
  data() {
    return {
      numberInput: null,
      selectedFunc: '',
      loading: false,
      fiboList: [1, 1],
    };
  },
  methods: {
    change(e) {
      const { target: { value } } = e;
      if (value >= 1 && !Number.isInteger(value)) this.numberInput = Math.round(value);
      else this.numberInput = 1;
    },
    isPrime(n) {
      let i;
      if (i === 1) return false;
      for (i = 2; i <= Math.floor(Math.sqrt(n)); i += 1) {
        if (n % i === 0) return false;
      }

      return true;
    },
    isFibonacci(n) {
      const { fiboList } = this;
      const l = fiboList.length;
      if (fiboList[l - 1] >= n) {
        return fiboList.includes(n);
      }

      let m = l - 1;
      let k = l - 2;
      let nextFibo;

      while (true) {
        nextFibo = fiboList[m] + fiboList[k];
        fiboList.push(nextFibo);

        if (nextFibo >= n) break;

        m += 1;
        k += 1;
      }
      return fiboList.includes(n);
    },
    getResult() {
      const { numberInput } = this;
      if (Number.isInteger(numberInput) && numberInput > 0) {
        this.loading = true;
        let answer;

        if (this.selectedFunc === 'isPrime') answer = this.isPrime(numberInput);
        if (this.selectedFunc === 'isFibonacci') answer = this.isFibonacci(numberInput);

        this.loading = false;
        return answer;
      }

      return '';
    },
  },

  computed: {
    result() {
      return this.getResult();
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  min-width: 600px;
  display: inline-flex;
}

#col-1, #col-2, #col-3 {
  height: 100vh;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 16px;
}

#col-1 {
  width: 200px;
}

#col-2 {
  flex: 1;
}

#col-3 {
  width: 300px;
}
</style>
