import React, {Component} from "react";
import {View, Text, StyleSheet, Image, ActivityIndicator, StatusBar, Pressable, Dimensions, ScrollView, Alert} from "react-native";
import {Authenticated} from "../api/auth";
import {ArrowLeftIcon, LogoutIcon, PlusIcon} from "../components/icons";
import { DragSortableView } from "react-native-drag-sort";
import { faSuperscript } from "@fortawesome/free-solid-svg-icons";

const { width } = Dimensions.get("window");
const parentWidth = width - 20;
const childrenWidth = 74;
const childrenHeight = childrenWidth + ((childrenWidth / 100) * 36.5);
const marginChildrenTop = 7;
const marginChildrenBottom = 0;
const marginChildrenLeft = 0;
const marginChildrenRight = 7;

class ImageSettings extends Component {
    constructor(props) {
        super(props);
		this.state = {
            clickedImage: null,
            images: props.images,
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
		if(item.src == "add_image") {
			return (
				<Pressable key={item.id} style={styles.item} onPress={() => {this.props.onAddImage()}}>
					<PlusIcon style={{color: "#C1C1C1"}}/>
				</Pressable>
			)
		}
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
			<View>
				<View style={styles.header}>
					<Text style={styles.headerText}>Images</Text>
				</View>
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
					fixedItems={[{src: "add_image"}]}
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
				</View>
			</View>
        )
    }
}

const styles = StyleSheet.create({
	header: {
		padding: 15,
		paddingBottom: 0
	},
	headerText: {
		fontSize: 20,
		flexGrow: 1
	},
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
		borderRadius: 5,
		backgroundColor: "#F1F1F1",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
    },
    item_image: {
        width: "100%",
        height: "100%",
        position: "absolute",
		borderRadius: 5
    }
});

export default ImageSettings;