<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-cog"></i> 编辑个人资料</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-6">
              <input v-model.trim="username" v-validator:input.required="{ title: '用户名', regex: /^[0-9]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">性别</label>
            <div class="col-sm-6">
              <select v-model="sex" class="form-control">
                <option value="">未选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">兴趣</label>
            <div class="col-sm-6">
              <label class="checkbox-inline">
                <input v-model="hobbies" value="泡网" type="checkbox"> 泡网
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="运动" type="checkbox"> 运动
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="健身" type="checkbox"> 健身
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="旅游" type="checkbox"> 旅游
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="游戏" type="checkbox"> 游戏
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">个人简介</label>
            <div class="col-sm-6">
              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      username: '', // 用户名
      sex: '', // 性别
      hobbies: [], // 兴趣
      introduction: '' // 个人简介
    }
  },
  created() {
    const user = this.$store.state.user;
    if (user && typeof user === 'object') {
    	const { name, sex, hobbies, introduction } = user

      this.username = name
      this.sex = sex || this.sex
      this.hobbies = hobbies || this.hobbies
      this.introduction = introduction
    }
    
//		console.log(this.$store.state.user.access_token);
//		this.axios.get('http://larabbsmc.beesoft.ink/api/user', {
//  	headers: {
//  		'Access-Control-Allow-Origin': '*',
//				'Authorization': 'Bearer'+this.$store.state.user.access_token,
//			  'Content-Type': 'application/json'
//			  
//			}
//		})
//		.then((response) => {
//				if(response){
//					console.log(response);
//					alert("success");
//				}
//
//		})
//		.catch(function (error) {
//			alert("错误！");
//			return false;
//		});
			
		console.log(user);
  },
  methods: {
    updateProfile(e) {
      this.$nextTick(() => {
        if (e.target.canSubmit) {
          this.$store.dispatch('updateUser', {
            name: this.username,
            sex: this.sex,
            hobbies: this.hobbies,
            introduction: this.introduction
          })
//        alert('修改成功')
					this.$message.show('修改成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>