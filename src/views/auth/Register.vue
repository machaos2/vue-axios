<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
    	<Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <!--<div class="panel-body" data-validator-form>-->
        <div class="panel-body">
			  	<div class="FirstStep" v-if="axios_request">
			  	  <div class="form-group">
					    <label class="control-label">手机号</label>
					    <input id="tell" v-model="phoneNumber" v-validator.required="{ regex: /^1[3|4|5|8][0-9]\d{4,8}$/, error: '请填入正确的号码'  }" type="text" class="form-control" placeholder="请填写手机号">
					    <!--<p v-if="errorTxt">该手机已注册！</p>-->
					  </div>
					  <button type="submit" class="btn btn-lg btn-success btn-block" @click="getCaptcha">
					    	获取图片验证码
					  </button>
			    </div>
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
				  <div class="SecondStep" v-if="StepTwo">
				  	<div class="thumbnail">
					    <div class="captcha">
					    	<img :src="imgdata" id="captcha_img" @click="getCaptcha"/>
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="control-label">填写验证码</label>
					    <input v-validator:input.required="{ regex: /^[A-Za-z0-9]+$/, error: '验证码格式不正确' }" v-model="captcha_code" type="text" class="form-control" placeholder="请填写确认密码">
					  </div>
					  <button type="submit" class="btn btn-lg btn-success btn-block" @click="stepTwoGet">
					    	获取图片验证码
					  </button>
				  </div>
				  
				  <div class="ThirdStep" v-if="StepThree">
				  	<div class="form-group">
					    <label class="control-label">用户名</label>
					    <input v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名" v-model="userName">
					  </div>
					  <div class="form-group">
					    <label class="control-label">密码</label>
					    <input id="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码" v-model="userPassword">
					  </div>
					  <div class="form-group">
					    <label class="control-label">确认密码</label>
					    <input v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
					  </div>
					  <button type="submit" class="btn btn-lg btn-success btn-block" @click="stepThreeGet">
					    <i class="fa fa-btn fa-sign-in"></i> 注册
					  </button>
				  </div>
				  
				  <div class="success" v-if="success">
				  	<p>success</p>
				  	<p>{{result}}</p>
				  	<p>{{phoneNumber}}</p>
				  </div>
				  
				  <div class="fail" v-if="fail">
				  	<p>fail</p>
				  </div>
				  
				</div>
      </div>
    </div>
  </div>
  
</template>

<script>
	import ls from '@/utils/localStorage'
export default {
  name: 'Register',
  data() {
    return {
      captcha_key:'',
      imgdata:'',
      phoneNumber:'',
      captcha_code:'',
      dataKey:'',
      userName:'',
      userPassword:'',
      result:{},
      errorTxt:'',
      axios_request:true,
      StepTwo:false,
      StepThree:false,
      success:false,
      fail:false,
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
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
				console.log(this.captcha_key);
				if(this.imgdata && this.captcha_key){
					this.axios_request = false;
					this.StepTwo = true;
				}
			})
			.catch(function (error) {
				alert("该手机已注册！");
				return false;
			});
    },
    stepTwoGet(){
    	console.log(this.captcha_code);
    	console.log(this.captcha_key);
    	this.axios.post('http://larabbsmc.beesoft.ink/api/verificationCodes', {
	    	headers: {
				  'Access-Control-Allow-Origin': '*',  
				  'Content-Type': 'application/json',
				},  
				captcha_code:this.captcha_code,
				captcha_key:this.captcha_key
				
			})
			.then((response) => {
				this.dataKey = response.data.key;
				console.log(response);
				console.log(this.dataKey);
				this.StepTwo = false;
				this.StepThree = true;
			})
			.catch(function (error) {
				alert("验证码填写错误！请点击图片更换验证码！");
			});
    },
//  register(e) {
//    this.$nextTick(() => {
//      const target = e.target.type === 'submit' ? e.target : e.target.parentElement
//
//      if (target.canSubmit) {
//        this.submit()
//      }
//    })
//  },
    stepThreeGet(){
    	this.axios.post('http://larabbsmc.beesoft.ink/api/users', {
	    	headers: {
				  'Access-Control-Allow-Origin': '*',  
				  'Content-Type': 'application/json',
				},  
				verification_key:this.dataKey,
				verification_code:"123456",
				name:this.userName,
				password:this.userPassword
			})
			.then((response) => {
				console.log(response);
				this.StepThree = false;
				if(response){
					this.success = true;
					this.result = response.data;
				}else{
					this.fail =true;
				}
			})
			.catch(function (error) {
				console.log(error);
			});
			const user = {
	      name: this.phoneNumber,
	      password: this.userPassword,
	    }
			const localUser = this.$store.state.user
			this.login(user)
    },
    login(user) {
//    ls.setItem('user', user)
			this.$store.dispatch('login', user)
//    alert('注册成功')
			this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }

  }
}
</script>

<style scoped>
#captcha_img{display: block;height: 46px;}
.thumbnail { width: 180px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
</style>