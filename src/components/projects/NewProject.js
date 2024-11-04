import { View, Text, ToastAndroid, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalTitle, ModalButton, ModalContent, SlideAnimation } from 'react-native-modals';
import styles from '../../assets/styles';
import MsTextInput from '../input/MsTextInput';
import MsCheckbox from '../input/MsCheckbox';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import {RTNMsitu} from "rtn-msitu"

const animation = new SlideAnimation({
    initialValue: 0,
    slideFrom: 'bottom',
    useNativeDriver: true
})

export default function NewProject({ show, onClose, onMeshCreated }) {

    const [checkedFirstPoint, setCheckedFirstPoint] = useState(false)
    const [checkedSecondPoint, setCheckedSecondPoint] = useState(false)
    const [meshType, setMeshType] = useState("")
    const [lineLengthUnit, setLineLengthUnit] = useState("")
    const [gapSizeUnit, setGapSizeUnit] = useState("")
    const [projectName, setProjectName] = useState("")
    const [lineLength, setLineLength] = useState("")
    const [gapSize, setGapSize] = useState("")
    const [firstPoint, setFirstPoint] = useState({ "latitude": 0.04278994698915981, "longitude": 32.46408261358738 })
    const [secondPoint, setSecondPoint] = useState({ "latitude": 0.04959537959650264, "longitude": 32.46384188532829 })

    const constructProject = () => {
        console.log("Yoooo")
        /* if (!firstPoint) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Empty First Base',
                textBody: 'Sorry! First base point was not auto captured',
            })
            return
        }
        if (!secondPoint) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Empty Second Base',
                textBody: 'Sorry! Second base point was not auto captured',
            })
            return
        } */
        let projectData = {
            // projectName,
            meshType,
            lineLength:parseFloat(lineLength),
            gapSize:parseFloat(gapSize)
        }
        projectData["basePoints"] = [firstPoint, secondPoint]
        console.log(projectData)
        RTNMsitu.generateMesh(firstPoint, secondPoint, "LEFT", meshType, parseFloat(gapSize), parseFloat(lineLength))
        .then(result=>{
            console.log(result)
        })
        // bridgeService.generateMesh()
        
    }

   /*  useEffect(() => {
        if (!checkedFirstPoint) {
            setFirstPoint(null)
        } else {
            ToastAndroid.showWithGravity(
                `First base Point selected`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }, [checkedFirstPoint])

    useEffect(() => {
        if (!checkedSecondPoint) {
            setSecondPoint(null)
        } else {
            ToastAndroid.showWithGravity(
                `Second base Point selected`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

    }, [checkedSecondPoint]) */
    return (
        <Modal
            visible={show}
            modalAnimation={animation}
            modalTitle={
                <ModalTitle
                    textStyle={styles.buttonText}
                    title="Create New Project" />}
            footer={
                <ModalFooter>
                    <ModalButton
                        text="CANCEL"
                        textStyle={styles.buttonText}
                        onPress={() => { onClose() }}
                    />
                    <ModalButton
                        textStyle={styles.buttonText}
                        text="CREATE"
                        onPress={() => {
                            console.log("Woorks like a charm")
                            constructProject()
                        }}
                    />
                </ModalFooter>
            }
        >
            <ModalContent
                style={{
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View className='p-2 w-96'>
                    <ScrollView>
                        <MsTextInput
                            onChangeText={setProjectName}
                            label="Project Name" />
                        <View className='flex-row justify-between w-full gap-x-1 mt-3'>
                            <MsTextInput
                                keyboardType="decimal-pad"
                                label="Line Length"
                                onChangeText={setLineLength}
                                styles={{ width: '200', flex: 1 }}
                            />
                            <Picker
                                style={{ width: 120 }}
                                selectedValue={lineLengthUnit}
                                onValueChange={(itemValue, itemIndex) =>
                                    setLineLengthUnit(itemValue)
                                }>
                                <Picker.Item label="Units" value="" />
                                <Picker.Item label="Metres" value="meter" />
                                <Picker.Item label="Feet" value="fts" />
                                <Picker.Item label="Inches" value="inch" />
                            </Picker>
                        </View>
                        <View className='flex-row justify-between w-full gap-x-1 mt-3'>
                            <MsTextInput
                                keyboardType="decimal-pad"
                                onChangeText={setGapSize}
                                label="Gap Size"
                                styles={{ width: '200', flex: 1 }}
                            />
                            <Picker style={{ width: 120 }}
                                selectedValue={gapSizeUnit}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGapSizeUnit(itemValue)
                                }>
                                <Picker.Item label="Units" value="" />
                                <Picker.Item label="Metres" value="meter" />
                                <Picker.Item label="Feet" value="fts" />
                                <Picker.Item label="Inches" value="inch" />
                            </Picker>
                        </View>

                        <View className='flex flex-col items-center mt-4'>
                            <View className='flex flex-row justify-between gap-1'>
                                <Chip
                                    textStyle={styles.buttonText}
                                    selectedColor={meshType === "TRIANGLE" ? 'green' : 'black'}
                                    icon={() => (<Icon name={meshType === "TRIANGLE" ? `triangle` : `triangle-outline`} color={meshType === "TRIANGLE" ? 'green' : 'black'}
                                        size={16} />)}
                                    onPress={() => setMeshType("TRIANGLE")}
                                >Triangular Grid</Chip>

                                <Chip
                                    textStyle={styles.buttonText}
                                    selected={false}
                                    selectedColor={meshType === "SQUARE" ? 'green' : 'black'}
                                    onPress={() => setMeshType("SQUARE")}
                                    icon={() => (<Icon name={meshType === "SQUARE" ? `square` : `square-outline`} color={meshType === "SQUARE" ? 'green' : 'black'}
                                        size={16} />)}
                                >Square Grid</Chip>
                            </View>
                            {
                                meshType.length > 0 &&
                                <View className='justify-center items-center h-40 w-80 mt-2 rounded'>
                                    {meshType === "TRIANGLE" ?
                                        <Image
                                            resizeMode='contain'
                                            source={require('../../assets/tmesh.png')}
                                            className="h-32 w-72 rounded"
                                        />
                                        :
                                        <Image
                                            resizeMode='contain'
                                            source={require('../../assets/mmesh.png')}
                                            className="h-32 w-72 rounded"
                                        />
                                    }
                                </View>
                            }
                        </View>
                        <View className='w-full mt-3'>
                            <MsCheckbox
                                uncheckedColor='gray'
                                label='First Base Point (check to auto fill)'
                                color='green'
                                status={checkedFirstPoint ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedFirstPoint(!checkedFirstPoint);
                                }}
                            />
                            <MsCheckbox
                                uncheckedColor='gray'
                                label='Second Base Point (check to auto fill)'
                                color='green'
                                status={checkedSecondPoint ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedSecondPoint(!checkedSecondPoint);
                                }}
                            />

                        </View>
                    </ScrollView>
                </View>
            </ModalContent>
        </Modal>
    )
}