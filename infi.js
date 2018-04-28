/*!
 * InfiJs Javascript Library v1.1.1
 * http://naseemfasal.com/infijs
 * Author name :Naseem Fasal
 *
 *
 * Released under the MIT license
 * http://naseemfasal.com/infijs/license
 *
 * Date: 2015-2-4
 */
var infi =new function(){
	var JS_NAME='infi';
	var validation_errors=[];
	var predefined_status_div=JS_NAME+'-status';
	var predefined_common_status_div=JS_NAME+'-common-status';
	this.ajaxForm =function(form_options={}){
						
						var validation_rules = [];
						if('elements' in form_options){
							validation_rules = form_options.elements;
						}
					
		
		
						
						//append status div if there is no status div specified
		         if(!('validation_status_div' in form_options)){
							 Object.keys(validation_rules).forEach(function(key) {

									$(form_options.form+" #"+key).after('<div class="'+predefined_status_div+'" data-trunk="true"></div>');

							 });
						 }
						if(!('common_validation_status_div' in form_options)){
								$(form_options.form).append('<div class="'+predefined_common_status_div+'"></div>');
						}	
						
						
		
						var ajax_submit=false;
						if('ajax_options' in form_options){
								ajax_submit = true;
						}
						else{
								ajax_submit = false;
						}
						var submit_on_enter=true;
						if('SubmitOnEnter' in form_options){
								if(form_options.SubmitOnEnter===true)
								submit_on_enter = true;
								else if(form_options.SubmitOnEnter===false)
								submit_on_enter=false;
						}
						else{
								submit_on_enter = true;
						}
		
						if(submit_on_enter){
							$(form_options.form+" input").keypress(function(event) {
									if (event.which == 13) {
											event.preventDefault();
											$(form_options.form).submit();
									}
							});				
						}

							$(form_options.form).submit(function(e){
									var validation_status=infi.form_validation(validation_rules,form_options);	
											if(validation_status===true){
												// ajax packet start
														var ajax_packet={};
														var ajax_options=form_options.ajax_options;
														Object.keys(ajax_options).forEach(function(key) {
																var form_action= $(form_options.form).attr("action");
															  var form_data = $(form_options.form).serializeArray();
																//console.log(ajax_options[key]);
																if(key=='url')
																{
																	 
																	 if(ajax_options.url=='form_action'){
																			ajax_packet.url=form_action;
																		}
																		else{
																				ajax_packet.url=ajax_options.url;
																		}
																}	
																else if(key=='data')
																{
																		if(ajax_options.data=='form_data'){
																				
																				ajax_packet.data=form_data;																 
																		}
																		else{
																				ajax_packet.data=ajax_options.data;
																		}																		 

																}	
																else{
																		ajax_packet.url=form_action;
																	  ajax_packet.data=form_data;	
																		ajax_packet[key]=ajax_options[key];
																}



														}); // foreach end
														//console.log(ajax_packet);		

														$.ajax(ajax_packet);												
												
												
												// ajax packet end
											}				
														
								e.preventDefault();
							});							
						if('submit_btn' in form_options){
							
		
							$(form_options.submit_btn).click(function(e){
									e.preventDefault();
									var validation_status=infi.form_validation(validation_rules,form_options);		
                  //console.log(validation_status);
									if(ajax_submit===true){
											if(validation_status===true){
													
												 $(form_options.form).submit();
												
											}		//validation_status end 		
									} // ajax true end
									else if(ajax_submit===false){
											if(validation_status===true){
													$(form_options.form).submit();
											}
									}
								
								
							});
						}
						else{
							
							$(form_options.form).submit(function(e){
									
									validation_status=infi.form_validation(validation_rules,form_options);	
									if(ajax_submit===true){
											if(validation_status===true){

//												ajax packet start
												

														var ajax_packet={};
														var ajax_options=form_options.ajax_options;
														Object.keys(ajax_options).forEach(function(key) {

																//console.log(ajax_options[key]);
																if(key=='url')
																{
																	 if(ajax_options.url=='form_action'){
																			var form_action= $(form_options.form).attr("action");
																			ajax_packet.url=form_action;
																		}
																		else{
																				ajax_packet.url=ajax_options.url;
																		}
																}	
																else if(key=='data')
																{
																		if(ajax_options.data=='form_data'){
																				var form_data = $(form_options.form).serializeArray();
																				ajax_packet.data=form_data;																 
																		}
																		else{
																				ajax_packet.data=ajax_options.form_data;
																		}																		 

																}	
																else{
																		ajax_packet[key]=ajax_options[key];
																}



														}); // foreach end
														//console.log(ajax_packet);		

														$.ajax(ajax_packet);												
												
												
												// ajax packet end
											}				
									}
									else if(ajax_submit===false){
											if(validation_status===true){
													$(form_options.form).submit();
											}
									}		
									
									e.preventDefault();
								
							});               
						}			
				
				

			
	}
// 	this.validation_status_printer=function(rule,key,validation_rules,default_message){
// 			var response={};
// 			if('error' in validation_rules){

// 				if(rule in validation_rules.error){
// 					//console.log('reached');
// 					$("#"+key).siblings(".status").html('<span>'+validation_rules.error[rule]+'</span>');
//           $("#"+key).addClass('asd');
// 					response[rule]=validation_rules.error[rule];
// 				}
// 				else{
// 					$("#"+key).siblings(".status").html('<span>'+default_message+'</span>');
// 					response[rule]=default_message;
// 				}

// 			}
// 			else{
// 				$("#"+key).siblings(".status").html('<span>'+default_message+'</span>');
// 				response[rule]=default_message;
// 			}													

// 			return response;


// 	}   
	this.validation_checker= function(form_id,validation_errors,validation_rules,error_input_class,validation_status_div,common_validation_status=true,this_common_validation_status_div='#status'){
			var validation_error_response='';
		  var validation_status=true;
      //console.log(validation_errors);
			Object.keys(validation_errors).forEach(function(key) {
					
					var this_validation_error=validation_errors[key];
					//console.log(this_validation_error);
					
					Object.keys(this_validation_error).forEach(function(key) {
            
              if(this_validation_error[key].length!='0'){
                $('#'+key).addClass(error_input_class);
              }
							else{

							}

							var this_this_validation_error=this_validation_error[key];
              var this_input_errors='';
						 Object.keys(this_this_validation_error).forEach(function(key) {
							 validation_status=false;
                this_input_errors+=this_this_validation_error[key][Object.keys(this_this_validation_error[key])]+'. ';
							 	validation_error_response+= '<p>'+this_this_validation_error[key][Object.keys(this_this_validation_error[key])]+'</p>';
               
						 });
              if(common_validation_status===false){
                  $(form_id+" #"+key).siblings(validation_status_div).html('<span class="input-warning-status">'+this_input_errors+'</span>');
              }             
					});
					
					if(common_validation_status){
							$(form_id+' '+this_common_validation_status_div).html(validation_error_response);
					}
          else{
            
          }
         
          //console.log(validation_errors[key]);
				  //var this_rule=validation_rules[Object.keys(validation_errors[key])];
					//validation_error_response=validation_errors[key];
					//infi.validation_status_printer(rule,key,validation_rules,defualt_message);
				//	console.log(validation_error_response);
			});
			
// 							var response=[];
// 							if(condition){
// 									//ar res=infi.validation_status_printer(rule,key,validation_rules,defualt_message);
// 									response[key]=rule;
// 									validation_errors.push(response);
// 							}
// 							else{
// 								$("#"+key).siblings(".status").html('');

// 							}		
		return validation_status;
	}
	this.validateEmail=function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
  this.form_validation= function(validation_rules,form_options){
         
						
								
								validation_errors=[];
                var status_flag=true;
								var response=[];
                var error_input_class=('error_input_class' in form_options)? form_options.error_input_class : 'has_error';
								
							  
                  Object.keys(validation_rules).forEach(function(key) {
										
										//$("#"+key).after('<div class="'+predefined_status_div+'"></div>');
										
										
										response=[];
										//console.log('wo'+key);
										response[key]=[];
										var rule='';
										var condition='';
										var defualt_message;										
                    //console.log(key, validation_rules[key]);
                    var key_input_value=$('#'+key).val();
                    $('#'+key).removeClass(error_input_class);
                    //console.log(key+'s'+error_input_class);
	
											if('minlength' in validation_rules[key] && key_input_value!==''){
													 defualt_message=('name' in validation_rules[key]) ? validation_rules[key].name+' Minimum length is '+validation_rules[key].minlength+'' : 'Maximum length is '+validation_rules[key].minlength+'' ;
													 if('error' in validation_rules[key] && 'minlength' in validation_rules[key].error){
														 rule={
															 'minlength':validation_rules[key].error.minlength
														 }
													 }
													else{
														 rule={
															 'minlength':defualt_message
														 }
													}
													 
													 condition= (key_input_value.length >= validation_rules[key].minlength)? false : true;
													 if(condition){ response[key].push(rule) }
													 //infi.validation_checker(condition,rule,key,validation_rules[key],defualt_message);

											} // minlength validation end
										
											if('matches' in validation_rules[key] && key_input_value!==''){
												   var first_element=validation_rules[key].matches;
												   var first_field= $('#'+first_element).val();
												   var first_field_name=validation_rules[first_element].name;
													 defualt_message=('name' in validation_rules[key]) ? validation_rules[key].name+' Should Matches with  '+first_field_name+'' : 'Should matches with '+first_field_name+'' ;
													 if('error' in validation_rules[key] && 'matches' in validation_rules[key].error){
														 rule={
															 'matches':validation_rules[key].error.matches
														 }
													 }
													else{
														 rule={
															 'matches':defualt_message
														 }
													}
													 
												  
												   //console.log(key_input_value);
													 condition= (key_input_value == first_field)? false : true;
													 if(condition){ response[key].push(rule) }
													 //infi.validation_checker(condition,rule,key,validation_rules[key],defualt_message);

											} // minlength validation end
																				
										
										
											if('maxlength' in validation_rules[key] && key_input_value!==''){
													 defualt_message=('name' in validation_rules[key]) ? validation_rules[key].name+' Maximum length is '+validation_rules[key].maxlength+'' : 'Maximum length is '+validation_rules[key].maxlength+'' ;
													 if('error' in validation_rules[key] && 'maxlength' in validation_rules[key].error){
														 rule={
															 'maxlength':validation_rules[key].error.maxlength
														 }
													 }
													else{
														 rule={
															 'maxlength':defualt_message
														 }
													}
													 
													 condition= (key_input_value.length <= validation_rules[key].maxlength)? false : true;
													 if(condition){ response[key].push(rule) }
													 //infi.validation_checker(condition,rule,key,validation_rules[key],defualt_message);

											} // maxlength validation end
										
										
											if('isEmail' in validation_rules[key]){
												if(validation_rules[key].isEmail===true && key_input_value!==''){
													 defualt_message='Invalid email address' ;
													 if('error' in validation_rules[key] && 'isEmail' in validation_rules[key].error){
														 rule={
															 'isEmail':validation_rules[key].error.isEmail
														 }
													 }
													else{
														 rule={
															 'isEmail':defualt_message
														 }
													}
													if(!infi.validateEmail(key_input_value))
													{ response[key].push(rule) }
													 //infi.validation_checker(condition,rule,key,validation_rules[key],defualt_message);
												}
											} // maxlength validation end										
										
										  if('required' in validation_rules[key]){
												if(validation_rules[key].required===true){
														 defualt_message=('name' in validation_rules[key]) ? validation_rules[key].name+' is Required' : 'Required' ;
														 if('error' in validation_rules[key] && 'required' in validation_rules[key].error){
															 rule={
																 'required':validation_rules[key].error.required
															 }
														 }
														else{
															 rule={
																 'required':defualt_message
															 }
														}
														 condition= (key_input_value!=='')? false : true;
														 if(condition){ response[key].push(rule) }
														 //infi.validation_checker(condition,rule,key,validation_rules[key],defualt_message);

												} // required validation end	
											}
										
										
										
										
										
										//console.log(response);
										validation_errors.push(response);									
										
                  });		// key foreach end	
		
								//	console.log(validation_errors,validation_rules);
									var this_common_validation_status=('common_validation_status' in form_options)? form_options.common_validation_status : true;
                  var this_common_validation_status_div=('common_validation_status_div' in form_options)? form_options.common_validation_status_div : '#status';
									var this_validation_status_div=('validation_status_div' in form_options)? form_options.validation_status_div : '.'+predefined_status_div;
									var form_id=form_options.form;
                  console.log(this_validation_status_div);
									var validation_status=infi.validation_checker(form_id,validation_errors,validation_rules,error_input_class,this_validation_status_div,this_common_validation_status,this_common_validation_status_div);
									console.log(validation_status)
//                   if(validation_errors.length>0){
// 										status_flag=false;
// 									}
// 									else{
// 										status_flag=true;
// 									}
                 	return validation_status;
  
						
  }
}();
				  	
						
