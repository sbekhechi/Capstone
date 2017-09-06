app.controller("tutorialController", function($scope,$http) {
    
    //is the module started
    $scope.started = false;
    


    //JSON for form data
    $scope.formData = {
	name: "jack",
	email: "",
	password: ""
    }
 
    //bools for displaying app content
    $scope.dbexample = false;
    $scope.dbexample2 = false;
    $scope.dbexample3 = false;
    $scope.sqlcontent = false;
    $scope.sqlcontent2 = false;
    $scope.sqlcontent3 = false;
    $scope.sqlinjection = false;
    $scope.sqlinjection2 = false;
    $scope.sqlprepared = false;
    $scope.sqltable = false;
    $scope.creating = false;
    $scope.creating2 = false;
    $scope.retrieving = false;
    $scope.retrieving2 = false;
    $scope.updating = false;
    $scope.deleting = false; 
    $scope.deleting2 = false;
    
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
	$scope.sqlinjection2 = false;
	$scope.sqlprepared = false;
	$scope.sqltable = false;
        $scope.creating = false;
 	$scope.creating2 = false;
        $scope.retrieving = false;
	$scope.retrieving2 = false;
        $scope.updating = false;
 	$scope.deleting = false;
	$scope.deleting2 = false;
    }
    
    //post vulnerable form data to server
    $scope.sub = function(){
		console.log($scope.formData);
		$http.post("/vulnerable_verifyuser", $scope.formData)
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
    
    $scope.setSqlInjection2 = function(){
        $scope.sqlinjection2 = !$scope.sqlinjection2;
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
   
    $scope.setSqlInjection = function(){
			$scope.getTable();
			$scope.clearWindow();
			$scope.logStatus = "";
			$scope.formData.email="";
			$scope.formData.password="";
    	$scope.sqlinjection = !$scope.sqlinjection;
 
    }

    $scope.setSqlPrepared = function(){
			$scope.getTable();
			$scope.clearWindow();
			$scope.logStatus = "";
			$scope.formData.email="";
			$scope.formData.password="";
    	$scope.sqlprepared = !$scope.sqlprepared;
 
    }

    $scope.setCRUD = function (crud){
    	if (crud == 0){
           $scope.clearWindow();
	   $scope.creating = true;
	}
	if (crud == 1){
	   $scope.clearWindow();
	   $scope.retrieving = true;
	}
        if (crud == 2){
	   $scope.clearWindow();
           $scope.updating = true;
	}
	if (crud == 3) {
           $scope.clearWindow();
	   $scope.deleting = true;
	}
    }   
 
    $scope.setCreating2 = function(){
     	$scope.creating2 = !$scope.creating2;
     }

     $scope.setRetrieving2 = function(){
        $scope.retrieving2 = !$scope.retrieving2;
      }

      $scope.setDeleting2 = function(){
	$scope.deleting2 = !$scope.deleting2;
       }

});
