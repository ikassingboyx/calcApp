import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import Button from './components/Button'

export default function Calculator() {
    const [equation, setEquation] = useState("")
    const [result, setResult] = useState("")

    const isPortrait = () => {
        let dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const [orientation, setOrientation] = useState(isPortrait()) // true - portrait, false - landscape

    const handleClick = (content) => {
        if (isSpecialCharacter(content) && isSpecialCharacter(equation.slice(-1))) {
            return; // Blokuj dodawanie dwóch znaków specjalnych po sobie
        }

        switch (content) {
            case "=": {
                try {
                    const res = eval(equation);
                    setEquation(res.toString());
                    setResult("");
                } catch {
                    setResult("Wrong input");
                }
                break;
            }
            case "Sqrt": {
                try {
                    const res = eval(equation);
                    setEquation(Math.sqrt(res).toString());
                } catch {
                    setResult('Wrong input');
                }
                break;
            }
            case 'Pow': {
                try {
                    const res = eval(equation);
                    setEquation(Math.pow(res, 2).toString());
                } catch {
                    setResult('Wrong input');
                }
                break;
            }
            case 'Sin': {
                try {
                    const res = eval(equation) * Math.PI / 180;
                    setEquation(Math.sin(res).toString());
                } catch {
                    setResult('Wrong input');
                }
                break;
            }
            case 'Cos': {
                try {
                    const res = eval(equation) * Math.PI / 180;
                    setEquation(Math.cos(res).toString());
                } catch {
                    setResult('Wrong input');
                }
                break;
            }
            default: {
                setEquation(prevEquation => prevEquation + content);
            }
        }
    }

    const removeLast = () => {
        setEquation(equation.slice(0, equation.length - 1));
    }

    const isSpecialCharacter = (char) => {
        const specialCharacters = ['+', '-', '*', '/', '.'];
        return specialCharacters.includes(char);
    }

    useEffect(() => {
        try {
            const res = eval(equation);
            if (res !== equation) {
                setResult(res.toString());
            }
        } catch {
            setResult(null);
        }
    }, [equation]);

    Dimensions.addEventListener("change", () => {
        setOrientation(isPortrait());
    })

    return (
        <View style={{ flex: 1 }}>
            {
                orientation ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 9, backgroundColor: "white" }}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ marginRight: 25, marginBottom: 20 }}>
                                <Text style={{ color: 'black', textAlign: 'right', fontSize: 48 }}>{equation}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: '5%', marginBottom: 10 }}>
                                <TouchableOpacity onPress={removeLast} style={style.remove}>
                                    <Text style={{ color: 'black', }}>⌫</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.line}></View>
                        </View>
                        <View style={style.buttons}>
                            {
                                ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "=", "+"]
                                    .map(btn => {
                                        return <Button content={btn} handleClick={handleClick} style={{ backgroundColor: "#E1D9D1" }} outstyle={!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(btn) ? { color: "black" } : { color: "black" }} key={Math.random()} />
                                    })
                            }
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}>
                        <View style={style.buttons}>
                            {
                                ["7", "8", "9", "/", "Sqrt", "4", "5", "6", "*", "Pow", "1", "2", "3", "-", "Sin", ".", "0", "=", "+", "Cos"]
                                    .map(btn => {
                                        return <Button content={btn} handleClick={handleClick} style={{ backgroundColor: "#E1D9D1" }} outstyle={!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(btn) ? { color: "black" } : { color: "black" }} key={Math.random()} />
                                    })
                            }
                        </View>
                        <View style={style.line_landscape}></View>
                        <View style={{ flex: 5 }}>
                            <View style={{ marginRight: 25, marginBottom: 20 }}>
                                <Text style={{ color: 'black', textAlign: 'right', fontSize: 48 }}>{equation}</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginBottom: 10 }}>
                                <TouchableOpacity onPress={removeLast} style={style.remove}>
                                    <Text style={{ color: 'black', }}>⌫</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            }
        </View>
    )
}

const style = StyleSheet.create({
    buttons: {
        flex: 7,
        padding: 12,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#B0B0B0",
        justifyContent: 'space-around'
    },
    line: {
        marginLeft: '3%',
        marginRight: '3%',
        height: 1,
        width: '94%',
        backgroundColor: '#E1D9D1',
    },
    line_landscape: {
        height: "98%",
        width: 1,
        backgroundColor: '#E1D9D1',
    },
    remove: {
        height: 30,
        width: 100,
        borderRadius: 10,
        backgroundColor: "#E1D9D1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})