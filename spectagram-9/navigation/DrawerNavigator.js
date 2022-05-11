import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from 'firebase'
import CustomSidebarMenu from '../screens/CustomSideBarMenu'

const Drawer = createDrawerNavigator();
export default class DraweNavigator extends Component{
constructor(props){
  super(props)
  this.state={
    light_theme:true
  }
}


  componentDidMount(){
    let theme;
    firebase
    .database()
    .ref("/users/"+firebase.auth().currentUser.uid)
    .on("value", function(snapshot){
      theme=snapshot.val().current_theme
    })
    this.setState({
      light_theme:theme==='light'?'black':'white'
    })
  }
render(){
  let props=this.props 
    return (
        <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor:'#ae45bd',
          inactiveTintColor:this.state.light_theme?'black':'white',
          itemStyle:{marginTop:5}
        }}
        drawerContent={props=> <CustomSidebarMenu {...props}/>} 
        >
            <Drawer.Screen name="Home" component={StackNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    );
}
}

