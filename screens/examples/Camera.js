import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [saved, setSaved] = useState(false);
  let cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const __takePicture = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.current.takePictureAsync();
    setImage(photo.uri);
    console.log(cameraRef.current);
  };

  const saveFile = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    console.log(status);
    if (status === 'granted' && image) {
      await MediaLibrary.saveToLibraryAsync(image);
      setSaved(true);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {image ? (
        <View className='flex-1'>
          <Image source={{ uri: image }} style={{ flex: 1 }} />
          {saved ? (
            <TouchableOpacity
              onPress={navigation.goBack}
              className='z-20 absolute bottom-8 flex-row justify-center w-full'
            >
              <View className='flex-1 absolute bottom-10 bg-[#00ccbb] rounded-lg flex-row justify-center p-4'>
                <Text style={styles.text}>
                  Saved succesfully, press to go back
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={saveFile}
              className='z-20 absolute bottom-8  text-center w-full m-4 flex-row justify-center'
            >
              <Text style={styles.text}> Save File </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Camera
          className='flex-1'
          ref={cameraRef}
          style={styles.camera}
          type={type}
        >
          <View className='w-full absolute bottom-4 flex-row justify-between items-center mb-4'>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='w-20 h-20 rounded-full bg-white'
              onPress={__takePicture}
            />
            <TouchableOpacity style={styles.button}>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    position: 'absolute',
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
