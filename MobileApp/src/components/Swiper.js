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
    },
    {
        "id": 3,
        "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
    },
    {
        "id": 4,
        "image": "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg"
    },
    {
        "id": 5,
        "image": "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg"
    },
    {
        "id": 6,
        "image": "https://i.pinimg.com/564x/b8/03/78/b80378993da7282e58b35bdd3adbce89.jpg"
    },
    {
        "id": 7,
        "image": "https://i.pinimg.com/736x/08/3a/68/083a68071698506a2e71a55a638514a0.jpg"
    },
    {
        "id": 8,
        "image": "https://i1.wp.com/i.pinimg.com/736x/f1/9d/1e/f19d1e7c77fda80079cb7da62872f44a.jpg"
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
class Swiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: profiles
        }
        this.position = new Animated.ValueXY();
        this.rotate = this.position.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: "clamp"
        })
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
                      toValue: { x: width + 50, y: gestureState.dy },
                      useNativeDriver: true
                    }).start()
                    this.state.profiles.shift()
                    this.setState({ profiles: this.state.profiles}, () => {
                        console.log("LIKE")
                        this.position.setValue({ x: 0, y: 0 })
                    })
                } else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                      toValue: { x: -width - 50, y: gestureState.dy },
                      useNativeDriver: true
                    }).start()
                    this.state.profiles.shift()
                    this.setState({ profiles: this.state.profiles }, () => {
                        console.log("NOPE")
                        this.position.setValue({ x: 0, y: 0 })
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
        return (
            <View style={styles.container}>
                <View style={styles.cardDimensions}>
                    {profiles.map((el, i) => {
                        if(i==0) {
                            let style = {
                                ...styles.card
                            }
                            style.transform = [{
                                rotate: this.rotate
                            },
                            ...this.position.getTranslateTransform()
                            ]
                            console.log(el.image)
                            return(
                                <Animated.View style={style} {...this.PanResponder.panHandlers} key={i}>
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
                                    <Image style={styles.image} source={{uri: el.image}}></Image>
                                </Animated.View>
                            )
                        } else {
                            return(
                                <Animated.View style={styles.card} key={i}>
                                    <Image style={styles.image} source={{uri: el.image}}></Image>
                                </Animated.View>
                            )
                        }
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