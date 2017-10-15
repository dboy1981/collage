var keystone = require('keystone');
var Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('public/files'),
    publicPath: '/files/'
  }
}); 

/**
 * Post Model
 * ==========
 */
var Post = new keystone.List('Post', {
	label: '文章',
	plural: '文章'
});

Post.add({
  category: { initial: true, type: Types.Select, index:true, options: [{ value: 'leader', label: '领导介绍' }, { value: 'teacher', label: '师资介绍' }, { value: 'classmate', label: '校友介绍' }, { value: 'award', label: '获奖介绍' }, { value: 'news', label: '新闻公告' }], default: 'news', label: '类型' },

  status: { initial: true, type: Types.Select, index:true, options: [{ value: 'default', label: '默认' }, { value: 'top', label: '推荐' }], default: 'default', label: '状态' },

  title: { initial: true, type: Types.Text, required: true, index: true, label: '标题' },
  creationdate: { initial: true, type: Types.Datetime, required: true, index: true, label: '创建时间', default: Date.now },
  position: { initial: true, type: Types.Text, label: '职务', dependsOn: { category: ['leader', 'classmate', 'teacher'] }},
  avator: { 
    initial: true,
    type: Types.File, 
    storage: myStorage,
    format: function(item, file){
      return '<img src="/files/'+file.filename+'" style="max-width: 200px">';
    },
    allowedTypes: ['image/jpeg', 'image/gif', 'image/bmp'],
    label: '上传头像', 
    dependsOn: { category: ['leader', 'classmate', 'teacher', 'award']} 
  },
	content: { type: Types.Html, wysiwyg: true, initial: true, required: true, label: '内容' },
});

/**
 * Registration
 */
Post.defaultColumns = 'status, title, category, position';
Post.register();
