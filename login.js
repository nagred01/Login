(function main(React, ReactNative,NativeBase,componentState, StyleSheet, Dimensions, require) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
	
    var styles = StyleSheet.create({
	containerStyle: {
	height: '100%',
	width: '100%',
	backgroundColor: 'transparent',
	},
	viewStyle: {
	marginTop: "20%",
	height: Dimensions.get('window').height / 3
	},
	userNameItem: {
	width: "90%",
	marginLeft: "5%",
	marginRight: "5%",
	},
	inputStyle: {
	color: '#2B7B9F',
	paddingLeft: 10,
	fontSize: 24,
	fontWeight: '500',
	width: '100%',
	height: 50,
	borderWidth: 1,
	//textTransform: 'none',
	borderColor: '#ccc',
	},
	passwordItem: {
	width: "90%",
	marginLeft: "5%",
	marginRight: "5%",
	marginTop: "5%",
	},
	passwordlabel: {
	color: '#2B7B9F',
	fontFamily: 'Arial',
	fontWeight: 'bold',
	marginBottom: 5,
	fontSize: 16
	},
	userNameLabel: {
	color: '#2B7B9F',
	fontFamily: 'Arial',
	fontWeight: 'bold',
	marginBottom: 5,
	fontSize: 16
	},
	loginButton: {
	backgroundColor: '#4568DC',
	marginTop: '3%',
	width: '90%',
	marginLeft: '5%',
	marginRight: '5%',
	marginTop: 40,
	textAlign:'center',
	justifyContent:'center'
	},
	imageStyle: {
	width: '100%',
	height: 160,
	},
	loginButtonLabel:{
	color: '#FFFFFF',
	fontSize: 18,
	fontFamily: 'Arial',
	textAlign:'center',
	justifyContent:'center'

	},
	activityIndicatorWrapper: {
	backgroundColor: '#FFFFFF',
	top:'40%',
	borderRadius: 10,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around'
	}
	});    
    var react_1 = React;
    var _reactNative = ReactNative;
    var _nativebase = NativeBase;
    var root = this;
	
  function loginCall() {
    var userJsonData = { "loginName": componentState.state.userName, "password": componentState.state.password };
	  
    fetch('https://cfsfiserv.com/QEUATSMT/api/Authentication/LogIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userJsonData)
    }).then(function (response) {
       componentState.setState({progressModal:false});
        var responseObj = JSON.parse(response._bodyText);
        var TokenResponse = responseObj.antiForgeryToken;
        //console.log("responseObj  =::" + responseObj.antiForgeryToken);
        if (TokenResponse == '' || TokenResponse == undefined) {
	_nativebase.Toast.show({
            text: 'Please enter the valid UserName and Password',
            position: 'bottom',
            buttonText: 'Okay',
            duration: 5000,
            type: 'danger'
        });
            
        } else {
            componentState.props.navigation.navigate("AccountSummary", {
                token: TokenResponse
            });
        }
    });
}


function validateUser() {
    if (componentState.state.userName === '' || componentState.state.userName == undefined) {
        _nativebase.Toast.show({
            text: 'Please enter Username',
            position: 'bottom',
            buttonText: 'Okay',
            duration: 5000,
            type: 'danger'
        });
    } else if (componentState.state.password === '' || componentState.state.password == undefined) {
        _nativebase.Toast.show({
            text: 'Please enter Password',
            position: 'bottom',
            buttonText: 'Okay',
            duration: 5000,
            type: 'danger'
        });
    } else {
	 componentState.setState({ progressModal: true }, function () { 
		loginCall()
	});
	componentState.forceUpdate();
    }
}

    return react_1.createElement(_nativebase.Container, {style:styles.containerStyle }, [
                react_1.createElement(_reactNative.View, {
                        
                        style:styles.viewStyle
                    }, [
                            react_1.createElement(_reactNative.Image, {
                                    
                                    style:styles.imageStyle,
                                    source:{uri:'https://raw.githubusercontent.com/nagred01/Login/master/Mainlog.png'}
                            }, null),
                            react_1.createElement(_reactNative.View, {
                                    
                                    style:styles.userNameItem
                                }, [
                                        react_1.createElement(_nativebase.Label, {
                                       
                                        style : styles.userNameLabel
                                        },["UserName"]),
                                        react_1.createElement(_reactNative.TextInput, {
                                           
                                            "cssClass": "form-control component-group",
                                            "fieldCssClass": "",
                                            style : styles.inputStyle,
                                            autoCapitalize : 'none',
                                            "bindingMode": "",
                                            onChangeText: function (val) {
                                                componentState.setState({ userName: val })
                                            },
                                            placeHolder: "Enter the User Name"
                                        }, [])
                                ]),
                                react_1.createElement(_reactNative.View, {
                                   
                                    style:styles.userNameItem
                                }, [
                                    react_1.createElement(_nativebase.Label, {
                                        
                                        style : styles.passwordlabel
                                    },["Password"]),
                                    react_1.createElement(_reactNative.TextInput, {
                                       
                                        "cssClass": "form-control component-group",
                                        "fieldCssClass": "",
                                        style : styles.inputStyle,
                                        "bindingMode": "",
                                        onChangeText: function (val) {
                                            componentState.setState({ password: val })
                                        },
                                         autoCapitalize : 'none',
                                        secureTextEntry:true,
                                        placeHolder: "Enter the Password"
                                    }, [])
                                ]),
                            react_1.createElement(_nativebase.Button, {
                                  
                                    style : styles.loginButton,
				   onPress: function () { validateUser() }
                                    
                                },[react_1.createElement(_reactNative.Text, {
                                  
                                    style : styles.loginButtonLabel,
                                }, ["Login"])])
                    ]),
	    react_1.createElement(_reactNative.Modal,{
			      
				transparent:true,
				visible:componentState.state.progressModal,
	                        onRequestClose:function(){console.log("closed Modal")},
                           },[react_1.createElement(_reactNative.View,{
				
			   },[react_1.createElement(_reactNative.ActivityIndicator,{
			     
				   size:'large',
				   color:'#0000ff',
			   },[])])])
	    
            ])
})
