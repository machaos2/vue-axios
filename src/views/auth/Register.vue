<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
		  <!--<div class="form-group">
		    <label class="control-label">用户名</label>
		    <input v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名">
		  </div>
		  <div class="form-group">
		    <label class="control-label">密码</label>
		    <input id="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
		  </div>
		  <div class="form-group">
		    <label class="control-label">确认密码</label>
		    <input v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
		  </div>-->
		  	<div class="FirstStep" v-if="axios_request">
		  	  <div class="form-group">
			    <label class="control-label">手机号</label>
			    <input id="tell" v-model="phoneNumber" v-validator.required="{ regex: /^1[3|4|5|8][0-9]\d{4,8}$/, error: '请填入正确的号码'  }" type="text" class="form-control" placeholder="请填写手机号">
			  </div>
			  <button type="submit" class="btn btn-lg btn-success btn-block" @click="getCaptcha">
			    	获取图片验证码
			  </button>
		    </div>
		  
		  <div class="thumbnail">
		    <div class="captcha">
		    	<img :src="imgdata" id="captcha_img"/>
		    </div>
		  </div>
		  <!--<div class="form-group">
		    <label class="control-label">图片验证码</label>
		    <input v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">
		  </div>-->
		  <!--<button type="submit" class="btn btn-lg btn-success btn-block">
		    <i class="fa fa-btn fa-sign-in"></i> 注册
		  </button>-->
		</div>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      captcha_key:'',
      imgdata:'',
      phoneNumber:'',
      axios_request:true
    }
  },
  created() {
//  this.getCaptcha()
  },
  mounted () {
	
	
  },
  methods: {
    getCaptcha() {

    	this.axios.post('http://larabbsmc.beesoft.ink/api/captchas', {
	    		headers: {
				    'Access-Control-Allow-Origin': '*',  
				    'Content-Type': 'application/json',
				},  
				phone:this.phoneNumber
			})
			.then((response) => {
				this.imgdata = response.data.captcha_image_content;
				this.captcha_key = response.data.captcha_key;
				if(this.imgdata && this.captcha_key){
					this.axios_request = false;
				}
			})
			.catch(function (error) {
			console.log(error);
		});
		
		
    }
  }
}
</script>

<style scoped>
#captcha_img{display: block;height: 46px;}
.thumbnail { width: 180px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
</style>