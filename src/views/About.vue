<template>
  <div class="ph-wiki-about_container">
    <div class="ph-wiki-about_header">
      <span class="ph-wiki-about_header-title">
        <span class="ph-wiki-about_header-label">常用网址</span>
      </span>
      <span class="ph-wiki-about_header-icon" v-show="!props.closeIcon" @click="closeTabs">
       <el-icon><Close /></el-icon>
      </span>
    </div>
    <ul v-show="sourceList.length > 0" class="about-list __scrollbar" style="overflow: auto">
      <div class="search-autocomplete-box">
        <el-autocomplete
          v-model="searchVal"
          :fetch-suggestions="querySearch"
          class="search-autocomplete"
          popper-class="search-autocomplete-item"
          placeholder="搜索"
          @select="handleSelect"
        >
          <template #suffix>
            <el-icon class="el-input__icon">
              <search  />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="value">{{ item.title }}</div>
            <span class="link">{{ item.link }}</span>
          </template>
        </el-autocomplete>
      </div>
      <li v-for="(i, index) in (selectResults.length > 0 ? selectResults : sourceList)" :key="i" class="about-list_item" :class="'container_' + index">
        <el-affix :target="'.container_' + index" class="affix_box" :offset="118" v-show="selectResults.length == 0">
          <div class="title" :class="{isFix: isAffix}">{{ i.label }}</div>
        </el-affix>
        <div v-for="(o,oi) in i.webList" :key="oi" class="about-list_item-card" :class="{'mg-top': selectResults.length > 0}">
          <div class="item-card_title">标题：{{ o.title }}</div>
          <div class="item-card_content">
            <div class="item-card_content-link">网址：<a :href="o.link" target="_blank">{{ o.link }}</a></div>
            <div v-for="(c,ci) in o.countList" :key="ci" class="item-card_content-count">
              <span>账号：{{ c.count }}</span> <span>密码：{{ c.pwd }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <el-empty v-show="sourceList.length === 0" description="description"></el-empty>
  </div>
</template>

<script setup>
import data from '@/service/data.json'
import { StarFilled, Search,Close  } from '@element-plus/icons-vue'
import { ref, onMounted, defineProps } from 'vue'

const searchVal = ref('')
const selectResults = ref([])
const sourceList = ref([])
const restaurant = ref([])
const props = defineProps(['closeIcon'])
const isAffix = ref(false)


const querySearch = (queryString, cb) => {
  console.log(queryString, 'lllllllllll')
  if(queryString === '') {
    selectResults.value = []
  }
  const results = queryString
    ? restaurant.value.filter(createFilter(queryString))
    : restaurant.value
  // call callback function to return suggestion objects
  cb(results)
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || restaurant.link.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
    )
  }
}
const loadAll = () => {
  let resList = []
  data.forEach(item => {
    resList.push(...item.webList)
  });
  console.log(resList, 'dasdasd')
  return resList
}

const handleSelect = (item) => {
  searchVal.value = item.title
  selectResults.value = [{webList:[item]}]
  console.log(item, '2313', selectResults.value)
}

const load = () => {
  // restaurant.value.push(2)
}

const closeTabs = () => {
  const chromeObj = chrome
  const tag = 'close'
  chromeObj.tabs.getSelected( null ,  function  (tab) { //获取当前tab
    //向tab发送请求
    chromeObj.tabs.sendRequest(tab.id, { action: `${tag}Action` },  function  (response) {
      console.log('response', response);
    });
  });
}

onMounted(() => {
  sourceList.value = data
  restaurant.value = loadAll()
})
</script>

<style lang="scss">
.ph-wiki-about_container{
  background: #fff;
   .ph-wiki-about_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    background-color: #fff;
    border-bottom: 1px solid #e5e6eb;
    padding: 0 20px;
    padding-right: 10px;
    margin-right: 10px;
    z-index: 101;
    .ph-wiki-about_header-title {
      margin-left: 9px;
      .ph-wiki-about_header-label {
        font-size: 16px;
        font-weight: 500;
        color: #1e80ff;
      }
      .ph-wiki-about_header-time {
        margin-left: 20px;
        font-size: 12px;
        color: #86909c;
        font-weight: 400;
      }
    }
    .ph-wiki-about_header-icon {
      display: flex;
      justify-items: center;
      cursor: pointer;
      .el-icon{
        display: inline-block;
        width: 18px;
        height: 18px;
        svg {
          width: 18px;
          height: 18px;
        }
      } 
    }
  }
  .about-list {
    height: 100vh;
    padding: 0;
    list-style: none;
    .search-autocomplete-box {
      position: fixed;
      top: 66px;
      right: 10px;
      left: 0;
      display: flex;
      justify-content: center;
      padding: 10px 0;
      background-color: #ffffff;
      z-index: 101;
      .el-autocomplete {
        width: 90%;
        box-sizing: border-box;
      }
    }
    .about-list_item {
      margin: 132px 20px 20px 20px;
      &:last-child{
        margin-top: 26px;
      }
      .affix_box {
        .title {
          background-color: #ffffff;
          font-weight: bold;
          font-size: 20px;
          padding-bottom: 10px;
          display: flex;
          &.isFix {
            justify-content: center;
          }
        }
      }
      .about-list_item-card {
        background-color: #F1F3F4;
        border-radius: 6px;
        margin-top: 16px;
        padding: 10px;
        &.mg-top {
          margin-top: 124px;
        }
        &:first-child{
          margin-top: 0;
        }
        .item-card_title {
          font-weight: bold;
        }
        .item-card_content {
          margin-top: 10px;
          color: #313131;
          .item-card_content-link {
            margin-bottom: 6px;
            font-size: 16px;
          }
          .item-card_content-count {
            cursor: pointer;
            margin-bottom: 4px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>