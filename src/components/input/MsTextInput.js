import { View } from 'react-native'
import { TextInput, DefaultTheme } from 'react-native-paper';
import colors from 'tailwindcss/colors';
import React from 'react'

export default function MsTextInput({ onChangeText, label, keyboardType, styles, right }) {

    const [value, setValue] = React.useState("");
    const customTheme = {
        ...DefaultTheme,
        fonts: {
            regular: { fontFamily: 'Avenir' },
            medium: { fontFamily: 'AvenirMedium' },
            light: { fontFamily: 'Avenir' },
            thin: { fontFamily: 'Avenir' },
        },
    };

    return (

        <View className="relative">
            <TextInput
                mode="outlined"
                keyboardType={keyboardType ? keyboardType : 'default'}
                label={label}
                value={value}
                onChangeText={(v) => {
                    setValue(v);
                    if (onChangeText) {
                        onChangeText(v);
                    }
                }}
                underlineColor={colors.teal['600']}
                selectionColor={colors.teal['600']}
                outlineColor={colors.teal['600']}
                activeUnderlineColor={colors.teal['600']}
                contentStyle={styles ? styles : {fontFamily:'Avenir'}}
                theme={customTheme}
                style= {{fontFamily:"Avenir"}}
            />
        </View>
    )
}