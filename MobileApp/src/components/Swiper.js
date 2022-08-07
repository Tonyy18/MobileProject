
import React, {Component} from "react";
import {Animated, PanResponder, View, Text, StyleSheet, Image, Pressable, Dimensions, Alert} from "react-native";
import {HeartIcon,BanIcon} from "./icons";
import profiles from "../api/TestData";
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
    like(y = 0) {
        Animated.spring(this.position, {
            toValue: { x: width + 50, y: y },
            useNativeDriver: true
        }).start()
        const profile = this.state.profiles[0];
        this.state.profiles.shift()
        this.setState({ profiles: this.state.profiles}, () => {
            this.props.onLike(profile)
            this.position.setValue({ x: 0, y: 0 })
        })
    }
    not(y = 0) {
        Animated.spring(this.position, {
            toValue: { x: -width - 50, y: y },
            useNativeDriver: true
        }).start()
        const profile = this.state.profiles[0];
        this.state.profiles.shift()
        this.setState({ profiles: this.state.profiles }, () => {
            this.props.onNot(profile);
            this.position.setValue({ x: 0, y: 0 })
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
                    this.like(gestureState.dy);
                } else if (gestureState.dx < -120) {
                    this.not(gestureState.dy);
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
                <View style={styles.buttons}>
                    <Pressable style={styles.button} onPress={() => {this.not()}}>
                        <BanIcon size={35} style={{color: "red"}}/>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => {this.like()}}>
                        <HeartIcon size={35} style={{color: "green"}}/>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const SwiperButtons = () => {
    return (
        <View style={styles.buttons}>
            <Pressable style={{...styles.button, borderColor: "red"}}>
                <BanIcon size={35} style={{color: "red"}}/>
            </Pressable>
            <Pressable style={{...styles.button, borderColor: "green"}}>
                <CheckIcon size={35} style={{color: "green"}}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        //backgroundColor: "black",
        width: "100%",
        //Minus (header height, card height, top padding)
        height: Dimensions.get("window").height - (70 + Dimensions.get("window").width + 180 + 10),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }, 
    button: {
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "#F1F1F1",
        display: "flex",
        width: 85,
        height: 85,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 30,
        marginLeft: 30
    },  
    container: {
        display: "flex",
        alignItems: "center",
        paddingTop: 10,
    },
    cardDimensions: {
        backgroundColor: "black",
        width: Dimensions.get("window").width - 20,
        height:  Dimensions.get("window").width + 180,
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
export {SwiperButtons};