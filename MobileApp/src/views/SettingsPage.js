import React, {Component} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, StatusBar, Pressable, Dimensions, ScrollView, Alert} from "react-native";
import {Authenticated} from "../api/auth";
import {ArrowLeftIcon, LogoutIcon} from "../components/icons";
import { DragSortableView } from "react-native-drag-sort";

const { width } = Dimensions.get("window");
const parentWidth = width - 20;
const childrenWidth = 74;
const childrenHeight = childrenWidth + ((childrenWidth / 100) * 36.5);
const marginChildrenTop = 7;
const marginChildrenBottom = 0;
const marginChildrenLeft = 0;
const marginChildrenRight = 7;
const TEST_DATA = [
    {
      id: 1,
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599"
    },
    {
      id: 2,
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799"
    },
    {
      id: 3,
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799"
    },
    {
      id: 4,
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799"
    },
    {
      id: 5,
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799"
    },
    {
      id: 6,
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599"
    },
    {
      id: 7,
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799"
    },
    {
      id: 8,
      src: "https://source.unsplash.com/PpOHJezOalU/800x599"
    },
    {
      id: 9,
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599"
    },
    {
      id: 10,
      src: "https://source.unsplash.com/XiDA78wAZVw/600x799"
    },
    {
      id: 11,
      src: "https://source.unsplash.com/x8xJpClTvR0/800x599"
    }
];
const TopBar = (props) => {
    return (
        <View style={styles.topBar}>
            <Pressable style={styles.iconButton} onPress={() => {props.navigation.goBack()}}>
                <ArrowLeftIcon style={styles.topBarIcon}></ArrowLeftIcon>
            </Pressable>
            <Text style={styles.logo}>Settings</Text>
            <Pressable style={styles.iconButton} onPress={() => {props.logout()}}>
                <LogoutIcon style={styles.topBarIcon}></LogoutIcon>
            </Pressable>
        </View>
    )
}

class SettingsPage extends Authenticated {
    constructor(props) {
        super(props)
        this.state = {
            clickedImage: null,
            images: TEST_DATA
        }
    }
    removeImage(item, index) {
        Alert.alert(
            "Remove image",
            "Are you sure you want to remove the image?",
            [
              {
                text: "Yes",
                onPress: () => {
                    let valueToRemove = [this.state.images[index]];
                    let images = this.state.images.filter(element => !valueToRemove.includes(element));
                    this.setState({clickedImage: null, images:images})
                }
              },
              {
                text: "No",
                onPress: () => {
                    this.setState({clickedImage: null})
                }
              }
            ]
        )
    }
    renderItem(item, index) {
        let deleteButton = null;
        if(item == this.state.clickedImage) {
            deleteButton = <Pressable style={styles.deleteButton} onPress={() => {this.removeImage(item, index)}}><Text style={{color: "white", height:25}}>x</Text></Pressable>
        }
        return (
            <View key={item.id} style={styles.item}>
                {deleteButton}
                <Image style={styles.item_image} source={{uri: item.src}} />
            </View>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <TopBar {...this.props} logout={() => {this.logout()}}/>
                <View style={styles.imagesParent}>
                <DragSortableView
                dataSource={this.state.images}
                parentWidth={parentWidth}
                childrenWidth={childrenWidth}
                childrenHeight={childrenHeight}
                marginChildrenTop={marginChildrenTop}
                marginChildrenBottom={marginChildrenBottom}
                marginChildrenLeft={marginChildrenLeft}
                marginChildrenRight={marginChildrenRight}
                keyExtractor={(item, index) => item.src}
                onDragStart={() => {
                    this.setState({clickedImage:null})
                }}
                onDragEnd={(startIndex, endIndex) => {
                    console.log("startIndex ", startIndex);
                    console.log("endIndex ", endIndex);
                }}
                onClickItem={(data, item, index) => {
                    if(this.state.clickedImage == item) {
                        this.setState({clickedImage: null})
                    } else {
                        this.setState({clickedImage:item})
                    }
                }}
                renderItem={(item, index) => {
                    return this.renderItem(item, index);
                }}
                />
                <Text>moi</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: "red",
        position: "absolute",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
        height: 25,
        width: 25,
        borderRadius: 100,
        top: -5,
        right: -5
    },
    deleteImage: {
        borderColor: "red"
    },
    imagesParent: {
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "row"
    },
    item: {
        width: childrenWidth,
        height: childrenHeight,
        borderWidth: 2,
        borderColor: "white"
    },
    item_image: {
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    container: {
        backgroundColor: "white",
        borderBottomWidth: 2,
        borderColor: "#F1F1F1",
        height: "100%"
    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        height: 70,
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "#F1F1F1",
    },
    topBarIcon: {
        color: "#C1C1C1",
        padding: 12,
        margin: 12,
    },
    iconButton: {
        width: 65,
        display: "flex",
        alignItems: "center",
    },
    logo: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: 17
    }
})
export default SettingsPage;