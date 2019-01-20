

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Dimensions, Image, TextInput, Alert ,ActivityIndicator} from 'react-native';
import { Content, Item, Label, Button, Input, Container, Toast } from 'native-base';
import logo from '../../Images/Mainlog.png';
import { responsiveHeight, responsiveFontSize } from 'react-native-cross-platform-responsive-dimensions';
import { getLoginStyleSheet } from "./LoginStyle";
import Overlay from 'react-native-modal-overlay';

var reactNative = require("react-native");

var react_1 = React;
var nativebase = require("native-base");

var root = this;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            style: '',
            loading: true,
            token: '',
            progressModal:false
        };
    }

    componentDidMount() {
        getLoginStyleSheet().then(styles => {
            var localState = this;
            console.log("Login Js Call => ");
            fetch("https://raw.githubusercontent.com/nagred01/Login/master/login.js?v=96").then((response) => {
                console.log("Login Js Obj=>" + response);
                return response.text();
            }).then((js) => {
                console.log("Login Js Obj Factory =>" + js);
                let factory = eval(`${js}`);
                let Component = factory(React, reactNative, nativebase, localState, styles, require);
                console.log("Login Js Obj Component =>");
                this.setState({
                    test: Component,
                    loading: false,
                });
            });
        });
    }
    

    render() {
        if (this.state.loading) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: responsiveHeight(2)
                }}>
                    <Text style={{ color: 'blue' }}> Loading..... </Text>
                </View>
            );
        }
        else {
            let { test } = this.state;
            if (test) {
                return (test);

                
            }
        }
    }
}
export default Login;

