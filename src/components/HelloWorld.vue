<template>
  <div>
    <stripe-elements class="c" ref="elementsRef" :pk="publishableKey" :amount="amount" locale="auto" @token="tokenCreated" @loading="loading = $event">
    </stripe-elements>
    <button @click="submit">Pay ${{amount / 100}}</button>
  </div>
</template>
 
<script>
import { StripeElements } from 'vue-stripe-checkout';
import axios from 'axios'
export default {
  components: {
    StripeElements
  },
  data: () => ({
    loading: false,
    amount: 1000,
    publishableKey: '',//own key
    token: null,
    charge: null
  }),
  methods: {
    submit() {
      this.$refs.elementsRef.submit();
    },
    tokenCreated(token) {
      console.log(token);
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        token: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: 'test pay' // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    async sendTokenToServer(charge) {
      const data = await axios.post('http://localhost:3000/pay', charge)
      if (data.data.status == "succeeded") {
        alert('success')
      } else {
        alert("failed")
      }
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create

    }
  }
}
</script> 
<style lang="" scoped>
.c {
  margin: 0 auto;
  width: 400px;
}
</style>