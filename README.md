# infi.js
InfiJs is light weight Javascript framework for building forms and file uploading in few seconds with ajax validation and sending back to backend server. This library have optional built in form validation error styling.

Included features : 

Form validation supporting email, minimum and maximum numbers, text validation and others and built in css for button and forms validation erros. 

Ajax submit support vai Jquery
  
Multi file upload system with built in css


Usage :-

     


    
							var form_fields = {
									'name_input_id' : {   //id selector of first field
											'name':'First Name',    
											'required' : true,
											'type':'text'       // Available types Text, Email
									}										
							};
     	                 
              infi.ajaxForm({
								'form':'#form_id',  // selector of form
                'submit_btn': '#submit-btn-id',   //selector of submit button
								'elements': form_fields,  // elements array
								'validation_status_div':'.invalid-feedback',  // class of div where form validation error appended in case individual validation 
								'error_input_class':'is-invalid',  // class to be added to input on validation error
								'common_validation_status':false,   //set this to true to add all validation error to one div instead of individual
// 								'common_validation_status_div':'#status_div',  // set common validation div selector here incase of common validation true to display common validation errros.
								'ajax_options' : {   // Ajax submit will be called if the form validation is true
									'method':'POST',
									'dataType':'json',
									'beforeSend': function(){
												
                        $('#btn-create-customer').addClass('submit-btn-id');
                        $('#status_box').html('');

									 },
									'success':function(data, textStatus, jqXHR) 
									{
										
                           console.log(data);

									           $('#btn-create-customer').removeClass('submit-btn-id');
												
                           
                            if(data.status == 'SUCCESS'){   
                               
                              $('#status_box').html('<div class="alert alert-icon alert-success" role="alert">'+
                                                    '<i class="fe fe-check mr-2" aria-hidden="true"></i>Success</div>');
                              
                            }
                            else if(data.status == 'FAILED'){
                              
                              $('#status_box').html('<div class="alert alert-icon alert-warning" role="alert">'+
                                                    '<i class="fe fe-alert-triangle mr-2" aria-hidden="true"></i>Failed</div>');
                           
                            }                     
                           
									
									}			
								}
							});   
	      
