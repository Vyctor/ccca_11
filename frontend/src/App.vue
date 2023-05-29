<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import CheckoutGateway from './gateway/CheckoutGateway';
import Order from './entity/Order';
import Product from './entity/Product';
const products = ref(Array<Product>());
const order = ref(new Order());
const success: any = ref({});

const checkoutGateway = inject('checkoutGateway') as CheckoutGateway;

async function checkout(): Promise<void> {
  const response = await checkoutGateway.checkout(order.value);
  success.value = response;
};

onMounted(async () => {
  products.value = await checkoutGateway.getProducts();
});
</script>


<template>
  <div class="module-name">Checkout</div>
  <div v-for="product in products">
    <div class="product-description">
      {{ product.description }}
    </div>
    <div class="product-price">
      {{ product.price }}
    </div>
    <button class="product-add-button" @click="order.addItem(product)">Add</button>
  </div>
  <div class="total">{{ order.getTotal() }}</div>
  <div v-for="item in order.items">
    <div class="order-item">{{ item.idProduct }} {{ item.quantity }}</div>
  </div>
  <button class="checkout-button" @click="checkout()">Checkout</button>
  <div class="success">
    {{ success.total }}
  </div>
</template>

<style scoped></style>

