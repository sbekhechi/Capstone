app.controller("passwordController", function($scope,$http) {
    
    //is the module started
    $scope.started = false;
    


    //JSON for form data
    $scope.formData = {
	name: "jack",
	email: "",
	password: ""
    }

		$scope.form2Data = {
			email: ""
		}
 
    //bools for displaying app content
    $scope.dbexample = false;
    $scope.dbexample2 = false;
    $scope.dbexample3 = false;
    $scope.sqlcontent = false;
    $scope.sqlcontent2 = false;
    $scope.sqlcontent3 = false;
    $scope.sqlinjection = false;
    $scope.sqlprepared = false;
    $scope.sqltable = false;
    $scope.passwordcrack = false;
    $scope.passwordform = false;
    $scope.running = false;
    $scope.cracked = false;
//passwords page
    $scope.bfinfo = false;    
    $scope.dictinfo = false;  
    $scope.captchaexample = false;    
    $scope.bfexample = false;

//clear app content window
    $scope.clearWindow = function(){
        $scope.dbexample = false;
        $scope.dbexample = false;
        $scope.dbexample2 = false;
        $scope.dbexample3 = false;
        $scope.sqlcontent = false;
        $scope.sqlcontent2 = false;
        $scope.sqlcontent3 = false;
        $scope.sqlinjection = false;
	$scope.sqlprepared = false;
	$scope.sqltable = false;
	$scope.passwordcrack = false;
	$scope.passwordform = false;
	$scope.running = false;
	$scope.cracked = false;
//passwords page
	$scope.bfinfo = false;
	$scope.dictinfo = false;
	$scope.captchaexample = false; 
	$scope.bfexample = false;
   }



    
    //post vulnerable form data to server
    $scope.sub = function(){
		console.log($scope.formData);
		$http.post("/vulnerable_pass_verifyuser", $scope.formData)
			.success(function(data){
				//console.log('posted');
				//console.log($scope.formData.email)
				//console.log($scope.formData.password);
				if (data == "Login Success"){
					console.log('success');
					$scope.logStatus = "Success"	
				}
				if (data == "Login Failed"){
					console.log('failed');
					$scope.logStatus = "Failed"
				}
				$scope.formData.email="";
				$scope.formData.password="";
			}).error(function(data){
				console.log('did not post');
			})
			
		}	


    $scope.crackPassword = function(){
		$scope.cracked = false;
		$scope.running = true;
		$http.post("/crack_password", $scope.form2Data)
			.success(function(data){
				$scope.cracked = true;
				console.log(data);
				$scope.crackedPass = data;
				$scope.running = false;
			}).error(function(data){
				console.log('Password crack error');
				$scope.running = false;
			})
		}	


    //post prepared form data to server
    $scope.sub_prepared = function(){
		$http.post("/prepared_verifyuser", $scope.formData)
			.success(function(data){
			//	console.log('posted');
				//console.log($scope.formData.email)
				//console.log($scope.formData.password);
				if (data == "Login Success"){
					console.log('success');
					$scope.logStatus = "Success"	
				}
				if (data == "Login Failed"){
					console.log('failed');
					$scope.logStatus = "Failed"
				}
				$scope.formData.email="";
				$scope.formData.password="";
			}).error(function(data){
				console.log('did not post');
			})
		}	


    $scope.getTable = function(){
		$http.get("/get_table")
			.success(function(data){
				console.log('get success');
				//console.log($scope.formData.email)
				//console.log($scope.formData.password);
				console.log(data);
				$scope.tableData = data;
    		$scope.sqltable = true;
			}).error(function(data){
				console.log('did not get');
			})
		}	
    
    //start module
    $scope.startSession = function(){
        $scope.started = !$scope.started;
    }
    
    //render content for dbexamples
    $scope.setDbExample = function(){
        $scope.dbexample = !$scope.dbexample;
    }
    
    $scope.setDbExample2 = function(){
        $scope.dbexample2 = !$scope.dbexample2;
    }
    
    $scope.setDbExample3 = function(){
        $scope.dbexample3 = !$scope.dbexample3;
    }
    
    $scope.setSqlContent = function(){
        $scope.clearWindow();
        $scope.sqlcontent = !$scope.sqlcontent;
    }
    
    $scope.setSqlContent2 = function(){
        $scope.clearWindow();
        $scope.sqlcontent2 = !$scope.sqlcontent2;
    }
    
     $scope.setSqlContent3 = function(){
        $scope.clearWindow();
        $scope.sqlcontent3= !$scope.sqlcontent3;
    }
   
    $scope.setPasswordForm = function(){
//			$scope.clearWindow();
			$scope.setPasswordCrack();
			$scope.logStatus = "";
			$scope.formData.email="";
			$scope.formData.password="";
    	$scope.passwordform = !$scope.passwordform;
 
    }

    $scope.setPasswordCrack = function(){
			$scope.getTable();
			$scope.cracked = "";
			$scope.form2Data.email="";
    	$scope.passwordcrack = !$scope.passwordcrack;
 
    }

    $scope.setSqlPrepared = function(){
			$scope.clearWindow();
			$scope.logStatus = "";
			$scope.formData.email="";
			$scope.formData.password="";
    	$scope.sqlprepared = !$scope.sqlprepared;
}	
    $scope.setBFInfo = function(){
	$scope.bfinfo = !$scope.bfinfo;    
}
    $scope.setDictInfo = function(){
	$scope.dictinfo = !$scope.dictinfo;
}

    $scope.setCaptchaExample = function(){
	$scope.captchaexample = !$scope.captchaexample;
}
    $scope.setBFExample = function(){
	$scope.bfexample = !$scope.bfexample;
}

});
