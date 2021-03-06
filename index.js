import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity,TouchableWithoutFeedback,Keyboard,
          ActivityIndicator, Platform } from 'react-native';

class DialogInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {inputModal:'',submitDisabled:true}
    this.baseState = this.state;
  }
  closeDialog(){
    this.setState(this.baseState,()=>{
      this.props.closeDialog();
    })
  }
  render(){
    let title = this.props.title || '';
    let hintInput = this.props.hintInput || '';

    let textProps = this.props.textInputProps || null;
    let modalStyleProps = this.props.modalStyle || {};
    let dialogStyleProps = this.props.dialogStyle || {};
    var cancelText = this.props.cancelText || 'Cancel';
    var submitText = this.props.submitText || 'Submit';
    var isInputRequired = (textProps && textProps.required )|| false;
    cancelText = (Platform.OS === 'ios')? cancelText:cancelText.toUpperCase();
    submitText = (Platform.OS === 'ios')? submitText:submitText.toUpperCase();
    

    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isDialogVisible}
      	onRequestClose={() => {
      	  this.closeDialog();
      	}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, {...modalStyleProps}]}>
            <View style={[styles.modal_container, {...dialogStyleProps}]}>
              <View style={styles.modal_body}>
                <Text style={styles.title_modal}>{title}</Text>
                <Text style={[this.props.message ? styles.message_modal : {height:0} ]}>{this.props.message}</Text>
                <TextInput style={styles.input_container}
                  multiline={(textProps && textProps.multiline)?true:false}
                  maxLength = {(textProps && textProps.maxLength) ? textProps.maxLength : (textProps.multiline ? 200 : 50)}
                  autoCorrect={(textProps && textProps.autoCorrect==false)?false:true}
                  autoCapitalize={(textProps && textProps.autoCapitalize)?textProps.autoCapitalize:'none'}
                  clearButtonMode={(textProps && textProps.clearButtonMode)?textProps.clearButtonMode:'never'}
                  clearTextOnFocus={(textProps && textProps.clearTextOnFocus==true)?textProps.clearTextOnFocus:false}
                  keyboardType={(textProps && textProps.keyboardType)?textProps.keyboardType:'default'}
                  underlineColorAndroid='transparent'
                  placeholder={hintInput}
                  onChangeText={(inputModal) =>{
                    let trimmedInput = inputModal.trim();
                    if(trimmedInput){
                      this.setState({inputModal:trimmedInput,submitDisabled:false})
                    }else{
                      if(isInputRequired)
                        this.setState({inputModal:trimmedInput,submitDisabled:true})
                      else
                        this.setState({inputModal});
                    }
                  }}
                  />
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity style={styles.touch_modal}
                  onPress={() => {
                    this.closeDialog();
                  }}>
                  <Text style={styles.btn_modal_left}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.divider_btn}></View>
                <TouchableOpacity disabled={this.state.submitDisabled && isInputRequired} style={styles.touch_modal}
                  onPress={() => {
                    this.props.submitInput(this.state.inputModal);
                  }}>
                  <Text style={this.state.submitDisabled && isInputRequired ?styles.btn_modal_right_disabled:styles.btn_modal_right}>{submitText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>        
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android:{
        backgroundColor: 'rgba(0,0,0,0.62)'
      },
      ios:{
        backgroundColor: 'rgba(0,0,0,0.52)'
      }
    }),
  },
  modal_container:{
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor:'rgba(220,220,220, 0.98)',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor:'#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modal_body:{
    maxHeight:500,
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  title_modal:{
    fontWeight: 'bold',
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign:'center',
        marginBottom: 5,
      },
      android: {
        textAlign:'left',
      },
    }),
  },
  message_modal:{
    fontSize: 14,
    ...Platform.select({
      ios: {
        textAlign:'center',
        marginBottom: 10,
      },
      android: {
        textAlign:'left',
        marginTop: 20
      },
    }),
  },
  input_container:{
    textAlign:'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
	      borderWidth: 1,
        borderColor: '#B0B0B0',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: '#009688',
      },
    }),
  },
  btn_container:{
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        maxHeight: 48,
      },
      android:{
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      }
    }),
  },
  divider_btn:{
    ...Platform.select({
      ios:{
      	width: 1,
        backgroundColor: '#B0B0B0',
      },
      android:{
	      width: 0
      },
    }),
  },
  touch_modal:{
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android:{
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      }
    }),
  },
  btn_modal_left:{
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize:18,
        color:'#2699FF',
        textAlign:'center',
        borderRightWidth: 5,
        borderColor: '#B0B0B0',
        padding: 10,
	      height: 48,
	      maxHeight: 48,
      },
      android: {
        textAlign:'right',
        color:'#009688',
        padding: 8
      },
    }),
  },
  
  btn_modal_right_disabled:{
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize:18,
        color:'rgba(0,0,0,0.44)',
        textAlign:'center',
        padding: 10,
      },
      android: {
        textAlign:'right',
        color:'rgba(0,0,0,0.44)',
        padding: 8
      },
    }),
  },
  btn_modal_right:{
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize:18,
        color:'#2699FF',
        textAlign:'center',
        padding: 10,
      },
      android: {
        textAlign:'right',
        color:'#009688',
        padding: 8
      },
    }),
  },
});
export default DialogInput;
