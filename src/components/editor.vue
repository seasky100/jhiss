<template>
    <div class="edit_container">
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            :disabled="disabled"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
   </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import * as Quill from 'quill'
import { ImageResize } from 'quill-image-resize-module'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/ImageResize', ImageResize)
Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/ImageDrop', ImageDrop)
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
    ['blockquote', 'code-block'], // 引用，代码块
    [{ 'header': 1 }, { 'header': 2 }], // 标题，键值对的形式；1、2表示字体大小
    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
    [{ 'script': 'sub' }, { 'script': 'super' }], // 上下标
    [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
    [{ 'direction': 'rtl' }], // 文本方向
    [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 几级标题
    [{ 'color': [] }],
    [{ 'background': [] }], // 字体颜色，字体背景颜色
    [{ 'align': [] }]// 对齐方式
    // ['link', 'image', 'video']// 上传图片、上传视频
]
const titleConfig = {
    'ql-bold': '加粗',
    'ql-color': '颜色',
    'ql-font': '字体',
    'ql-code': '插入代码',
    'ql-italic': '斜体',
    'ql-link': '添加链接',
    'ql-background': '背景颜色',
    'ql-size': '字体大小',
    'ql-strike': '删除线',
    'ql-script': '上标/下标',
    'ql-underline': '下划线',
    'ql-blockquote': '引用',
    'ql-header': '标题',
    'ql-indent': '缩进',
    'ql-list': '列表',
    'ql-align': '文本对齐',
    'ql-direction': '文本方向',
    'ql-code-block': '代码块',
    'ql-formula': '公式',
    'ql-image': '图片',
    'ql-video': '视频',
    'ql-clean': '清除字体样式',
    'ql-upload': '文件'
}
export default {
    name: 'Editor',
    model: {
        prop: 'binddata'
    },
    components: { // 注入组件
        quillEditor
    },
    props: { // 接收父级参数
        binddata: String,
        url: String,
        disabled: Boolean
    },
    data() {
        return {
            content: this.binddata,
            editorOption: {
                placeholder: '',
                theme: 'snow',
                modules: {
                    ImageDrop: true,
                    ImageExtend: { // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
                        loading: true,
                        name: 'file',
                        size: 5, // 可选参数 图片大小
                        action: this.url, // 服务器地址, 如果action为空，则采用base64插入图片
                        response: (res) => { // 返回的图片的地址
                            return res.data.filePathUrl
                        },
                        sizeError: () => {}, // 图片超过大小的回调
                        error: () => {}, // 可选参数 上传失败触发的事件
                        success: () => {}// 可选参数  上传成功触发的事件
                    },
                    ImageResize: {
                        displayStyles: { // 添加
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        displaySize: true,
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    },
                    toolbar: { // 如果不上传图片到服务器，此处不必配置
                        container: toolbarOptions,
                        handlers: {
                            'image': function() {
                                QuillWatch.emit(this.quill.id)
                            }
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.addQuillTitle()
    },
    watch: {
        binddata() {
            this.content = this.binddata
        }
    },
    methods: {
        onEditorReady(editor) {}, // 准备编辑器
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus() {}, // 获得焦点事件
        onEditorChange() {
            this.$emit('update:binddata', this.content)
        }, // 内容改变事件
        addQuillTitle() {
            const oToolBar = document.querySelector('.ql-toolbar')
            const aButton = oToolBar.querySelectorAll('button')
            const aSelect = oToolBar.querySelectorAll('select')
            aButton.forEach(function(item) {
                if (item.className === 'ql-script') {
                    item.value === 'sub' ? item.title = '下标' : item.title = '上标'
                } else if (item.className === 'ql-indent') {
                    item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进'
                } else {
                    item.title = titleConfig[item.classList[0]]
                }
            })
            aSelect.forEach(function(item) {
                item.parentNode.title = titleConfig[item.classList[0]]
            })
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    }
}
</script>
<style lang="less" scoped>
.edit_container .quill-editor{
    height:200px;
}
</style>
