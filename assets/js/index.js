$(function() {
    //调用getUserInfo函数
    getUserInfo();

    let layer = layui.layer
    $('#btnLogout').click(function() {
        //提示用户是否确认退出
        layer.confirm('确定是否退出', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空本地存储中的 token
            localStorage.removeItem('token');
            //重新跳转页面
            location.href = './login.html'
                //关闭 confirm 询问框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     'Authorization': localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败!');
            console.log(res);
            //调用 renderAvatar 渲染头像
            renderAvatar(res.data);
        }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    let name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染头像文本
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}