<template>
  <div class="ph-wiki-note_container __scrollbar">
    <div class="ph-wiki-note_header">
      <span class="ph-wiki-note_header-title">
        <span class="ph-wiki-note_header-label">我的笔记</span>
        <span class="ph-wiki-note_header-time" v-show="isShowNoteEdit">{{editTime}}</span>
      </span>
      <span class="ph-wiki-note_header-icon" v-show="!props.closeIcon" @click="closeTabs">
       <el-icon><Close /></el-icon>
      </span>
    </div>
    <div class="ph-wiki-note" v-show="!isShowNoteEdit">
      <div class="ph-wiki-note_list">
      <div class="ph-wiki-note_list-item" v-for="item in dataList" :key="item.id">
        <time class="list-item_timestamp" @click="editNote(item)">
          {{item.time}}
        </time>
        <div class="list-item_body" @click="editNote(item)">
          {{item.title}}
        </div>
        <div class="list-item_meta">
          <div class="list-item_meta-tags">
            <el-check-tag v-if="item.mark">{{item.mark}} </el-check-tag>
          </div>
          <div class="list-item_meta-menu">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-icon><more-filled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu  class="el-dropdown-link_menu">
                  <el-dropdown-item class="el-dropdown-link_menu-item" @click="editNote(item)">
                    <el-icon><edit /></el-icon><span>编 辑</span>
                  </el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-link_menu-item" @click="deleteNote(item.id)">
                    <el-icon><delete /></el-icon><span>删 除</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      </div>
      <div ref="addBtnRef" class="ph-wiki-note_bottom"  v-drag @click="addNote">
        <el-icon><Plus /></el-icon>
      </div>
    </div>
    <div class="ph-wiki-edit" v-show="isShowNoteEdit">
      <div class="ph-wiki-edit_content">
        <el-input
          v-model="editMark"
          class="ph-wiki-edit_mark-input"
          placeholder="请输入标签标题..."
        />
        <el-input
          v-model="editTextarea"
          autosize
          type="textarea"
          class="ph-wiki-edit_note-input"
          placeholder="笔记内容"
        />
        <div class="ph-wiki-edit_note-quote_box">
          <div class="ph-wiki-edit_note-quote">引用：{{quoteObj.quote}}</div>
          <div class="ph-wiki-edit_note-title">标题：{{quoteObj.title}}</div>
          <div class="ph-wiki-edit_note-url" :title="quoteObj.url">网址：{{quoteObj.url}}</div>
        </div>
      </div>
      <div class="ph-wiki-edit_bottom">
        <div class="ph-wiki-edit_btn-group">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave">保 存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// ToDo 自动填充功能 小浮窗
import { Plus, Close, MoreFilled, Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, ref, defineProps } from 'vue'

const isShowNoteEdit = ref(false)
const editTime = ref('')
const editMark = ref('')
const editTextarea = ref('')
const props = defineProps(['closeIcon'])
const quoteObj = ref({
  quote: '',
  title: document.title,
  url: window.location.href
})
const dataList = ref([])
const noteId = ref(null) 
const addBtnRef = ref(null)
const isDragging = ref(false)

