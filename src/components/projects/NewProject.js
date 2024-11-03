import { View, Text } from 'react-native'
import React from 'react'
import { Modal, ModalFooter, ModalTitle, ModalButton, ModalContent, SlideAnimation } from 'react-native-modals';
import styles from '../../assets/styles';

const animation = new SlideAnimation({
    initialValue: 0, 
    slideFrom: 'bottom', 
    useNativeDriver: true
  })

export default function NewProject({show, onClose}) {
    return (
        <Modal
            visible={show}
            modalAnimation={animation}
            modalTitle={<ModalTitle
                textStyle={styles.buttonText}
                title="Create New Project" />}
            footer={
                <ModalFooter>
                    <ModalButton
                        text="CANCEL"
                        textStyle={styles.buttonText}
                        onPress={() => { onClose()}}
                    />
                    <ModalButton
                        disabled
                        textStyle={styles.buttonText}
                        text="CREATE"
                        onPress={() => { }}
                    />
                </ModalFooter>
            }
        >
            <ModalContent>
                <View className='flex w-10/12 p-2'>
                    <Text className="font-avenir">In this crazy life, we reach for the best we can, but sometimes it slips away nomatter how we plan.</Text>
                </View>
            </ModalContent>
        </Modal>
    )
}