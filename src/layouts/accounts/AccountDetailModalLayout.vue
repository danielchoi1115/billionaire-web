<template>
  <v-row no-gutters>
    <v-col cols="12" sm="6">
      <v-sheet class="m-2"><slot name="accNo"></slot> </v-sheet>
    </v-col>
    <v-col cols="12" sm="6">
      <v-sheet class="m-2"><slot name="userNo"></slot></v-sheet>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="m-2"><slot name="accName"></slot></v-sheet>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="m-2"> <slot name="accIssuer"></slot> </v-sheet>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="m-2"> <slot name="accCurrency"></slot> </v-sheet>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="m-2"> <slot name="audit"></slot> </v-sheet>
    </v-col>
  </v-row>
</template>
<script setup></script>
