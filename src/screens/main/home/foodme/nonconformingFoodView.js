import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    FlatList,
    Dimensions,
    Alert,
    Image,
    ScrollView,
    PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import * as mainAction from '../../../../modules/main/mainStore';
import SubHeader from '../../../../components/headerComponent/SubHeader';


class NonconforFoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount = () => {

    }
    componentWillUnmount() {

    }

    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <SubHeader title={'부적합 식품'} mode={'back'} onPress={()=>navigation.goBack()}></SubHeader>
                
            </View>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex:1,

        backgroundColor:'#fff'
        // alignItems: 'center',

    },



});

const mapStateToProps = (state) => ({
    pollution: state.mainStore.pollution,
    error: state.mainStore.error,
    errorLog: state.mainStore.errorLog,
    isLoadingVisible: state.mainStore.isLoadingVisible
});

const mapDispatchToProps = (dispatch) => ({
    mainDataRequest: (values) => dispatch(mainAction.mainDataRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(NonconforFoodScreen);

export default connected;
