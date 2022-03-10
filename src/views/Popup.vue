<template>
  <div class="ph-wiki-popup_container">
    <ul class="ph-wiki-popup_list">
      <li class="ph-wiki-popup_list-item" @click="actionLink('home')">
        <span class="ph-wiki-popup_list-icon">
          <el-icon>
            <home-filled />
          </el-icon>
        </span>
        <span class="ph-wiki-popup_list-label">Confluence</span>
      </li>
      <li class="ph-wiki-popup_list-item" @click="actionLink('about')">
        <span class="ph-wiki-popup_list-icon">
          <el-icon>
            <list />
          </el-icon>
        </span>
        <span class="ph-wiki-popup_list-label">常用wiki</span>
      </li>
      <li class="ph-wiki-popup_list-item" @click="actionLink('note')">
        <span class="ph-wiki-popup_list-icon">
          <el-icon>
            <flag />
          </el-icon>
        </span>
        <span class="ph-wiki-popup_list-label">我的笔记</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { HomeFilled, Flag, List } from '@element-plus/icons-vue'
import { getIPs } from '@/utils/getIp'
import { isLAN } from '@/utils/isLan'

const actionLink = (tag) => {
  let path
  switch (tag) {
    case 'home': 
      const lan = 'http://10.10.201.225:8090'
      const url = 'https://www.baidu.com/'
      getIPs().then(data => {
        if(data.length) {
          console.log(isLAN(data[0]))
          if(isLAN(data[0])) {
            window.open(lan)
          } else {
            window.open(`https://www.baidu.com/`)
          }
        }
      }).catch(() => {
        window.open(lan)
      }) 
      break
    case 'about':
      path = '/about'
      break
    case 'note':
      path = '/note'
      break
  }
  try {
    // eslint-disable-next-line no-undef
    const chromeObj = chrome
    const bgExt = chromeObj.extension.getBackgroundPage()
    bgExt.clearDataInfo()
    chromeObj.tabs.getSelected(null, function  (tab) { //获取当前tab
      console.log('getSelected popup', tab)
      const host = window.location.host
      if (tab.url == 'chrome://extensions/'){
        localStorage.setItem('pageAction', tag)
        chromeObj.tabs.create({url: 'chrome://newtab/' }); 
      } else if (tab.url == 'chrome://newtab/') {
         localStorage.setItem('pageAction', tag)
         chromeObj.tabs.create({url: 'chrome://newtab/' }); 
      } else {
        //向tab发送请求
        chromeObj.tabs.sendRequest(tab.id, { action: `${tag}Action`, tag:tag, host: window.location.origin + window.location.pathname },  function  (response) {
          console.log('response', response);
        });
      }
    });
  } catch (error) {
    
  }
}
</script>

<style lang="scss">
.ph-wiki-popup_container {
  width: 120px;
  padding: 10px 0;
  .ph-wiki-popup_list {
    .ph-wiki-popup_list-item {
      display: flex;
      justify-items: center;
      padding: 4px 10px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
      .ph-wiki-popup_list-icon {
        display: flex;
        justify-items: center;
        .el-icon{
          display: inline-block;
          width: 16px;
          height: 16px;
          svg {
            width: 16px;
            height: 16px;
            color: #3A81FF;
          }
        } 
      }
      .ph-wiki-popup_list-label {
        padding-left: 6px;
        font-size: 14px;
      }
    }
  }
}
</style>