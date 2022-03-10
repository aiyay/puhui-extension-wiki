<template>
	<div class="common-layout">
    <Aside class="aside">
      这是顶
    </Aside>
    <div class="box">
      <div class="inbox">
        <Header class="header">
          <div class="header-box">
            <div class="header-tip">qowep</div>
            <el-input v-model="inputSearch" size="large" class="input-search" placeholder="Type something">
            </el-input>
            <!-- <div :class="$style.headerContent">
              <div :class="$style.headerContentBox">
                <div :class="$style.headerContentIconBox" v-for="itm in num" :key="itm">
                  {{itm}}
                </div>
              </div> 
              <div :class="$style.headerContentBox">
                <div :class="$style.headerContentLabelBox" v-for="itm in num" :key="itm">
                  {{itm}}
                </div>
              </div> 
              <div :class="$style.headerContentBox">
                <div :class="$style.headerContentBtnBox" v-for="itm in num" :key="itm">
                  {{itm}}
                </div>
              </div>
            </div> -->
          </div>
        </Header>
        <Content class="content">
          xxxxxx
        </Content>
      </div>
    </div>
    <Footer class="footer">
      这是底
    </Footer>
	</div>
</template>
<script>
import Aside from '@/components/Layout/Aside'
import Header from '@/components/Layout/Header'
import Content from '@/components/Layout/Content'
import Footer from '@/components/Layout/Footer'
import { ref } from 'vue'

export default {
  name: 'Bookstore',
  components: {
    Aside,
    Header,
    Content,
    Footer,
  },
  setup() {
    const height = '40px'
    const num = 8
    const inputSearch = ref('')
    return {
      height,
      num,
      inputSearch,
      }
    }
}
</script>
<style lang='scss' module>
.common-layout {
  .aside {
    background-color: #6D6853;
    min-height: 180px;
    background-image: linear-gradient(45deg, #222627,#25292C,#474944,  #4F5147, #6D6853,#6F6951);
  }
  .box {
    border-top: 30px solid #2C1916;
    border-left: 30px solid #5D302F;
    border-right: 30px solid #5D302F;
    margin: 0 160px;
    .inbox{                                                                                                    
      border-left: 30px solid #381F1F;
      border-right: 30px solid #381F1F;
      .header {
        overflow: hidden;
        height: 280px;
        .header-box {    
          background-color: #8F6E43;
          border-bottom: 14px solid #3A2E20;
          height: 266px;
          position: relative;
          .header-tip {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 50%;
            top: 20px;
            margin-left: -80px;
            width: 160px;
            height: 40px;
            background-color: #918169;
            border-bottom:2px solid #6A5A3D;
            border-top:2px solid #6A5A3D;
            border-right: 6px solid #2E271B;
            border-left: 6px solid #2E271B;
          }
          .input-search {
            position: absolute;
            top: 80px;
            left:50%;
            right: 0;
            display: flex;
            margin-left: -384px;
            input {
              width: 768px;
              height: 40px;
              font-size: 20px;
              padding: 0 12px;
            }
          }
          .header-content {
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            .headerContentBox {
              display: flex;
              justify-content: center;
              .headerContentIconBox {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background-color: #9D9A97;
                border-top: 6px solid #fac85d;
                border-left: 6px solid #ce900a;
                border-right: 6px solid #ce900a;
                border-bottom: 6px solid #ce900a;
                border-radius: 4px;
                margin-right: 50px;
                &:last-child{
                  margin-right: 0;
                }
              }
              .headerContentLabelBox {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 72px;
                height: 20px;
                margin-right: 50px;
                &:last-child{
                  margin-right: 0;
                }
              }
              .headerContentBtnBox {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 72px;
                height: 20px;
                margin-right: 50px;
                &:last-child{
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
      .content {
        overflow: hidden;
        background-color: aquamarine;
        height: 2000px;
      }
    }
  }
  .footer {
    height: 80px;
    background-image: linear-gradient(to right, #251C17, #38302c, #463831, #5D4F40, #463831,#38302c, #251C17);
  }
}
</style>
