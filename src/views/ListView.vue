<template>
  <v-container class="starry-bg pa-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="starry-card pa-6" elevation="10">
          <h1 class="title yellow--text text-center mb-6">未完成事項</h1>

          <v-text-field
            ref="inputTextField"
            v-model="input"
            append-icon="mdi-plus"
            clearable
            label="新增事項"
            :rules="[rules.required, rules.length]"
            @click:append="onInputSubmit"
            @keydown.enter="onInputSubmit"
            class="starry-input mb-4"
          />

          <v-table class="starry-table mb-6">
            <thead>
              <tr>
                <th class="white--text">事項</th>
                <th class="white--text">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="list.items.length === 0">
                <td colspan="2" class="text-center white--text">沒有項目</td>
              </tr>
              <tr v-for="(item, i) in list.items" :key="item.id">
                <td>
                  <v-text-field
                    v-show="item.edit"
                    ref="editTextField"
                    v-model="item.model"
                    autofocus
                    :rules="[rules.required, rules.length]"
                    class="starry-input"
                  />
                  <span v-show="!item.edit" class="white--text">{{ item.text }}</span>
                </td>
                <td>
                  <template v-if="item.edit">
                    <v-btn
                      icon="mdi-check"
                      class="starry-btn mx-1"
                      @click="onEditSubmit(item.id, i)"
                    />
                    <v-btn
                      icon="mdi-undo"
                      class="starry-btn mx-1"
                      @click="list.cancelEdit(item.id)"
                    />
                  </template>
                  <template v-else>
                    <v-btn
                      icon="mdi-pencil"
                      class="starry-btn mx-1"
                      @click="list.editItem(item.id)"
                    />
                    <v-btn
                      icon="mdi-delete"
                      class="starry-btn mx-1"
                      @click="list.delItem(item.id)"
                    />
                  </template>
                </td>
              </tr>
            </tbody>
          </v-table>

          <h1 class="title yellow--text text-center mt-8">已完成事項</h1>
          <!-- 如果有完成清單可以放這 -->
          <v-table class="starry-table">
            <thead>
              <tr>
                <th class="white--text">事項</th>
                <th class="white--text">完成時間</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="completed.items.length === 0">
                <td colspan="2" class="text-center white--text">尚未有完成的事項</td>
              </tr>
              <tr v-for="item in completed.items" :key="item.id">
                <td class="white--text">{{ item.text }}</td>
                <td class="white--text">{{ item.completedAt }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import { useListStore } from '@/stores/list'
import { useCompletedStore } from '@/stores/completed'

const input = ref('')
const completed = useCompletedStore()
const list = useListStore()
const inputTextField = useTemplateRef('inputTextField')
const editTextField = useTemplateRef('editTextField')

const rules = {
  required: v => !!v || '必填',
  length: v => v.length >= 3 || '必須要三個字以上',
}

const onInputSubmit = () => {
  if (!inputTextField.value.isValid) return
  list.addItem(input.value)
  inputTextField.value.reset()
}

const onEditSubmit = (id, i) => {
  if (!editTextField.value[i].isValid) return
  list.submitEdit(id)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto&display=swap');

.starry-bg {
  background: url('assets/milky-way-5905903_1920.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.starry-card {
  background: rgba(10, 24, 56, 0.85);
  border-radius: 20px;
  box-shadow: 0 0 15px 2px rgba(241, 196, 15, 0.7), inset 0 0 10px 3px rgba(255, 255, 255, 0.1);
  color: #f1c40f;
  font-family: 'Playfair Display', serif;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.starry-btn {
  color: #f1c40f !important;
}
.starry-btn:hover {
  background: linear-gradient(45deg, #f1c40f, #2980b9);
  color: #000 !important;
}

.starry-input input {
  color: white !important;
}
.starry-input .v-label {
  color: #f1c40f !important;
}
.starry-input .v-field__outline {
  border-color: #f1c40f !important;
}

.starry-table {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}
</style>