// 自定义拖拽事件
const vDrag = {
  mounted(el, binding) {
    const docWidth = document.body.offsetWidth
    const docHeight = document.body.offsetHeight
    const addBtnWidth = addBtnRef.value.clientWidth
    const addBtnHeight = addBtnRef.value.clientHeight
    const canDragWidth = docWidth - addBtnWidth
    const canDragHeight = docHeight - addBtnHeight
    el.onmousedown = (e) => {
      console.log(e, binding, '---####---',addBtnWidth,addBtnHeight,canDragHeight )
      isDragging.value = false
      //鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX - el.offsetLeft;
      let disY = e.clientY - el.offsetTop;
      document.onmousemove = function (xy) {
        console.log('onmousemove')
        //通过事件委托，计算移动的距离 
        let w = xy.clientX - disX;
        let h = xy.clientY - disY;
        //移动当前元素 
        if (w < 0 || w > canDragWidth)  {
          el.style.left = `${w < 0 ? 0 : canDragWidth}px`;
        } else {
          el.style.left = w + 'px';
        }
        if (h < 0 || h > canDragHeight)  {
          el.style.top = `${h < 0 ? 0 : canDragHeight}px`;
        } else {
          el.style.top = h + 'px';
        }
        console.log(xy.pageX,xy.pageY)
        // 拖拽中的标识
        if(xy.pageX != e.clientX && xy.pageY != e.clientY) isDragging.value = true
        //将此时的位置传出去
        binding.value = {x:xy.pageX,y:xy.pageY}
      };
      // 移除事件
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
}

const addNote = () => {
  console.log(isDragging.value)
  console.log('add')
  if(!isDragging.value) {
    console.log(21312)
    isShowNoteEdit.value = true
    noteId.value = null
  }
}

const deleteNote = (id) => {
  for (var i = 0;i < dataList.value.length; i++) {
    if(dataList.value[i].id === id) {
      dataList.value.splice(i, 1)
    }
  }
}

const editNote = (item) => {
  isShowNoteEdit.value = true
  editTime.value = item.time
  noteId.value = item.id
  editTextarea.value = item.title
  editMark.value = item.mark
  quoteObj.value = {
    quote: item.quoteObj.quote || '',
    title: item.quoteObj.title || '',
    url: item.quoteObj.url || ''
  }
}
const formatNowDate = () => {
  const now = new Date()
  return  `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

const resetForm = () => {
  try {
    isShowNoteEdit.value = false
    editTextarea.value = ''
    editMark.value = ''
    const chromeObj = chrome
    // eslint-disable-next-line no-undef
    chromeObj.tabs.getSelected(null, function(tab) { //获取当前tab
      quoteObj.value = {
        quote: '',
        title: tab.title,
        url: tab.url
      }
    })
  } catch (error) {
    console.log('resetForm',error)
  }
}

const handleCancel = () => {
  resetForm()
}

const handleSave = () => {
  if(noteId.value) {
    // 修改操作
    dataList.value.forEach(element => {
      if (element.id === noteId.value) {
        element.time = formatNowDate()
        element.title = editTextarea.value
        element.mark = editMark.value
        element.quoteObj = quoteObj.value
      }
    });
  } else {
    // 新增操作
    dataList.value.push({
      id: dataList.value.length + 1,
      time: formatNowDate(),
      title: editTextarea.value,
      mark: editMark.value,
      quoteObj: quoteObj.value
    })
  }
  localStorage.setItem('ph_note_data',JSON.stringify(dataList.value))
  resetForm()
}

const closeTabs = () => {
  try {
    const chromeObj = chrome
    const tag = 'close'
    // eslint-disable-next-line
    chromeObj.tabs.getSelected( null ,  function  (tab) { //获取当前tab
      //向tab发送请求
      chromeObj.tabs.sendRequest(tab.id, { action: `${tag}Action` },  function  (response) {
        console.log('response', response);
      });
    });
  } catch (error) {
    console.log('closeTabs',error)
  }
}

const dataInit = () => {
  try {
    const chromeObj = chrome
    // eslint-disable-next-line
    const bgExt = chromeObj.extension.getBackgroundPage()
    console.log(bgExt, 'bbbbbbbb')
    const info = bgExt.getDataInfo()
    chromeObj.tabs.getSelected(null, function(tab) { //获取当前tab
      console.log(info, 'dataInit', tab)
      if(info && info.action) {
        isShowNoteEdit.value = true
        noteId.value = null
        quoteObj.value = {
          quote: info.selectionText,
          title: info.title,
          url: info.url
        }
        bgExt.clearDataInfo()
      } else {
        quoteObj.value = {
          quote: '',
          title: tab.title,
          url: tab.url
        }
      }
    });
  } catch (error) {
  }
}

const loadData = () => {
  let results = []
  const localData = localStorage.getItem('ph_note_data') || '[]'
  results = JSON.parse(localData)
  return results
}

onMounted(() => {
  dataInit()
  dataList.value = loadData()
})

</script>

<style lang="scss">
.ph-wiki-note_container {
  position: relative;
  background: #fff;
  height: 100vh;
  overflow: auto;
  .ph-wiki-note_header {
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
    z-index: 1;
    .ph-wiki-note_header-title {
      margin-left: 9px;
      .ph-wiki-note_header-label {
        font-size: 16px;
        font-weight: 500;
        color: #1e80ff;
      }
      .ph-wiki-note_header-time {
        margin-left: 20px;
        font-size: 12px;
        color: #86909c;
        font-weight: 400;
      }
    }
    .ph-wiki-note_header-icon {
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
  .ph-wiki-note {
    .ph-wiki-note_list {
      padding: 86px 20px 0 0;
      .ph-wiki-note_list-item {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 14px 18px 18px;
        border: 1px solid #e5e6eb;
        border-radius: 4px;
        cursor: pointer;
        transition: all .15s linear;
        margin: 0 0 20px 20px;
        .list-item_timestamp {
          font-size: 12px;
          line-height: 20px;
          color: #86909c;
        }
        .list-item_body {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-word;
          margin: 0;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          min-height: 24px;
          color: #1d2129;
          padding: 10px 0;
        }
        .list-item_meta {
          display: flex;
          justify-content: space-between;
          .list-item_meta-tags {
            .el-check-tag {
              font-size: 12px;
              padding: 4px 10px;
            }
          }
          .list-item_meta-menu {
            display: flex;
            margin-top: 2px;
            .el-dropdown-link {
              height: 18px;
              .el-icon{
                display: inline-block;
                width: 18px;
                height: 18px;
                svg {
                  width: 18px;
                  height: 18px;
                  color: #c1c1c1;
                }
              } 
            }
          }
        }
        &:hover {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);;
        }
      }
    }
    .ph-wiki-note_bottom {
      position: fixed;
      right: 20px;
      bottom: 60px;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      justify-items: center;
      background-color: #1e80ff;
      z-index: 666;
      cursor: pointer;
      .el-icon{
        margin: auto;
        svg {
          width: 18px;
          height: 18px;
          color: #ffffff;
        }
      } 
    }
  }
  .ph-wiki-edit {
    .ph-wiki-edit_content {
      padding: 86px 20px 76px 20px;
      .ph-wiki-edit_mark-input {
        margin-right: -40px;
        border-bottom: 1px solid #f4f5f5;
        padding-bottom: 10px;
        .el-input__inner{
          border: none;
          resize : none;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .ph-wiki-edit_note-input {
        padding-top: 10px;
        .el-textarea__inner{
          border: none;
          resize : none;
          font-size: 16px;
        }
      }
      .ph-wiki-edit_note-quote_box {
        font-size: 14px;
        color: #86909c;
        line-height: 22px;
        margin-top: 12px;
        padding: 8px 10px;
        font-weight: 400;
        background-color: #f7f8fa;
        .ph-wiki-edit_note-url {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .ph-wiki-edit_bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      height: 56px;
      padding: 0 20px;
      background-color: #ffffff;
      border-top: 1px solid #e5e6eb;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
.el-dropdown-link_menu {
  box-sizing: border-box;
  padding: 4px 0;
  background-color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  .el-dropdown-link_menu-item {
    padding: 0 12px;
    height: 36px;
    width: 80px;
    font-size: 12px;
    color: #1d2129;
    line-height: 36px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    display: flex;
    justify-items: center;
    .el-icon{
      margin-top: 1px;
      margin-right: 8px;
      svg {
        width: 12px;
        height: 12px;
        color: #1d2129;
      }
    } 
    &:hover {
      background-color: #f5f6f8;
      color: #1d2129;
    }
  }
}
</style>