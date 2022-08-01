import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import React, {Component} from "react";
import {Animated, PanResponder, View, Text, StyleSheet, Image, Alert, Dimensions} from "react-native";
import { Extrapolate, interpolate, Value } from "react-native-reanimated";

const profiles = [
    {
        "id": 1,
        "image": "https://play-lh.googleusercontent.com/5hZSZ53c6kn7eAJ4tQpudkhRLYYC4tRPpjBH9Mak4p107tiLFBY9BG6VLDV0oAH7UziA"
    },
    {
        "id": 2,
        "image": "https://bestigcaptions.com/wp-content/uploads/2022/02/Attrative-Attitude-Whatsapp-Profile-Picture.jpg"
    }
]
const width = Dimensions.get("window").width;
const Like = (props) => {
    return <Text style={{
        color: "green",
        borderWidth: 1,
        borderColor: "green",
        fontSize: 32,
        padding: 10
    }} {...props}>LIKE</Text>
}
const Nope = (props) => {
    return <Text style={{
        color: "red",
        borderWidth: 1,
        borderColor: "red",
        fontSize: 32,
        padding: 10
    }} {...props}>NOPE</Text>
}
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
        this.position = new Animated.ValueXY();
        this.rotate = this.position.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: "clamp"
        })
        this.styles = {
            ...styles.card
        }
        if(this.props.move) {
            this.styles.transform = [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }
        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
         })
        this.nopeOpacity = this.position.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
         })
    }
    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({x: gestureState.dx, y: 0})
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                      toValue: { x: width + 100, y: gestureState.dy },
                      useNativeDriver: true
                    }).start(() => {
                      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                        this.position.setValue({ x: 0, y: 0 })
                      })
                    })
                } else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                      toValue: { x: -width - 100, y: gestureState.dy },
                      useNativeDriver: true
                    }).start(() => {
                      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                        this.position.setValue({ x: 0, y: 0 })
                      })
                    })
                } else {
                    Animated.spring(this.position, {
                       toValue: { x: 0, y: 0 },
                       friction: 4,
                       useNativeDriver: true
                    }).start()
                }
            }
        })
    }
    render() {
        if(this.props.move) {
            return(
                <Animated.View style={this.styles} {...this.PanResponder.panHandlers}>
                    <Animated.View style={{
                        opacity: this.likeOpacity,
                        transform: [{rotate: "-30deg"}],
                        position: "absolute",
                        top: 50,
                        left: 40,
                        zIndex: 1000
                    }}>
                        <Like></Like>
                    </Animated.View>
                    <Animated.View style={{
                        opacity: this.nopeOpacity,
                        transform: [{rotate: "30deg"}],
                        position: "absolute",
                        top: 50,
                        right: 40,
                        zIndex: 1000
                    }}>
                        <Nope></Nope>
                    </Animated.View>
                    <Image style={styles.image} source={{uri: this.props.image}}></Image>
                </Animated.View>
            )
        } else {
            return(
                <Animated.View style={this.styles}>
                    <Image style={styles.image} source={{uri: this.props.image}}></Image>
                </Animated.View>
            )
        }
    }
}
class Swiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swipeIndex: 0
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.cardDimensions}>
                    {profiles.map((el, i) => {
                        return (
                            <Card key={i} {...el} move={i==this.state.swipeIndex}></Card>
                        )
                    }).reverse()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        paddingTop: 25
    },
    cardDimensions: {
        backgroundColor: "black",
        width: Dimensions.get("window").width - 50,
        height:  Dimensions.get("window").width + 150,
        borderRadius: 10,
        position: "relative"
    },
    card: {
        height: "100%",
        width: "100%",
        position: "absolute"
    },
    image: {
        position: "absolute",
        height: "100%",
        width: "100%",
        borderRadius: 10
    }
})

export default Swiper;